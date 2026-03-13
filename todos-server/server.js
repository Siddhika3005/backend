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
    res.end("Welcome to Todos API\n\nAvailable endpoints:\nGET /todos - Get all todos");
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
