# Calculator Server

A simple HTTP server built with Express.js that performs basic arithmetic operations through query parameters.

## Features

- 4 mathematical operation endpoints
- RESTful API design
- Query parameter-based inputs
- JSON responses

## Routes

| Endpoint | Method | Parameters | Example |
|----------|--------|-----------|---------|
| `/sum` | GET | `a`, `b` | `http://localhost:3000/sum?a=5&b=3` |
| `/multiply` | GET | `a`, `b` | `http://localhost:3000/multiply?a=5&b=3` |
| `/divide` | GET | `a`, `b` | `http://localhost:3000/divide?a=6&b=2` |
| `/subtract` | GET | `a`, `b` | `http://localhost:3000/subtract?a=5&b=3` |

## Response Format

All endpoints return JSON with the calculation result:

```json
{
  "ans": 8
}
```

## Installation

```bash
npm install
```

## Running the Server

```bash
node index.js
```

The server will start on `http://localhost:3000`

You should see:
```
Server running on port 3000
```

## Usage Examples

```bash
# Sum: 5 + 3 = 8
curl http://localhost:3000/sum?a=5&b=3

# Multiply: 5 * 3 = 15
curl http://localhost:3000/multiply?a=5&b=3

# Divide: 6 / 2 = 3
curl http://localhost:3000/divide?a=6&b=2

# Subtract: 5 - 3 = 2
curl http://localhost:3000/subtract?a=5&b=3
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework

## Project Structure

```
calculator-server/
├── index.js          # Main server file with all routes
├── package.json      # Project dependencies and metadata
├── package-lock.json # Locked versions of dependencies
├── .gitignore        # Files to ignore in git
└── README.md         # This file
```

## Author

Created for learning HTTP servers and REST API basics.
