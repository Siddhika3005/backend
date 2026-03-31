const container = document.getElementById("students");

async function loadStudents() {
  const res = await fetch("http://localhost:3000/api/students");

  const students = await res.json();

  container.innerHTML = "";

  students.forEach((student) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
			<h3>${student.name}</h3>
			<p><strong>Course:</strong> ${student.course}</p>
			<p><strong>Email:</strong> ${student.email}</p>

			<div class="actions">
				<button onclick="deleteStudent(${student.id})">Delete</button>
			</div>
		`;

    container.appendChild(card);
  });
}

async function addStudent() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const email = document.getElementById("email").value;

  if (!name || !course || !email) {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:3000/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, course, email }),
  });

  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
  document.getElementById("email").value = "";

  loadStudents();
}

async function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "DELETE",
    });

    loadStudents();
  }
}

loadStudents();
