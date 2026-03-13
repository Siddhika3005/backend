# Backend Learning Projects

A collection of **educational Node.js projects** that progressively teach core backend development concepts—from simple CLI apps to full HTTP REST APIs.

## 🎓 Project Overview

```
backend/
├── todo-app/                 # CLI-based Todo Manager (Foundation)
├── notes-server/             # Complete REST API (Full-Featured)
├── todos-server/             # REST API (Step-by-Step Learning)
└── README.md                 # This file
```

---

## 📚 Project 1: Todo App (CLI)

**Location:** `backend/todo-app/`

**What It Is:** A command-line todo manager using Node.js file I/O

**Learning Focus:**
- File system operations (`fs` module)
- JSON manipulation
- Functional programming
- State management with files

**Usage:**
```bash
cd backend/todo-app
node todo.js
```

**Features:**
- ✅ Add todos
- ✅ List todos
- ✅ Mark todos as done
- ✅ Delete todos

**Key Concepts:**
- `fs.readFileSync()` / `fs.writeFileSync()` - synchronous file operations
- `JSON.parse()` and `JSON.stringify()`
- Module exports (`module.exports`)

**Files:**
- `todo.js` - Main module with all CLI logic
- `todos.json` - Persistent data storage

---

## 🚀 Project 2: Notes Server (Complete API)

**Location:** `backend/notes-server/`

**What It Is:** A fully-featured HTTP REST API with complete CRUD operations

**Learning Focus:**
- HTTP protocol fundamentals
- REST API design
- Asynchronous request handling
- Full-stack request → file → response cycle

**Usage:**
```bash
cd backend/notes-server
node server.js
# Server runs on http://localhost:3000
```

**Features:**
- ✅ GET /notes - Fetch all notes
- ✅ GET /notes?id=<id> - Fetch single note
- ✅ POST /notes - Create new note
- ✅ PUT /notes?id=<id> - Update note
- ✅ DELETE /notes?id=<id> - Delete note

**Key Concepts:**
- HTTP server creation with `http.createServer()`
- Request routing (method + path)
- Async file I/O with callbacks
- Stream-based request body parsing (`req.on("data")`, `req.on("end")`)
- Query parameters (`url.searchParams`)
- Error handling (400/404/500 status codes)
- CORS headers

**Files:**
- `server.js` - Complete HTTP server with all CRUD routes
- `notes.json` - Persistent data storage
- `README.md` - Full API documentation

**Test Example:**
```powershell
# Get all notes
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content

# Create a note
Invoke-WebRequest -Uri http://localhost:3000/notes `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"text":"Learn Node.js"}' `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## 📖 Project 3: Todos Server (Step-by-Step Learning)

**Location:** `backend/todos-server/`

**What It Is:** A deliberately paced REST API built ONE ROUTE AT A TIME

**Learning Philosophy:**
> Do NOT rush. Do NOT copy-paste. Implement one route per session.

This project teaches deep understanding through deliberate, single-step implementation.

**Usage:**
```bash
cd backend/todos-server
node server.js
# Server runs on http://localhost:3001
```

**Current Status:**
- ✅ **Step 1: GET /todos** - Read all todos (COMPLETE)
- ⏳ **Step 2: POST /todos** - Create todo (Coming)
- ⏳ **Step 3: GET /todos?id=<id>** - Read single todo (Coming)
- ⏳ **Step 4: PUT /todos?id=<id>** - Update todo (Coming)
- ⏳ **Step 5: DELETE /todos?id=<id>** - Delete todo (Coming)

**Why Step-by-Step?**

This teaches you:
- Why REST APIs are structured this way
- Why async I/O matters
- How frameworks abstract complexity
- Real problem-solving patterns
- Proper debugging mindset

**Files:**
- `server.js` - HTTP server (one route implemented)
- `todos.json` - Persistent data storage
- `README.md` - Detailed learning guide for each step

**Test Example:**
```powershell
# Get all todos
Invoke-WebRequest -Uri http://localhost:3001/todos -UseBasicParsing | Select-Object -ExpandProperty Content
# Result: []
```

---

## 🎯 Learning Progression

### Skill Level: Beginner

**Project 1: Todo App**
- Learn how to manipulate files
- Understand JSON format
- Practice basic logic

### Skill Level: Intermediate

**Project 2: Notes Server**
- Build a complete API from scratch
- Learn HTTP protocol
- Practice all CRUD operations
- See patterns emerge

### Skill Level: Solid Junior Developer

**Project 3: Todos Server**
- Build API deliberately, one piece at a time
- Understand the "why" behind design
- Debug effectively
- Learn foundations that frameworks hide

---

## 🔄 Comparison: How They Differ

| Feature | Todo App | Notes Server | Todos Server |
|---------|----------|--------------|--------------|
| **Interface** | Command-line | HTTP REST API | HTTP REST API |
| **Port** | N/A | 3000 | 3001 |
| **Routes** | N/A | 6 | 1 (currently) |
| **Speed** | ⚡ Fast to learn | ✓ Complete | 🎓 Deliberate |
| **Learning** | File I/O basics | Full API design | Deep understanding |
| **When to Use** | Quick scripts | Production-like | Learning |

---

## 🛠️ Requirements

- **Node.js** v12 or higher
- **PowerShell** or curl for testing HTTP APIs
- Text editor (VS Code recommended)

### Check Node.js Version

```bash
node --version
```

---

## 🚀 Quick Start

### Run All Projects

**Terminal 1 - Notes Server:**
```bash
cd backend/notes-server
node server.js
```

**Terminal 2 - Todos Server:**
```bash
cd backend/todos-server
node server.js
```

**Terminal 3 - Test Commands:**
```powershell
# Test notes-server
Invoke-WebRequest -Uri http://localhost:3000/notes -UseBasicParsing | Select-Object -ExpandProperty Content

# Test todos-server
Invoke-WebRequest -Uri http://localhost:3001/todos -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## 📝 File Structure

```
backend/
│
├── README.md                          # This file
│
├── todo-app/                          # CLI Project
│   ├── todo.js                        # Main module
│   ├── todos.json                     # Data storage
│   └── README.md                      # CLI documentation
│
├── notes-server/                      # Complete REST API
│   ├── server.js                      # Full HTTP server
│   ├── notes.json                     # Data storage
│   └── README.md                      # API documentation
│
└── todos-server/                      # Step-by-Step REST API
    ├── server.js                      # HTTP server (1 route)
    ├── todos.json                     # Data storage
    └── README.md                      # Learning guide
```

---

## 🧠 Key Concepts Taught Across Projects

### Todo App
- ✅ File system (`fs` module)
- ✅ JSON serialization
- ✅ Array manipulation
- ✅ Synchronous operations

### Notes Server
- ✅ HTTP protocol
- ✅ REST API principles
- ✅ Routing
- ✅ Async callbacks
- ✅ Stream parsing
- ✅ Error handling
- ✅ All CRUD operations

### Todos Server (Progressive)
- ✅ Every concept from Notes Server
- ✅ BUT learned deeply, one route at a time
- ✅ Forces understanding, not copying
- ✅ Builds debugging skills

---

## 💡 Learning Tips

### 1. Start Simple
Begin with `todo-app` to understand basic file operations.

### 2. Build Complete API
Use `notes-server` to see a fully-working REST API example.

### 3. Learn Deliberately
Use `todos-server` to build one route at a time, understanding each piece.

### 4. Test Everything
Always test with curl or PowerShell before moving on.

### 5. Don't Skip Steps
Each project teaches different lessons. Do them in order.

### 6. Modify & Experiment
- Try different data
- Add console logs
- Break things intentionally
- Fix them

### 7. Compare with Frameworks
After understanding these fundamentals, try Express.js. You'll see how much it abstracts!

---

## 🎓 What You'll Understand

**After Todo App:**
- How file I/O works
- JSON format and manipulation
- State management with files

**After Notes Server:**
- How HTTP really works
- How REST APIs are built
- Why async is important
- How requests flow through servers
- Why frameworks exist

**After Todos Server:**
- Deep understanding of routing
- Debugging complex async code
- Decision-making in design
- Why patterns matter
- Professional backend thinking

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill Node processes
Get-Process node | Stop-Process -Force
```

### Module Not Found
Make sure you're in the correct directory and Node.js is installed.

### JSON Parse Error
Check that `todos.json` or `notes.json` contain valid JSON (starts with `[` or `{`).

### Network Errors
Make sure both the server is still running in its terminal.

---

## 📚 Additional Resources

- [Node.js Official Docs](https://nodejs.org/docs/)
- [HTTP Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Best Practices](https://restfulapi.net/)
- [Express.js](https://expressjs.com/) (next step after understanding fundamentals)

---

## 🎯 Project Summary

| Project | Purpose | Duration | Outcome |
|---------|---------|----------|---------|
| **Todo App** | Learn file I/O | 15 min | Understand data persistence |
| **Notes Server** | Build complete API | 30 min | See full REST example |
| **Todos Server** | Deep learning | 1+ hours | Master fundamentals |

---

## 🏆 Conclusion

These three projects together create a **complete learning path** from basic file operations to professional REST API design.

**The real skill:** Understanding that all of this is **just JavaScript + HTTP + File I/O**. No magic. Just fundamentals.

By the end, you won't just know how to build backends—you'll understand **why** they're built this way.

---

**Happy Learning! 🚀**