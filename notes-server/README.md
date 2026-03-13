# Notes Server - Complete & Tested

A file-based HTTP notes API built with Node.js fundamentals (`http` + `fs`). All features implemented and tested.

## Project Structure

```
notes-server/
├── server.js      # HTTP server with full CRUD routing
├── notes.json     # Persistent JSON storage
└── README.md      # This file
```

## Status: ✅ COMPLETE & FULLY TESTED

All endpoints implemented and verified working:
- ✅ GET /notes - Retrieve all notes
- ✅ GET /notes?id=<id> - Retrieve single note
- ✅ POST /notes - Create new note
- ✅ PUT /notes?id=<id> - Update existing note
- ✅ DELETE /notes?id=<id> - Delete a note

## What You're Learning

- **HTTP Fundamentals**: Server creation, routing, method handling
- **File I/O (`fs`)**: Read/write operations with async callbacks
- **Streams**: Request body parsing with `req.on()`
- **Query Parameters**: URL parsing and filtering
- **JSON Persistence**: Data storage and retrieval
- **Error Handling**: Proper HTTP status codes and error responses
- **No Frameworks**: Pure Node.js built-in modules only

## How to Run

### Start the Server

```bash
cd backend\notes-server
node server.js
```

You'll see:
```
✅ Server running on http://localhost:3000
📝 Try: curl http://localhost:3000/notes
```

## API Endpoints - Complete Reference

### 1. GET / (Help)
Get API documentation.

```bash
Invoke-WebRequest -Uri http://localhost:3000/ -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 2. GET /notes
Retrieve all notes.

```bash
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response:**
```json
[
  {
    "id": 1773372874540,
    "text": "Buy groceries",
    "createdAt": "2026-03-13T03:34:34.540Z"
  }
]
```

### 3. GET /notes?id=<id>
Retrieve a specific note by ID.

```bash
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=1773372874540" -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response:**
```json
{
  "id": 1773372874540,
  "text": "Buy groceries",
  "createdAt": "2026-03-13T03:34:34.540Z"
}
```

### 4. POST /notes (Create)
Create a new note.

```bash
Invoke-WebRequest -Uri http://localhost:3000/notes `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"text":"Your note here"}' `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Request Body:**
```json
{
  "text": "Your note content"
}
```

**Response (201 Created):**
```json
{
  "message": "Note added",
  "note": {
    "id": 1773372874540,
    "text": "Your note content",
    "createdAt": "2026-03-13T03:34:34.540Z"
  }
}
```

### 5. PUT /notes?id=<id> (Update)
Update an existing note.

```bash
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=1773372874540" `
  -Method PUT `
  -ContentType "application/json" `
  -Body '{"text":"Updated content"}' `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Request Body:**
```json
{
  "text": "Updated note content"
}
```

**Response (200 OK):**
```json
{
  "message": "Note updated",
  "note": {
    "id": 1773372874540,
    "text": "Updated content",
    "createdAt": "2026-03-13T03:34:34.540Z",
    "updatedAt": "2026-03-13T03:35:44.461Z"
  }
}
```

### 6. DELETE /notes?id=<id> (Delete)
Delete a note permanently.

```bash
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=1773372874540" `
  -Method DELETE `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response (200 OK):**
```json
{
  "message": "Note deleted",
  "note": {
    "id": 1773372874540,
    "text": "Buy groceries",
    "createdAt": "2026-03-13T03:34:34.540Z"
  }
}
```

## Test Results (Verified ✅)

| Test | Command | Result |
|------|---------|--------|
| 1. Get empty notes | GET /notes | `[]` ✅ |
| 2. Create note #1 | POST /notes | Created with ID `1773372874540` ✅ |
| 3. Create note #2 | POST /notes | Created with ID `1773372890709` ✅ |
| 4. Create note #3 | POST /notes | Created with ID `1773372896195` ✅ |
| 5. Fetch all notes | GET /notes | 3 notes returned ✅ |
| 6. Fetch single note | GET /notes?id=xxx | Correct note returned ✅ |
| 7. Update note | PUT /notes?id=xxx | Text updated, timestamp added ✅ |
| 8. Delete note | DELETE /notes?id=xxx | Note removed, 2 remaining ✅ |
| 9. Persistence | Check notes.json | Data persisted on disk ✅ |

## Complete Workflow Example

```bash
# 1. Start server
node server.js

# 2. View empty notes
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content
# Result: []

# 3. Create first note
$note1 = Invoke-WebRequest -Uri http://localhost:3000/notes -Method POST -ContentType "application/json" -Body '{"text":"Buy groceries"}' -UseBasicParsing
$id1 = ($note1.Content | ConvertFrom-Json).note.id

# 4. Create second note
$note2 = Invoke-WebRequest -Uri http://localhost:3000/notes -Method POST -ContentType "application/json" -Body '{"text":"Learn Node.js"}' -UseBasicParsing
$id2 = ($note2.Content | ConvertFrom-Json).note.id

# 5. View all notes
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content
# Result: [note1, note2]

# 6. Get specific note
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=$id1" -UseBasicParsing | Select-Object -ExpandProperty Content

# 7. Update first note
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=$id1" -Method PUT -ContentType "application/json" -Body '{"text":"Buy groceries and milk"}' -UseBasicParsing | Select-Object -ExpandProperty Content

# 8. Delete second note
Invoke-WebRequest -Uri "http://localhost:3000/notes?id=$id2" -Method DELETE -UseBasicParsing | Select-Object -ExpandProperty Content

# 9. View remaining notes
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content
# Result: [note1 with updated text]
```

## Data Format

Notes are stored in `notes.json` with the following format:

```json
[
  {
    "id": 1773372874540,
    "text": "Buy groceries and milk",
    "createdAt": "2026-03-13T03:34:34.540Z",
    "updatedAt": "2026-03-13T03:35:44.461Z"
  },
  {
    "id": 1773372890709,
    "text": "Learn Node.js",
    "createdAt": "2026-03-13T03:34:50.709Z"
  }
]
```

## Key Concepts Demonstrated

| Feature | Implementation |
|---------|-----------------|
| HTTP Server | `http.createServer()` |
| Routing | URL parsing + method checking |
| GET Requests | `fs.readFile()` + async callbacks |
| POST Requests | `req.on("data")` + `req.on("end")` streams |
| PUT Requests | Find → update → write pattern |
| DELETE Requests | Filter array + rewrite file |
| Query Params | `url.searchParams.get()` |
| File Persistence | `fs.writeFile()` with JSON |
| Error Handling | Proper HTTP status codes (400/404/500) |
| Timestamps | ISO format with `new Date().toISOString()` |

## Error Handling

All errors return appropriate HTTP status codes:

```json
// 400 Bad Request - Invalid JSON
{"error": "Invalid JSON in request body"}

// 400 Bad Request - Missing required field
{"error": "Note must have a 'text' field"}

// 404 Not Found - Note doesn't exist
{"error": "Note not found"}

// 500 Internal Server Error - File read/write failed
{"error": "Error reading notes"}
```

## Troubleshooting

### Port 3000 Already in Use
Change the PORT in server.js or kill the existing process:
```bash
Get-Process node | Stop-Process -Force
```

### Notes not persisting?
Check that `notes.json` has write permissions in the `notes-server` folder.

### Invalid JSON errors on POST?
Ensure proper JSON format:
```bash
# ✅ Correct
-Body '{"text":"My note"}'

# ❌ Wrong
-Body "{text:My note}"
```

## Learning Outcomes

After completing this project, you understand:

1. ✅ How HTTP requests travel through a server
2. ✅ How routing works without frameworks
3. ✅ How to parse request bodies with streams
4. ✅ How to read/write files asynchronously
5. ✅ How to persist data to disk
6. ✅ How query parameters modify behavior
7. ✅ How to handle errors properly
8. ✅ Why frameworks like Express exist (they abstract away this complexity)
9. ✅ The full client → server → disk → server → client data flow

## Next Challenges (Optional)

- Add `PATCH /notes?id=<id>` for partial updates
- Add search functionality: `GET /notes?search=keyword`
- Add sorting: `GET /notes?sort=createdAt`
- Add validation for note text length
- Add user authentication
- Convert to TypeScript
- Migrate to Express.js and compare

## Conclusion

This project demonstrates that you don't need frameworks to build backend functionality. You now understand the fundamentals that all Node.js frameworks are built upon.
