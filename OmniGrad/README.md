# OmniGrad 🎓

A professional full-stack student management system with modern glassmorphism UI, real-time search, comprehensive form validation, and stats dashboard.

**Technologies:**
- Frontend: HTML5, CSS3 (Glassmorphism, BEM), Vanilla JavaScript (Fetch API)
- Backend: Node.js (vanilla HTTP server)
- Data Storage: JSON file
- Design: Monochromatic dark theme with Electric Cyan accent

## Features

🎨 **Modern Glassmorphism UI** - Professional monochromatic dark design with backdrop blur effects  
📊 **Stats Dashboard** - Real-time metrics for total students, unique courses, and recent activity  
✅ **Form Validation** - Real-time email validation with inline error messages  
🔍 **Live Search & Filter** - Search by name, course, or email with instant results  
✏️ **Edit Modal** - Update student information with dedicated modal interface  
🔔 **Toast Notifications** - Success/error messages with auto-dismiss  
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
👤 **View all students** - Display students in a beautiful responsive grid with avatars  
✨ **Add new students** - Create records with comprehensive validation  
🗑️ **Delete students** - Remove records with confirmation dialog  
🔄 **Real-time updates** - Instant UI refresh across all components  
🌐 **CORS enabled** - Frontend and backend can run independently  

## Project Structure

```
OmniGrad/
├── index.html         # Frontend HTML with semantic structure
├── style.css          # 800+ lines: Glassmorphism design, BEM naming
├── script.js          # Complete feature implementation
├── server.js          # Node.js backend with CRUD routes
├── students.json      # Data persistence
└── README.md          # This file
```

## How It Works

### Frontend (Browser)
- User enters student details (name, course, email)
- Clicks "Add Student" button
- Frontend makes API requests to backend
- Data updates in real-time without page reload
- Email validation happens before submission
- Toast notifications provide immediate feedback
- Search filters update instantly as you type

### Backend (Node.js)
- Handles GET, POST, DELETE, PUT requests
- Stores data in `students.json` file
- Returns JSON responses
- Includes CORS headers for cross-origin requests
- PUT endpoint allows editing student records

## Key Features Implementation

### 1. **Edit Modal with PUT Method**
- Click "✎ Edit" on any student card
- Modal pops up with pre-filled student data
- Update information and save
- PUT request sent to `/api/students/:id`
- Real-time state update in frontend
- Success toast confirms the update

### 2. **Live Search & Filtering**
- Type in the search box to filter instantly
- Searches across name, course, and email fields
- Results update in real-time (no server round-trip)
- Shows count of matching students
- Clear search to see all students again

### 3. **Form Validation with Error Messages**
- Email validation using regex pattern
- Name and course minimum length checks
- Inline error messages appear below inputs
- Input fields highlight in red on error
- Validation runs before API submission
- Toast notifications for final feedback

### 4. **Stats Dashboard**
- Total Students counter (updates on add/delete)
- Unique Courses counter (calculated from all students)
- Recent Activity indicator
- Widgets refresh in real-time with each action
- Elegant card-based design

## Installation

No dependencies needed! Pure Node.js HTTP server with vanilla JavaScript frontend.

## Tech Deep Dive

## Usage

### Start the Server

```bash
cd OmniGrad
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
- ✅ **Full-stack development** - Frontend and backend integration
- ✅ **Fetch API** - Making GET, POST, PUT, DELETE HTTP requests
- ✅ **REST API design** - Proper HTTP methods for CRUD operations
- ✅ **State management** - Managing application state with vanilla JS
- ✅ **Form validation** - Regex patterns, error handling, user feedback
- ✅ **DOM manipulation** - Dynamic rendering, event handling, modal management
- ✅ **Real-time filtering** - Client-side search without server requests
- ✅ **CSS3 advanced** - Glassmorphism, animations, responsive design, BEM methodology
- ✅ **Error handling** - Try/catch, error toasts, user-friendly messages
- ✅ **Data persistence** - JSON file storage, CRUD operations
- ✅ **CORS** - Cross-Origin Resource Sharing between frontend and backend
- ✅ **UX best practices** - Toast notifications, form validation, loading states
- ✅ **Async/Await** - Handling asynchronous operations
- ✅ **DOM manipulation** - Dynamically updating the webpage
- ✅ **Form handling** - Capturing user input

## File Details

### index.html
- Semantic HTML5 structure with proper form labels
- Stats dashboard with 3 metric widgets
- Live search input with results indicator
- Edit modal for updating student information
- Toast notification container
- BEM-class named elements for clarity

### style.css
- **800+ lines** of CSS with:
- Glassmorphism design with backdrop blur effects
- 60+ CSS custom properties for design system
- BEM naming convention for maintainability
- Responsive grid layout (desktop, tablet, mobile)
- Smooth animations (drift, float, modalFadeIn, toastSlideIn)
- Dark monochromatic theme (#0f172a) with Electric Cyan accent (#00d9ff)
- Card-based design with hover effects
- Modal overlay with fade/slide animations
- Toast notifications with auto-dismiss

### script.js
- **Complete feature implementation:**
  - `loadStudents()` - Fetch and render with state management
  - `addStudent()` - Form validation, error display, API POST
  - `openEditModal()` / `closeEditModal()` - Modal management
  - `saveEditedStudent()` - PUT request for updates
  - `handleSearch()` - Real-time filtering across name/course/email
  - `updateStats()` - Calculate and display metrics
  - `showToast(message, type, duration)` - Notification system
  - `validateForm()` - Email regex, field validation
  - `displayFormErrors()` - Inline error message rendering
  - Full error handling with try/catch blocks

### server.js
- HTTP server on port 3000
- CORS headers for cross-origin requests
- GET `/api/students` - Fetch all students
- POST `/api/students` - Create new student
- PUT `/api/students/:id` - Update existing student
- DELETE `/api/students/:id` - Delete student
- File I/O for data persistence in students.json
- Error handling and JSON parsing

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

✅ **Already Implemented:**
- Edit functionality with modal
- Search/filter with real-time results
- Form validation with error messages
- Toast notifications for user feedback
- Stats dashboard with live metrics

🚀 **Possible Enhancements:**
1. **Sorting** - Sort by name, course, or email
2. **Data export** - Download student list as CSV/PDF
3. **Server tests** - Add unit tests for API endpoints
4. **Database** - Replace JSON with MongoDB or SQLite
5. **Authentication** - Add login/logout functionality
6. **Pagination** - Split large lists into pages
7. **Advanced search** - Filter by multiple criteria
8. **Bulk operations** - Select and delete multiple students
9. **Student profiles** - Click to see detailed student info
10. **Import data** - Upload CSV to add multiple students
11. **Dark/Light theme toggle** - User preference switching
12. **Student ID generation** - Automatic unique IDs
13. **Course management** - Manage available courses
14. **Email notifications** - Send confirmations on add/update
15. **Duplicate detection** - Warn about duplicate emails

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

## Design System & Customization

### CSS Variables
All colors, fonts, and spacing are defined in CSS custom properties at the top of `style.css`:

```css
/* Colors */
--primary: #00d9ff;        /* Electric Cyan */
--background: #0f172a;     /* Deep Navy */
--surface: #111a2c;        /* Slightly lighter navy */

/* Fonts */
--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
--font-size-base: 16px;
--font-weight-normal: 400;
--font-weight-bold: 600;

/* Spacing */
--spacing-base: 16px;
--spacing-sm: 8px;
--spacing-lg: 24px;
```

### Theming
To change the color scheme:
1. Open `style.css`
2. Modify the CSS variables at the top
3. Changes apply instantly across all components

### Glassmorphism Effect
The modern glassmorphism look is achieved with:
- `backdrop-filter: blur(10px)` - Frosted glass effect
- `background: rgba(255, 255, 255, 0.1)` - Semi-transparent background
- `border: 1px solid rgba(255, 255, 255, 0.2)` - Subtle border

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14.1+
- ✅ Edge 90+

Note: Glassmorphism (backdrop-filter) requires modern browser support.

## License

Free to use for learning purposes. Perfect for practicing full-stack development!

## Credits

Created as a professional student management solution demonstrating:
- Modern web design principles
- Complete CRUD operations
- Professional error handling
- User experience best practices
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
