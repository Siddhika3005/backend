const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const DATA_FILE = path.join(__dirname, "data.json");

/**
 * Helper: Read data from file
 */
function readData(callback) {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const items = JSON.parse(data);
      callback(null, items);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

/**
 * Helper: Write data to file
 */
function writeData(items, callback) {
  fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

/**
 * Create HTTP Server
 * 
 * This server demonstrates:
 * - HTTP GET requests (read data)
 * - HTTP POST requests (write data)
 * - Request routing (method + path)
 * - Stream-based request parsing
 * - JSON serialization
 * - Error handling
 */
const server = http.createServer((req, res) => {
  console.log(`\n📨 ${req.method} ${req.url}`);

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // ============================================
  // ROUTE 1: GET /
  // ============================================
  if (req.method === "GET" && pathname === "/") {
    console.log("✓ Route matched: GET /");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`
HTTP Learning Server
====================

ENDPOINTS:
  GET /          - This message
  GET /items     - Get all items
  POST /items    - Create new item

EXAMPLE CURL COMMANDS:
  curl http://localhost:3002/items
  curl -X POST http://localhost:3002/items \\
    -H "Content-Type: application/json" \\
    -d '{"name":"My Item"}'
`);
    return;
  }

  // ============================================
  // ROUTE 2: GET /items
  // ============================================
  if (req.method === "GET" && pathname === "/items") {
    console.log("✓ Route matched: GET /items");
    
    readData((err, items) => {
      if (err) {
        console.error("❌ Error reading data:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read data" }));
        return;
      }

      console.log(`✓ Found ${items.length} items`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(items));
    });
    return;
  }

  // ============================================
  // ROUTE 3: POST /items
  // ============================================
  if (req.method === "POST" && pathname === "/items") {
    console.log("✓ Route matched: POST /items");
    console.log("  → Waiting for request body...");

    let body = "";

    // STREAM STEP 1: Collect incoming data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(`  → Received ${chunk.length} bytes`);

      // Prevent DoS attacks
      if (body.length > 1e6) {
        console.warn("⚠️  Payload too large, rejecting");
        req.connection.destroy();
      }
    });

    // STREAM STEP 2: All data received
    req.on("end", () => {
      console.log(`✓ Request body complete (${body.length} bytes)`);

      try {
        // PARSE STEP 1: Convert JSON string to object
        console.log("  → Parsing JSON...");
        const newItem = JSON.parse(body);
        console.log("✓ JSON parsed successfully");

        // VALIDATE STEP 1: Check required fields
        if (!newItem.name) {
          console.warn("⚠️  Validation failed: missing 'name' field");
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Field 'name' is required" }));
          return;
        }

        // FILE STEP 1: Read existing data
        console.log("  → Reading existing data...");
        readData((err, items) => {
          if (err) {
            console.error("❌ Error reading data:", err.message);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to read data" }));
            return;
          }

          // CREATE STEP 1: Build new item object
          const item = {
            id: Date.now(),
            name: newItem.name,
            createdAt: new Date().toISOString()
          };
          console.log(`✓ Created new item with id: ${item.id}`);

          // ARRAY STEP 1: Add to array
          items.push(item);
          console.log(`  → Array now has ${items.length} items`);

          // FILE STEP 2: Write back to disk
          console.log("  → Writing to disk...");
          writeData(items, (writeErr) => {
            if (writeErr) {
              console.error("❌ Error writing data:", writeErr.message);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Failed to save data" }));
              return;
            }

            console.log("✓ Data written to disk");
            console.log("✓ Sending response (201 Created)");

            // RESPONSE STEP 1: Send success
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              message: "Item created",
              item: item
            }));
          });
        });
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

    // ERROR HANDLING
    req.on("error", (err) => {
      console.error("❌ Request stream error:", err.message);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Request error" }));
    });

    return;
  }

  // ============================================
  // DEFAULT: 404 Not Found
  // ============================================
  console.warn("⚠️  No route matched");
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// Start server
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ HTTP Learning Server`);
  console.log(`${"=".repeat(50)}`);
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  console.log(`📝 Try: curl http://localhost:${PORT}/`);
  console.log(`${"=".repeat(50)}\n`);
});
