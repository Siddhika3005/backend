const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DATA_FILE = "./students.json";

function getStudents() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveStudents(students) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

const server = http.createServer((req, res) => {
  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // HANDLE PREFLIGHT
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // GET all students
  if (req.method === "GET" && req.url === "/api/students") {
    const students = getStudents();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
    return;
  }

  // ADD student
  if (req.method === "POST" && req.url === "/api/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newStudent = JSON.parse(body);

      const students = getStudents();

      newStudent.id = Date.now();

      students.push(newStudent);

      saveStudents(students);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student added", student: newStudent }));
    });
    return;
  }

  // DELETE student
  if (req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[3]);

    let students = getStudents();

    students = students.filter((s) => s.id !== id);

    saveStudents(students);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Student deleted" }));
    return;
  }

  // EDIT student
  if (req.method === "PUT") {
    const id = parseInt(req.url.split("/")[3]);

    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      const updated = JSON.parse(body);

      let students = getStudents();

      students = students.map((s) => (s.id === id ? { ...s, ...updated } : s));

      saveStudents(students);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student updated" }));
    });
    return;
  }

  // 404 - Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📂 Data stored in ${DATA_FILE}`);
});
