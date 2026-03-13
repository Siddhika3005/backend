const http = require("http");
const fs = require("fs");
const path = require("path");

const NOTES_FILE = path.join(__dirname, "notes.json");

/**
 * Read notes from file
 */
function readNotes(callback) {
  fs.readFile(NOTES_FILE, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const notes = JSON.parse(data);
      callback(null, notes);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

/**
 * Write notes to file
 */
function writeNotes(notes, callback) {
  fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

/**
 * Generate unique ID for notes
 */
function generateId() {
  return Date.now();
}

/**
 * Create HTTP server
 */
const server = http.createServer((req, res) => {
  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Set CORS headers for easier testing
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // ROUTE: GET /
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Notes API\n\nAvailable endpoints:\nGET /notes - Get all notes\nGET /notes?id=<id> - Get specific note\nPOST /notes - Create new note");
    return;
  }

  // ROUTE: GET /notes (with optional query param for single note)
  if (req.method === "GET" && pathname === "/notes") {
    const id = url.searchParams.get("id");

    readNotes((err, notes) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error reading notes" }));
        return;
      }

      // If id is provided, return single note
      if (id) {
        const note = notes.find((n) => n.id == id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(note || { error: "Note not found" }));
        return;
      }

      // Otherwise return all notes
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(notes));
    });
    return;
  }

  // ROUTE: POST /notes (create new note)
  if (req.method === "POST" && pathname === "/notes") {
    let body = "";

    // Collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Process complete request body
    req.on("end", () => {
      try {
        const newNoteData = JSON.parse(body);

        // Validate that text field exists
        if (!newNoteData.text) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Note must have a 'text' field" }));
          return;
        }

        // Read existing notes
        readNotes((err, notes) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error reading notes" }));
            return;
          }

          // Create new note object
          const newNote = {
            id: generateId(),
            text: newNoteData.text,
            createdAt: new Date().toISOString()
          };

          // Add to notes array
          notes.push(newNote);

          // Write back to file
          writeNotes(notes, (writeErr) => {
            if (writeErr) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Error saving note" }));
              return;
            }

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Note added", note: newNote }));
          });
        });
      } catch (parseErr) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
      }
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });
    return;
  }

  // ROUTE: PUT /notes (update existing note)
  if (req.method === "PUT" && pathname === "/notes") {
    const id = url.searchParams.get("id");

    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Note ID is required in query params" }));
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const updateData = JSON.parse(body);

        if (!updateData.text) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Note must have a 'text' field" }));
          return;
        }

        readNotes((err, notes) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error reading notes" }));
            return;
          }

          const noteIndex = notes.findIndex((n) => n.id == id);

          if (noteIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Note not found" }));
            return;
          }

          notes[noteIndex].text = updateData.text;
          notes[noteIndex].updatedAt = new Date().toISOString();

          writeNotes(notes, (writeErr) => {
            if (writeErr) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Error saving note" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Note updated", note: notes[noteIndex] }));
          });
        });
      } catch (parseErr) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
      }
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });
    return;
  }

  // ROUTE: DELETE /notes (delete a note)
  if (req.method === "DELETE" && pathname === "/notes") {
    const id = url.searchParams.get("id");

    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Note ID is required in query params" }));
      return;
    }

    readNotes((err, notes) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error reading notes" }));
        return;
      }

      const noteIndex = notes.findIndex((n) => n.id == id);

      if (noteIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Note not found" }));
        return;
      }

      const deletedNote = notes.splice(noteIndex, 1)[0];

      writeNotes(notes, (writeErr) => {
        if (writeErr) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Error saving notes" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Note deleted", note: deletedNote }));
      });
    });
    return;
  }

  // ROUTE: Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Try: curl http://localhost:${PORT}/notes`);
});
