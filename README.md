# 🚀 Full-Stack Engineering: From First Principles to Production

**A progression from raw Node.js streams to a production-grade student management system. This repository demonstrates the evolution from CLI tools through HTTP fundamentals to professional REST APIs.**

---

## 📚 The Learning Progression

| Project | Focus | Architecture | What You Learn |
|---------|-------|--------------|----------------|
| **Todo CLI** | File I/O | Node.js fs module | State persistence |
| **Notes Server** | Complete API | Vanilla HTTP + streams | Full CRUD operations |
| **HTTP Learning** | Protocol | Raw request/response | HTTP fundamentals |
| **Todos API** | Routing | Single-route focus | Deliberate implementation |
| **Calculator API** | Framework | Express.js | Framework abstractions |
| **OmniGrad** | Production | Full-stack integration | Professional architecture |

---

## ⭐ Featured: OmniGrad

Full-stack student management system demonstrating professional-grade architecture.

| Aspect | Details |
|--------|---------|
| **Features** | CRUD operations, real-time search, form validation, toast notifications, stats dashboard |
| **Tech Stack** | Node.js (HTTP), Vanilla JS, CSS3 Glassmorphism |
| **Architecture** | Client-side state management, JSON persistence, RESTful API |
| **Design** | Responsive grid layout, modern animations, BEM CSS structure |
| **Status** | Production-ready with proper error handling |

**Explore:** [OmniGrad Source Code & Documentation](./OmniGrad/)

---

## 💡 Core Technical Competencies

**Backend Fundamentals**
- Stream-based request parsing (`req.on('data')` and `req.on('end')`)
- Atomic file I/O with Node.js fs module
- RESTful API design with proper HTTP semantics
- Error boundary implementation with graceful fallbacks
- CORS header management for cross-origin requests

**Frontend Architecture**
- Responsive CSS Grid and flexbox layouts
- CSS3 backdrop-filter for glassmorphism effects
- Real-time DOM state management with Fetch API
- Form validation with regex patterns and inline error display
- BEM naming convention for maintainable CSS

**System Design**
- Client-side state persistence (allStudents array pattern)
- JSON file-based data persistence ensuring durability
- Dual-layer validation (client + server integrity)
- Production-quality error recovery patterns
- Request-response cycle comprehension from HTTP fundamentals

---

## ⚡ Quick Start

### Run OmniGrad
```bash
cd OmniGrad
node server.js
# Open: file:///c:/Users/hp/OneDrive/Desktop/backend/OmniGrad/index.html
```

### Explore HTTP Learning (Recommended Entry Point)
**Start here to understand the foundation.** This project demonstrates raw HTTP protocol handling before abstractions.
```bash
cd http-learning
node server.js
# Visit: http://localhost:3002
```

---

## 📂 Repository Structure

```
backend/
├── OmniGrad/          Full-stack capstone (production-ready)
├── calculator-server/ Express.js variant for framework comparison
├── todos-server/      Single-route implementation for deep learning
├── http-learning/     HTTP protocol fundamentals with logging
├── notes-server/      Complete API reference implementation
└── todo-app/          File I/O basics and state management
```

---

## 🔧 Troubleshooting

**Port already in use:**
```powershell
Get-Process node | Stop-Process -Force
```

**Module not found:**
Verify you're in the correct project directory before running `node server.js`

**JSON parse errors:**
Ensure data files contain valid JSON (start with `[` or `{`)

---

**Status:** ✅ 5 learning projects + production-grade capstone  
**Approach:** Deep system understanding over framework shortcuts.
