const http = require("http");
const fs = require("fs");
const path = require("path");

const TODOS_FILE = path.join(__dirname, "todos.json");

/**
 * Read todos from file
 */
function readTodos(callback) {
  fs.readFile(TODOS_FILE, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const todos = JSON.parse(data);
      callback(null, todos);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

/**
 * Write todos to file
 */
function writeTodos(todos, callback) {
  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

/**
 * Generate unique ID for todos
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

  // Set CORS headers
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
    res.end("Welcome to Todos API\n\nAvailable endpoints:\nGET /todos - Get all todos\nPOST /todos - Create new todo");
    return;
  }

  // ROUTE: GET /todos - READ ALL TODOS
  if (req.method === "GET" && pathname === "/todos") {
    readTodos((err, todos) => {
      if (err) {
        console.error("Error reading todos:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error reading todos" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todos));
    });
    return;
  }

  // ROUTE: POST /todos - CREATE NEW TODO
  if (req.method === "POST" && pathname === "/todos") {
    let body = "";

    // STEP 1: Collect data chunks from request stream
    req.on("data", (chunk) => {
      body += chunk.toString();
      
      // Safety: prevent massive payloads
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    // STEP 2: Process complete request body
    req.on("end", () => {
      try {
        // STEP 3: Parse JSON from body string
        const newTodoData = JSON.parse(body);

        // STEP 4: Validate required fields
        if (!newTodoData.title) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Todo must have a 'title' field" }));
          return;
        }

        // STEP 5: Read existing todos
        readTodos((err, todos) => {
          if (err) {
            console.error("Error reading todos:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error reading todos" }));
            return;
          }

          // STEP 6: Create new todo object
          const newTodo = {
            id: generateId(),
            title: newTodoData.title,
            completed: false,
            createdAt: new Date().toISOString()
          };

          // STEP 7: Add to todos array
          todos.push(newTodo);

          // STEP 8: Write back to file
          writeTodos(todos, (writeErr) => {
            if (writeErr) {
              console.error("Error writing todos:", writeErr);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Error saving todo" }));
              return;
            }

            // STEP 9: Send success response (201 Created)
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ 
              message: "Todo created", 
              todo: newTodo 
            }));
          });
        });
      } catch (parseErr) {
        // Handle JSON parse errors
        console.error("JSON parse error:", parseErr);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
      }
    });

    // Handle request stream errors
    req.on("error", (err) => {
      console.error("Request stream error:", err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });

    return;
  }

  // ROUTE: Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Todos Server running on http://localhost:${PORT}`);
  console.log(`📝 Try: Invoke-WebRequest -Uri http://localhost:${PORT}/todos -UseBasicParsing | Select-Object -ExpandProperty Content`);
});
