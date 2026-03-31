# Student ID Tracker 📚

A full-stack web application for managing student information with a modern frontend and REST API backend.

**Technologies:**
- Frontend: HTML, CSS, JavaScript (Fetch API)
- Backend: Node.js (vanilla HTTP server)
- Data Storage: JSON file

## Features

✅ **View all students** - Display students in a responsive grid  
✅ **Add new students** - Create student records with name, course, and email  
✅ **Delete students** - Remove student records  
✅ **Real-time updates** - Instant UI refresh after changes  
✅ **CORS enabled** - Frontend and backend can run on different ports  
✅ **Input validation** - Prevent empty submissions  

## Project Structure

```
student-id-tracker/
├── index.html         # Frontend HTML page
├── style.css          # Styling for the UI
├── script.js          # Frontend JavaScript (Fetch API calls)
├── server.js          # Backend Node.js server
├── students.json      # Data storage file
├── package.json       # Project metadata
└── README.md          # This file
```

## How It Works

### Frontend (Browser)
- User enters student details (name, course, email)
- Clicks "Add Student" button
- Frontend makes API requests to backend
- Data updates in real-time without page reload

### Backend (Node.js)
- Handles GET, POST, DELETE, PUT requests
- Stores data in `students.json` file
- Returns JSON responses
- Includes CORS headers for cross-origin requests

## Installation

No dependencies needed! Pure Node.js HTTP server.

## Usage

### Start the Server

```bash
cd student-id-tracker
node server.js
```

Server runs on `http://localhost:3000`

### Open the Frontend

1. Open `index.html` in your browser (or use Live Server in VS Code)
2. The frontend automatically connects to the backend API at `http://localhost:3000`

### API Endpoints

#### GET all students
```bash
curl http://localhost:3000/api/students
```

#### Add a student (POST)
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","course":"CS101","email":"john@example.com"}'
```

#### Delete a student (DELETE)
```bash
curl -X DELETE http://localhost:3000/api/students/1234567890
```

#### Update a student (PUT)
```bash
curl -X PUT http://localhost:3000/api/students/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"course":"CS102"}'
```

## Learning Objectives

This project teaches:
- ✅ **Full-stack development** - Frontend and backend working together
- ✅ **Fetch API** - Making HTTP requests from JavaScript
- ✅ **REST API design** - Proper HTTP methods for different operations
- ✅ **CRUD operations** - Create, Read, Update, Delete
- ✅ **CORS** - Cross-Origin Resource Sharing
- ✅ **Data persistence** - Saving data to files
- ✅ **Async/Await** - Handling asynchronous operations
- ✅ **DOM manipulation** - Dynamically updating the webpage
- ✅ **Form handling** - Capturing user input

## File Details

### index.html
- Simple form for student input
- Grid container to display student cards
- Links to CSS and JavaScript files

### style.css
- Responsive grid layout
- Clean card design for each student
- Hover effects on buttons
- Mobile-friendly flexbox styling

### script.js
- `loadStudents()` - Fetch and display all students
- `addStudent()` - Create a new student record
- `deleteStudent()` - Remove a student (with confirmation)

### server.js
- HTTP server on port 3000
- CORS headers for cross-origin requests
- Error handling and JSON parsing
- File I/O for data persistence

## Example Student Data

```json
[
  {
    "id": 1711900000000,
    "name": "Alice Johnson",
    "course": "Computer Science",
    "email": "alice@example.com"
  },
  {
    "id": 1711900000001,
    "name": "Bob Smith",
    "course": "Mathematics",
    "email": "bob@example.com"
  }
]
```

## Tips for Development

### Testing with PowerShell
```powershell
# Get all students
Invoke-WebRequest -Uri http://localhost:3000/api/students -UseBasicParsing | Select-Object -ExpandProperty Content

# Add a student
$body = @{name="Test"; course="CS101"; email="test@test.com"} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3000/api/students `
  -Method POST `
  -ContentType "application/json" `
  -Body $body `
  -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Debugging
- Open browser DevTools (F12) to see network requests
- Check the terminal where server is running for logs
- Look at `students.json` to verify data is being saved

## Enhancements You Can Add

1. **Edit functionality** - Update student details
2. **Search/filter** - Find students by name or course
3. **Sorting** - Sort by name, course, or email
4. **Data export** - Download student list as CSV
5. **Server tests** - Add unit tests for API endpoints
6. **Database** - Replace JSON with MongoDB or SQLite
7. **Authentication** - Add login/logout functionality
8. **Validation** - More robust input validation
9. **Error handling** - Better error messages
10. **Dark mode** - Toggle between light/dark themes

## Common Issues

### Port 3000 already in use
```bash
# Kill all Node processes
Get-Process node | Stop-Process -Force
```

### CORS errors
- Make sure server is running on `localhost:3000`
- Check that frontend HTML is served from a web server
- Verify API URLs in script.js match backend routes

### students.json is empty
- This is normal on first run
- Add a student through the UI and the file will be populated

### Students not appearing
- Check browser console for fetch errors
- Verify server is running (`node server.js`)
- Ensure `students.json` exists and is readable

## Next Steps

After mastering this project:
1. Add a database (MongoDB, PostgreSQL)
2. Use a frontend framework (React, Vue)
3. Add user authentication
4. Deploy to cloud (Heroku, AWS, Azure)
5. Create mobile app version

---

**Happy Learning!** 🚀

Last Updated: March 31, 2026
