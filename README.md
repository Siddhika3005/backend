# Full-Stack Engineering Portfolio

**Mastering HTTP protocols through deliberate architecture—from raw Node.js to production-grade applications.**

---

## FEATURED CAPSTONE: OmniGrad

**Professional student management system demonstrating full-stack integration at production quality.**

### Architecture Overview

| Component | Implementation |
|-----------|-----------------|
| **Backend** | Node.js HTTP server with atomic file-system persistence |
| **Frontend** | Vanilla JavaScript with Fetch API for asynchronous operations |
| **UI Framework** | CSS3 with backdrop-filter for glassmorphism effects; BEM naming convention |
| **Data Layer** | JSON-based file persistence with ACID-like semantics |
| **API Design** | RESTful endpoints (GET, POST, PUT, DELETE) with proper status codes |

### Technical Highlights

**Glassmorphism UI Implementation**
- CSS backdrop-filter effect with 10px blur radius
- Monochromatic color system (#0f172a background, #00d9ff accent)
- 800+ lines of production-ready CSS with 60+ CSS custom properties
- Responsive grid layout (desktop-first, mobile-optimized)

**Full-Stack Integration**
- Real-time search filtering without server round-trips (client-side state management)
- Form validation using regex patterns with inline error messaging
- Toast notification system with CSS animations (success/error/warning variants)
- Stats dashboard with dynamic counter updates on CRUD operations

**Robust Error Handling**
- Try/catch blocks throughout application layer
- Atomic file operations preventing data corruption
- User-friendly error recovery with toast notifications
- HTTP status codes: 200 (success), 400 (validation), 404 (not found), 500 (server)

---

## CORE COMPETENCIES

### Backend Architecture
- Stream-based request parsing using `req.on('data')` and `req.on('end')`
- Asynchronous file I/O with Node.js fs module
- REST API design adhering to HTTP semantics
- Error boundary implementation with graceful fallbacks
- CORS header management for cross-origin requests

### Frontend UI/UX
- CSS3 advanced techniques: backdrop-filter, CSS custom properties, animations
- Real-time DOM manipulation and event handling
- Form validation with regex patterns and inline error display
- Responsive design patterns using flexbox and CSS Grid
- Accessibility-first semantic HTML5 structure

### System Design
- Stateful client-side architecture with persistent state arrays
- JSON file-based data persistence ensuring durability
- Request-response cycle comprehension from HTTP fundamentals
- Design pattern recognition: MVC separation, BEM naming
- Production-quality error recovery and logging strategies

---

## LEARNING PROGRESSION: 5-Project Ladder

| Project | Focus | Architecture | Duration | Port |
|---------|-------|--------------|----------|------|
| **Todo CLI** | File I/O & JSON manipulation | Node.js fs module | 15 min | N/A |
| **Notes Server** | Complete CRUD with streams | Vanilla HTTP + stream parsing | 30 min | 3000 |
| **HTTP Learning** | Protocol deep-dive | Raw request/response with logging | 45 min | 3002 |
| **Todos API** | Deliberate routing | Single-route implementation per session | 1+ hr | 3001 |
| **Calculator API** | Framework abstraction | Express.js with query parameters | 20 min | 3000 |

**Pedagogical Philosophy:** Each project progressively reveals what Express.js abstracts—middleware becomes organized stream event-handling; routing becomes URL pattern-matching; error handling becomes strategic try/catch placement.

---

## WHY NO FRAMEWORKS FIRST

The framework-last approach exposes fundamental abstractions:

- **Express routing** is pattern-matching on HTTP method + URL path
- **Middleware** is organized stream event-handling with request/response context
- **Error handling** is strategic try/catch + HTTP status codes
- **CORS** is response headers instructing browsers on allowed origins

Result: Framework adoption becomes an optimization choice, not mystery.

---

## REPOSITORY STRUCTURE

```
backend/
├── OmniGrad/              Full-stack capstone application
├── calculator-server/     Express.js variant (Advanced)
├── todos-server/          Progressive routing implementation (Intermediate)
├── http-learning/         HTTP protocol analysis (Intermediate)
├── notes-server/          Complete API reference (Intermediate)
└── todo-app/              File I/O foundation (Beginner)
```

---

## QUICK START

### Run OmniGrad
```bash
cd backend/OmniGrad
node server.js
# Navigate to: file:///c:/Users/hp/OneDrive/Desktop/backend/OmniGrad/index.html
```

### Run HTTP Learning (Recommended Entry Point)
```bash
cd backend/http-learning
node server.js
# Server listens on http://localhost:3002
```

---

## TECHNOLOGY STACK

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34C26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Advanced-1572B6?style=flat-square&logo=css3&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-02569B?style=flat-square)

---

## PROJECT COMPETENCY MAPPING

| Skill | Todo App | Notes | HTTP | Todos | Calc | OmniGrad |
|-------|----------|-------|------|-------|------|----------|
| **File I/O** | ✓ | ✓ | ✓ | ✓ | - | ✓ |
| **HTTP Protocol** | - | ✓ | ✓ | ✓ | ✓ | ✓ |
| **REST Design** | - | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Stream Parsing** | - | ✓ | ✓ | ✓ | - | ✓ |
| **Framework** | - | - | - | - | ✓ | - |
| **CSS3 Advanced** | - | - | - | - | - | ✓ |
| **Form Validation** | - | - | - | - | - | ✓ |
| **Real-time Filtering** | - | - | - | - | - | ✓ |

---

## PROFESSIONAL OUTCOMES

**Production Architecture Understanding**
- Atomic file-system persistence preventing data corruption
- Graceful error recovery with user-friendly messaging
- Client-side state management reducing server load
- Responsive design handling variable network conditions

**Full-Stack Integration Mastery**
- Fetch API implementation with proper error boundaries
- Dual-layer validation (client + server) ensuring data integrity
- Professional UI/UX patterns: glassmorphism, animations, accessibility
- HTTP semantics (methods, status codes, headers) applied correctly

**Design Pattern Recognition**
- MVC separation of concerns
- BEM CSS naming for maintainability
- Stream-based I/O for memory efficiency
- Atomic operations for data durability

---

## RUNNING THE FULL SUITE

```bash
# Terminal 1
cd backend/OmniGrad && node server.js

# Terminal 2
cd backend/http-learning && node server.js

# Terminal 3
cd backend/calculator-server && npm install && node index.js

# Terminal 4
cd backend/notes-server && node server.js

# Terminal 5
cd backend/todos-server && node server.js
```

---

## TROUBLESHOOTING

| Issue | Resolution |
|-------|-----------|
| Port already in use | `Get-Process node \| Stop-Process -Force` |
| Module not found | Verify correct directory before running `node server.js` |
| JSON parse error | Ensure data files contain valid JSON (start with `[` or `{`) |

---

## RESOURCES

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [HTTP Specification (RFC 7231)](https://tools.ietf.org/html/rfc7231)
- [REST API Design Principles](https://restfulapi.net/)
- [Express.js Framework Documentation](https://expressjs.com/)

---

## NEXT OBJECTIVES

- Deploy OmniGrad to cloud platform (Vercel/Azure)
- Implement PostgreSQL database layer
- Add JWT-based authentication
- Optimize for production with caching strategies
- Build mobile companion application

---

**Last Updated:** March 31, 2026  
**Status:** 5 foundational projects + production-grade capstone  
**Philosophy:** Understanding systems beats tutorials every time.
