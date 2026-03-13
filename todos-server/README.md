# Todos API - Building Step by Step

A educational REST API built one route at a time, using pure Node.js.

## Project Structure

```
todos-server/
├── server.js      # HTTP server (one route at a time)
├── todos.json     # Persistent storage
└── README.md      # Learning documentation
```

---

## PROGRESS: Step-by-Step Implementation

### ✅ STEP 1: GET /todos (Implemented & Tested)

**What We Built**
- Basic HTTP server on port 3001
- Single route: `GET /todos`
- Reads all todos from file
- Returns JSON response

**What This Teaches**
- HTTP server creation (`http.createServer()`)
- File I/O with async callbacks (`fs.readFile()`)
- Manual routing (method + path checking)
- JSON response format
- Error handling for file operations

**Code Structure**
```javascript
// 1. Setup: Load required modules
const http = require("http");
const fs = require("fs");

// 2. Helper: Read from disk
function readTodos(callback) {
  fs.readFile(TODOS_FILE, "utf8", (err, data) => {
    if (err) callback(err, null);
    const todos = JSON.parse(data);
    callback(null, todos);
  });
}

// 3. Route: Handle GET /todos
if (req.method === "GET" && pathname === "/todos") {
  readTodos((err, todos) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  });
}
```

**Key Points**
- Uses **async callbacks** - file read doesn't block server
- Uses **error-first callback** pattern - standard Node.js convention
- **JSON.parse()** converts file string to JavaScript objects
- **JSON.stringify()** converts objects back to text for response
- Server doesn't crash if file read fails - proper error handling

---

## How to Run

```bash
cd backend\todos-server
node server.js
```

You'll see:
```
✅ Todos Server running on http://localhost:3001
📝 Try: Invoke-WebRequest -Uri http://localhost:3001/todos -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## Testing Route 1: GET /todos

### Test Command
```powershell
Invoke-WebRequest -Uri http://localhost:3001/todos -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Expected Response (Empty)
```json
[]
```

### What This Proves
✅ Server is running
✅ Route responds to GET requests
✅ File is being read correctly
✅ JSON parsing works
✅ Empty array is correct (no todos yet)

---

## Important Notes

### Why Port 3001?
- Port 3000 is used by notes-server
- Port 3001 avoids conflicts
- Real APIs would use environment variables

### Why callbacks?
- This is **core Node.js pattern**
- File I/O is slow - must not block
- Callbacks let other requests continue
- Modern alternative: Promises/async-await (we'll see later)

### Why error-first callbacks?
- Convention in Node.js: `(err, data) => {}`
- `err` is null if successful
- `data` is null if error
- Forces you to check errors first

---

## The Learning Philosophy

**One route = One learning cycle**

1. ✅ Understand what the route does
2. ✅ See how file I/O works
3. ✅ Test it thoroughly
4. ✅ Build confidence
5. ➡️ Move to next route

**DO NOT** skip ahead. This is intentional.

---

## Next Steps (Coming Later)

- [ ] Step 2: POST /todos - Create new todo (parse request body)
- [ ] Step 3: GET /todos?id=<id> - Get single todo (query params)
- [ ] Step 4: PUT /todos?id=<id> - Update todo (find + update pattern)
- [ ] Step 5: DELETE /todos?id=<id> - Delete todo (filter array)

Each step builds on the previous. No shortcuts.

---

## Key Concepts This Route Covers

| Concept | How It's Used |
|---------|--------------|
| HTTP Server | `http.createServer((req, res) => {})` |
| Routing | `if (req.method === "GET" && pathname === "/todos")` |
| File Reading | `fs.readFile(file, encoding, callback)` |
| Async I/O | File doesn't block - callback fires when ready |
| Error Handling | Check `err` first, then process `data` |
| JSON Format | `JSON.parse()` string → object, `JSON.stringify()` object → string |
| HTTP Headers | `res.writeHead(status, headers)` |
| Response Body | `res.end(data)` sends and closes connection |

---

## About This Learning Project

This is **not** about building fast. It's about understanding **why** backend APIs work the way they do.

By building REST API routes one at a time from scratch, you learn:
- What frameworks abstract away
- Common patterns (CRUD)
- Why async is important
- How state flows through servers
- Real backend problem-solving

This is **junior → solid developer** territory.

---

## Progress Tracker

**Session 1: GET /todos** ✅
- [x] Created project structure
- [x] Implemented GET /todos route
- [x] Tested with curl/PowerShell
- [x] Verified file reading works
- [x] Error handling in place

**Session 2: POST /todos** ⏳ (Coming next)
- [ ] Parse request body using `req.on("data")` and `req.on("end")`
- [ ] Validate JSON
- [ ] Add todo to array
- [ ] Write back to file
- [ ] Return created todo with ID

... and so on, one step at a time.
