# HTTP Learning - Master Backend Fundamentals

A hands-on HTTP server project that teaches you **how requests actually work** by building GET and POST endpoints from scratch.

**Philosophy:** If it works in curl → your backend logic is correct.

---

## 🎯 What You'll Learn

After completing this project, you will:

- ✅ Stop fearing backend logic
- ✅ Understand REST patterns naturally
- ✅ See why Express feels easy
- ✅ Be ready for databases
- ✅ Be confident in interviews asking *"How does a request get handled?"*

---

## 📁 Project Structure

```
http-learning/
├── server.js       # Main HTTP server with GET + POST
├── data.json       # Persistent storage
└── README.md       # This file
```

---

## 🚀 Starting the Server

```bash
cd backend/http-learning
node server.js
```

You'll see:
```
==================================================
✅ HTTP Learning Server
==================================================
🌐 Server running at http://localhost:3002
📝 Try: curl http://localhost:3002/
==================================================
```

---

## 🔌 API Endpoints

### 1. GET /

**What it does:** Shows help message with endpoint examples

**curl command:**
```bash
curl http://localhost:3002/
```

**Response:**
```text
HTTP Learning Server
====================

ENDPOINTS:
  GET /          - This message
  GET /items     - Get all items
  POST /items    - Create new item
...
```

---

### 2. GET /items

**What it does:** Returns all stored items as JSON array

**curl command:**
```bash
curl http://localhost:3002/items
```

**First response (empty):**
```json
[]
```

**After adding items:**
```json
[
  {
    "id": 1710348874540,
    "name": "Learn HTTP",
    "createdAt": "2026-03-13T10:30:00.000Z"
  },
  {
    "id": 1710348890709,
    "name": "Build server",
    "createdAt": "2026-03-13T10:30:16.000Z"
  }
]
```

---

### 3. POST /items

**What it does:** Creates a new item and saves it

**curl command:**
```bash
curl -X POST http://localhost:3002/items \
  -H "Content-Type: application/json" \
  -d '{"name":"My Item"}'
```

**Request body required:**
```json
{
  "name": "Your item name"
}
```

**Response (201 Created):**
```json
{
  "message": "Item created",
  "item": {
    "id": 1710348874540,
    "name": "Learn HTTP",
    "createdAt": "2026-03-13T10:30:00.000Z"
  }
}
```

---

## 🧪 Complete Testing Workflow

### Step 1: Start the server
```bash
node server.js
```

### Step 2: Get empty items (should be empty)
```bash
curl http://localhost:3002/items
# Result: []
```

### Step 3: Create first item
```bash
curl -X POST http://localhost:3002/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Learn HTTP"}'
```

**Console output from server:**
```
📨 POST /items
✓ Route matched: POST /items
  → Waiting for request body...
  → Received 24 bytes
✓ Request body complete (24 bytes)
  → Parsing JSON...
✓ JSON parsed successfully
  → Reading existing data...
✓ Created new item with id: 1710348874540
  → Array now has 1 items
  → Writing to disk...
✓ Data written to disk
✓ Sending response (201 Created)
```

### Step 4: Create second item
```bash
curl -X POST http://localhost:3002/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Build the server"}'
```

### Step 5: Get all items (should have 2)
```bash
curl http://localhost:3002/items
```

**Result:**
```json
[
  {"id":1710348874540,"name":"Learn HTTP","createdAt":"2026-03-13T..."},
  {"id":1710348890709,"name":"Build the server","createdAt":"2026-03-13T..."}
]
```

### Step 6: Check the file
```bash
cat data.json
```

**Proof of persistence:**
```json
[
  {
    "id": 1710348874540,
    "name": "Learn HTTP",
    "createdAt": "2026-03-13T10:30:00.000Z"
  },
  {
    "id": 1710348890709,
    "name": "Build the server",
    "createdAt": "2026-03-13T10:30:16.000Z"
  }
]
```

---

## 📚 What Each Part Teaches

### GET /items Route

**The flow:**
```
1. Client sends: GET /items
2. Server receives request
3. Server reads data.json file
4. Server parses JSON from file
5. Server sends back JSON response
6. Connection closes
```

**Key concepts:**
- Routing (method + path matching)
- Async file I/O (`fs.readFile`)
- JSON parsing
- HTTP response headers

**In code:**
```javascript
if (req.method === "GET" && pathname === "/items") {
  readData((err, items) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  });
}
```

---

### POST /items Route

**The flow:**
```
1. Client sends: POST /items + request body
2. Server receives request (headers first)
3. Server waits for body (streams in chunks)
4. Body arrives in pieces (req.on("data"))
5. All data received (req.on("end"))
6. Server parses body as JSON
7. Server validates required fields
8. Server reads existing data
9. Server adds new item to array
10. Server writes entire array back to file
11. Server sends success response
12. Connection closes
```

**Key concepts:**
- Stream-based body parsing
- JSON parsing & validation
- File locking (read → modify → write)
- Async callbacks (error handling)
- HTTP status codes (201 Created)

**In code:**
```javascript
if (req.method === "POST" && pathname === "/items") {
  let body = "";
  
  req.on("data", (chunk) => {
    body += chunk.toString();  // Collect chunks
  });

  req.on("end", () => {
    const newItem = JSON.parse(body);  // Parse
    readData((err, items) => {         // Read
      items.push(newItem);             // Add
      writeData(items, ...);           // Write
    });
  });
}
```

---

## 🔍 Understanding the Console Output

When you make requests, you'll see detailed logging:

### GET request:
```
📨 GET /items
✓ Route matched: GET /items
✓ Found 2 items
```

### POST request:
```
📨 POST /items
✓ Route matched: POST /items
  → Waiting for request body...
  → Received 24 bytes
✓ Request body complete (24 bytes)
  → Parsing JSON...
✓ JSON parsed successfully
  → Reading existing data...
✓ Created new item with id: 1710348874540
  → Array now has 1 items
  → Writing to disk...
✓ Data written to disk
✓ Sending response (201 Created)
```

This shows **every step** so you understand the flow!

---

## 🐛 Error Handling

### Missing required field in POST
```bash
curl -X POST http://localhost:3002/items \
  -H "Content-Type: application/json" \
  -d '{}'  # Missing "name"
```

**Response (400 Bad Request):**
```json
{"error":"Field 'name' is required"}
```

### Invalid JSON
```bash
curl -X POST http://localhost:3002/items \
  -H "Content-Type: application/json" \
  -d '{invalid json}'
```

**Response (400 Bad Request):**
```json
{"error":"Invalid JSON"}
```

### Wrong route
```bash
curl http://localhost:3002/notfound
```

**Response (404 Not Found):**
```json
{"error":"Route not found"}
```

---

## 🎓 Interview Question You Can Now Answer

**Q: "How does a request get handled in a backend server?"**

**A:** 
```
1. Client sends HTTP request (with method, path, headers, body)
2. Server receives request event
3. Server checks method + path to route to correct handler
4. If GET: read data, send back
5. If POST: wait for body stream, collect all data, parse JSON, validate, 
   read existing data, modify it, write back to file, send response
6. Connection closes
7. Server ready for next request
```

You just implemented this! 🚀

---

## 💡 Key Insights

### 1. HTTP is Just Text
Every request/response is plain text following HTTP protocol.

### 2. Streams Handle Large Data
We don't load entire requests into memory. We process chunks as they arrive.

### 3. Async is Essential
File I/O is slow. Using callbacks allows other requests to be served while waiting.

### 4. State Must Be Persisted
Without files/databases, data is lost when server restarts.

### 5. This is the Foundation
Express, Fastify, Node.js frameworks all work exactly this way underneath. They just add convenience layers.

---

## 🔄 Data Flow Diagram

```
GET /items
    ↓
Server reads: fs.readFile("data.json")
    ↓
File data (text) → JSON.parse() → JavaScript objects
    ↓
res.end(JSON.stringify(objects)) → sends as response
    ↓
Browser/curl receives JSON


POST /items + {"name": "Learn"}
    ↓
req.on("data") → collects body chunks
    ↓
req.on("end") → JSON.parse() → JavaScript object
    ↓
readData() → get existing array from file
    ↓
items.push(newItem) → add to array
    ↓
writeData() → JSON.stringify() → write to file
    ↓
res.end(success response)
```

---

## 🚀 Next Steps (When Ready)

- [ ] Add GET /items?id=X (query parameters)
- [ ] Add PUT /items?id=X (update)
- [ ] Add DELETE /items?id=X (delete)
- [ ] Add basic validation middleware
- [ ] Convert to Express.js (compare simplicity!)
- [ ] Add database instead of file storage
- [ ] Deploy to a server

---

## 📖 Files Explained

### server.js
- **Purpose:** Main HTTP server
- **Exports:** None (runs standalone)
- **Port:** 3002
- **Routes:** GET /, GET /items, POST /items
- **Logging:** Detailed console output for learning

### data.json
- **Purpose:** Persistent storage
- **Format:** JSON array of item objects
- **Auto-created:** When you create first item
- **Human-readable:** Formatted with indentation

---

## 🎯 Success Criteria

You've mastered this project when you can:

- [ ] Explain what happens in GET /items
- [ ] Explain what happens in POST /items
- [ ] Understand why streams are used
- [ ] Understand why async callbacks matter
- [ ] Explain every console log message
- [ ] Create items via curl and verify in data.json
- [ ] Handle errors gracefully
- [ ] Answer "How does a request work?" in an interview

---

## 🎓 Conclusion

You didn't just learn HTTP. You **built an HTTP server**. No frameworks. No abstractions.

Now when you use Express, Fastify, or any framework, you'll understand that they're just conveniences on top of what you just did.

**That's the real skill.** 🚀

---

**Happy learning!**

*Last updated: March 13, 2026*
