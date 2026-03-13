# Todo App Backend

A simple Node.js command-line todo application that stores tasks in a JSON file.

## Features

- ✅ Add new todos
- 📋 List all todos
- 🎉 Mark todos as done
- 🗑️ Delete todos

## Project Structure

```
backend/
├── README.md          # This file
├── todo-app/
│   ├── todo.js       # Main todo module
│   └── todos.json    # Todo storage file
```

## Installation

1. Ensure you have Node.js installed on your system
2. Navigate to the project directory:
   ```bash
   cd backend
   ```

## Usage

Import the todo module in your Node.js application:

```javascript
const { addTodo, listTodos, markDone, deleteTodo } = require('./todo-app/todo');

// Add a new todo
addTodo('Buy groceries');

// List all todos
listTodos();

// Mark a todo as done (use the todo id)
markDone(1234567890);

// Delete a todo
deleteTodo(1234567890);
```

## API Reference

### `addTodo(task)`
Adds a new todo to the list.
- **Parameters:** `task` (string) - The task description
- **Returns:** Logs the added todo

### `listTodos()`
Displays all todos with their status.
- **Returns:** Logs all todos or a message if the list is empty

### `markDone(id)`
Marks a specific todo as completed.
- **Parameters:** `id` (number) - The unique identifier of the todo
- **Returns:** Logs success or error message

### `deleteTodo(id)`
Removes a todo from the list.
- **Parameters:** `id` (number) - The unique identifier of the todo
- **Returns:** Logs success or error message

## Data Format

Todos are stored in `todos.json` with the following structure:

```json
[
  {
    "id": 1234567890,
    "task": "Buy groceries",
    "done": false
  },
  {
    "id": 1234567891,
    "task": "Learn Node.js",
    "done": true
  }
]
```

## Requirements

- Node.js (v12 or higher)

## License

This project is open source and available for use.