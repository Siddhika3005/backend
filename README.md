# Backend Learning Projects 🚀

A comprehensive collection of **educational Node.js projects** that progressively teach core backend development concepts—from simple CLI apps to full HTTP REST APIs with detailed logging and testing.

**Last Updated:** March 31, 2026

> **Philosophy:** Build from fundamentals. No frameworks. No magic. Just pure JavaScript + HTTP + File I/O.

---

## 📖 Table of Contents

- [Projects Overview](#projects-overview)
- [Learning Progression](#learning-progression)
- [Project Comparison](#project-comparison)
- [Quick Start](#quick-start)
- [Requirements](#requirements)
- [File Structure](#file-structure)
- [Key Concepts](#key-concepts)
- [Next Steps](#next-steps)

---

## 📚 Projects Overview

```
backend/
├── todo-app/                 # CLI-based Todo Manager (Foundation)
├── notes-server/             # Complete REST API (Full-Featured)
├── todos-server/             # REST API (Step-by-Step Learning)
├── http-learning/            # HTTP Fundamentals (GET + POST)
├── calculator-server/        # REST API with Express (Arithmetic Operations)
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

## 🌐 Project 4: HTTP Learning (Full Hands-On)

**Location:** `backend/http-learning/`

**What It Is:** A practical HTTP server demonstrating GET and POST with verbose logging

**Learning Focus:**
- HTTP protocol fundamentals
- Request/response cycle (in detail)
- Stream-based data handling
- Real-world curl command testing
- Complete data flow from request to file

**Philosophy:**
> If it works in curl → your backend logic is correct.

**Usage:**
```bash
cd backend/http-learning
node server.js
# Server runs on http://localhost:3002
```

**Features:**
- ✅ GET / - Help/documentation
- ✅ GET /items - Fetch all items
- ✅ POST /items - Create new item
- ✅ Detailed console logging (debug every step)
- ✅ Data persistence to JSON file
- ✅ Full error handling

**Key Concepts Demonstrated:**
- Complete request flow (headers → body → parsing → file → response)
- Streaming request body with `req.on("data")` and `req.on("end")`
- JSON validation and error responses
- Async file operations with persistent storage
- HTTP status codes (200, 201, 400, 404, 500)
- CORS headers for cross-origin requests

**Files:**
- `server.js` - HTTP server with detailed logging
- `data.json` - Persistent item storage
- `README.md` - Complete learning guide with curl examples

**Test Examples:**
```powershell
# Get help
Invoke-WebRequest -Uri http://localhost:3002/ -UseBasicParsing | Select-Object -ExpandProperty Content

# Get all items (empty)
Invoke-WebRequest -Uri http://localhost:3002/items -UseBasicParsing | Select-Object -ExpandProperty Content

# Create an item
Invoke-WebRequest -Uri http://localhost:3002/items `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Learn HTTP"}' `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## 💻 Project 5: Calculator Server (Express Framework)

**Location:** `backend/calculator-server/`

**What It Is:** A lightweight REST API for arithmetic operations built with Express.js

**Learning Focus:**
- Express.js framework basics
- Query parameters in routes
- Framework advantages over vanilla Node.js
- RESTful API simplification
- Code organization with helper functions

**Usage:**
```bash
cd backend/calculator-server
npm install
node index.js
# Server runs on http://localhost:3000
```

**Features:**
- ✅ GET /sum?a=5&b=3 - Add two numbers
- ✅ GET /multiply?a=5&b=3 - Multiply two numbers
- ✅ GET /divide?a=6&b=2 - Divide two numbers
- ✅ GET /subtract?a=5&b=3 - Subtract two numbers
- ✅ Clean, refactored code with DRY principles

**Key Concepts:**
- Express.js routing (`app.get()`)
- Query parameters parsing
- Arrow functions and helper functions
- Code refactoring (DRY principle)
- JSON responses
- Functional programming patterns

**Files:**
- `index.js` - Express server with all arithmetic routes
- `package.json` - Project dependencies (Express)
- `.gitignore` - Excludes node_modules from git
- `README.md` - Complete API documentation

**Test Examples:**
```powershell
# Sum: 5 + 3 = 8
Invoke-WebRequest -Uri http://localhost:3000/sum?a=5&b=3 -UseBasicParsing | Select-Object -ExpandProperty Content
# Returns: {"ans":8}

# Multiply: 4 * 7 = 28
Invoke-WebRequest -Uri http://localhost:3000/multiply?a=4&b=7 -UseBasicParsing | Select-Object -ExpandProperty Content
# Returns: {"ans":28}

# Divide: 10 / 2 = 5
Invoke-WebRequest -Uri http://localhost:3000/divide?a=10&b=2 -UseBasicParsing | Select-Object -ExpandProperty Content
# Returns: {"ans":5}

# Subtract: 20 - 8 = 12
Invoke-WebRequest -Uri http://localhost:3000/subtract?a=20&b=8 -UseBasicParsing | Select-Object -ExpandProperty Content
# Returns: {"ans":12}
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

**Project 4: HTTP Learning** ⭐ Recommended for hands-on practice
- Deep dive into HTTP fundamentals
- Understand request/response cycle completely
- See every step logged and explained
- Learn to test with curl
- Gain confidence in backend logic

### Skill Level: Solid Junior Developer

**Project 3: Todos Server**
- Build API deliberately, one piece at a time
- Understand the "why" behind design
- Debug effectively
- Learn foundations that frameworks hide

### Skill Level: Intermediate to Advanced

**Project 5: Calculator Server** (Express.js)
- See how frameworks simplify development
- Understand routing in Express
- Learn query parameter handling
- Compare vanilla Node.js vs. frameworks
- Refactor code for maintainability
- Preparation for real-world frameworks

---

## 🔄 Comparison: How They Differ

| Feature | Todo App | Notes Server | HTTP Learning | Todos Server | Calculator |
|---------|----------|--------------|---------------|--------------|-----------|
| **Interface** | Command-line | HTTP REST API | HTTP REST API | HTTP REST API | HTTP REST API |
| **Port** | N/A | 3000 | 3002 | 3001 | 3000 |
| **Routes** | N/A | 6 | 3 | 1 (currently) | 4 |
| **Framework** | None | Vanilla HTTP | Vanilla HTTP | Vanilla HTTP | Express.js |
| **Logging** | ❌ None | ❌ Minimal | ✅ Verbose | ✅ Detailed | ✅ Startup message |
| **Speed** | ⚡ Fast to learn | ✓ Complete | 🎓 Practical | 🎓 Deliberate | ⚡ Simple |
| **Learning** | File I/O basics | Full API design | HTTP deep dive | One step at a time | Framework intro |
| **When to Use** | Quick scripts | Production-like | Understanding | Deep learning | Framework practice |

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

**Terminal 2 - HTTP Learning:**
```bash
cd backend/http-learning
node server.js
```

**Terminal 3 - Todos Server:**
```bash
cd backend/todos-server
node server.js
```

**Terminal 4 - Calculator Server (Express):**
```bash
cd backend/calculator-server
npm install
node index.js
```

**Terminal 5 - Test Commands:**
```powershell
# Test calculator-server
Invoke-WebRequest -Uri http://localhost:3000/sum?a=10&b=5 -UseBasicParsing | Select-Object -ExpandProperty Content

# Test http-learning (recommended to start here!)
Invoke-WebRequest -Uri http://localhost:3002/items -UseBasicParsing | Select-Object -ExpandProperty Content

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
├── todos-server/                      # Step-by-Step REST API
│   ├── server.js                      # HTTP server (1 route)
│   ├── todos.json                     # Data storage
│   └── README.md                      # Learning guide
│
├── http-learning/                     # HTTP Fundamentals
│   ├── server.js                      # HTTP server with logging
│   ├── data.json                      # Data storage
│   └── README.md                      # Complete guide with curl
│
└── calculator-server/                 # Express.js Arithmetic API
    ├── index.js                       # Express server
    ├── package.json                   # Dependencies (Express)
    ├── package-lock.json              # Locked versions
    ├── .gitignore                     # Ignore node_modules
    ├── node_modules/                  # Dependencies directory
    └── README.md                      # API documentation
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

### HTTP Learning
- ✅ Complete HTTP request/response cycle
- ✅ GET and POST request handling
- ✅ Streaming request bodies
- ✅ JSON parsing and validation
- ✅ Data persistence
- ✅ Verbose logging for debugging
- ✅ Real-world testing with curl/PowerShell

### Todos Server (Progressive)
- ✅ Every concept from Notes Server
- ✅ BUT learned deeply, one route at a time
- ✅ Forces understanding, not copying
- ✅ Builds debugging skills

### Calculator Server (Express Framework)
- ✅ Express.js framework basics
- ✅ Query parameter parsing
- ✅ DRY (Don't Repeat Yourself) principles
- ✅ Helper functions and code refactoring
- ✅ Arrow functions and functional programming
- ✅ Framework advantages over vanilla Node.js

---

## 💡 Learning Tips

### 1. Start Simple
Begin with `todo-app` to understand basic file operations.

### 2. Build Complete API
Use `notes-server` to see a fully-working REST API example.

### 3. Deep Dive into HTTP
Use `http-learning` to understand every detail of the HTTP protocol with verbose logging.

### 4. Learn Deliberately
Use `todos-server` to build one route at a time, understanding each piece.

### 5. Explore Frameworks
Use `calculator-server` to see how Express.js simplifies backend development.

### 6. Test Everything
Always test with curl or PowerShell before moving on.

### 7. Don't Skip Steps
Each project teaches different lessons. Do them in order.

### 8. Modify & Experiment
- Try different data
- Add console logs
- Break things intentionally
- Fix them

### 9. Compare with Frameworks
After understanding these fundamentals, try Express.js. You'll see how much it abstracts!

### 10. Build More Projects
Once you master these 5, create your own projects combining what you've learned.

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

**After HTTP Learning:**
- Complete HTTP protocol details
- Request/response cycles in depth
- Stream-based data handling
- Real-world testing techniques
- Debugging strategies

**After Todos Server:**
- Deep understanding of routing
- Debugging complex async code
- Decision-making in design
- Why patterns matter
- Professional backend thinking

**After Calculator Server:**
- How frameworks abstract complexity
- Express.js routing patterns
- Query parameter handling
- Code organization with helpers
- When to use frameworks vs. vanilla Node.js

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

| Project | Purpose | Duration | Port | Framework | Outcome |
|---------|---------|----------|------|-----------|---------|
| **Todo App** | Learn file I/O | 15 min | N/A | None | Understand data persistence |
| **Notes Server** | Build complete API | 30 min | 3000 | Vanilla HTTP | See full REST example |
| **HTTP Learning** | Master HTTP protocol | 45 min | 3002 | Vanilla HTTP | Deep HTTP understanding |
| **Todos Server** | Deep learning | 1+ hours | 3001 | Vanilla HTTP | Master fundamentals |
| **Calculator Server** | Learn frameworks | 20 min | 3000 | Express.js | See framework benefits |

---

## � Conclusion

These **five projects** together create a **complete learning path** from basic file operations to professional REST API design, HTTP mastery, and framework understanding.

**The real skill:** Understanding that all of this is **just JavaScript + HTTP + File I/O**. No magic. Just fundamentals.

By the end, you won't just know how to build backends—you'll understand **why** they're built this way, and you'll see how frameworks like Express simplify the process.

**Progression:**
1. File operations (Todo App)
2. HTTP from scratch (Notes Server + HTTP Learning)
3. Deliberate learning (Todos Server)
4. Framework understanding (Calculator Server)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js v12 or higher
- PowerShell or curl command-line tool
- VS Code (recommended)

### First Time Setup
```bash
# 1. Clone this repository
git clone https://github.com/YourUsername/backend.git
cd backend

# 2. Verify Node.js is installed
node --version

# 3. Run any project
cd http-learning    # Start here!
node server.js
```

---

## 📋 Running Multiple Servers

Each project runs on a different port. You can run them all simultaneously:

```bash
# Terminal 1
cd backend/todo-app
node todo.js

# Terminal 2
cd backend/http-learning
node server.js        # Port 3002

# Terminal 3
cd backend/notes-server
node server.js        # Port 3000

# Terminal 4
cd backend/todos-server
node server.js        # Port 3001
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill all Node processes
Get-Process node | Stop-Process -Force
```

### Module Errors
Ensure you're in the correct project directory before running `node server.js`

### JSON Parse Errors
Check that data files contain valid JSON (start with `[` or `{`)

---

## 📝 Contributing

Feel free to:
- Add more routes to any project
- Improve error handling
- Add new features
- Create variations
- Share improvements

**Remember:** The goal is learning, not production code.

---

## 📚 Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [HTTP Protocol MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Best Practices](https://restfulapi.net/)
- [JSON Format](https://www.json.org/)

---

## 🎯 Success Metrics

You've mastered these projects when you can:

- [ ] Explain how files are read/written in Node.js
- [ ] Build an HTTP server from scratch
- [ ] Route requests based on method and path
- [ ] Parse request bodies using streams
- [ ] Validate and transform data
- [ ] Persist data to JSON files
- [ ] Handle errors gracefully with proper HTTP codes
- [ ] Write server endpoints with curl/PowerShell
- [ ] Debug backend issues using console logs
- [ ] Explain every part of an HTTP request/response cycle

---

## 📞 Contact & Questions

If you have questions about these projects:
- Review the project README files
- Check the console output for detailed logging
- Experiment with the code
- Break things intentionally to learn

**Happy Learning! 🚀**

---

**Last Updated:** March 31, 2026  
**Status:** All 5 projects complete and tested ✅