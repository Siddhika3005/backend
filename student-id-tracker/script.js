const container = document.getElementById("students");
const emptyState = document.getElementById("emptyState");
const studentCountBadge = document.getElementById("studentCount");

async function loadStudents() {
  try {
    const res = await fetch("http://localhost:3000/api/students");
    const students = await res.json();

    container.innerHTML = "";

    if (students.length === 0) {
      emptyState.classList.add("empty-state--visible");
      container.innerHTML = "";
      return;
    }

    emptyState.classList.remove("empty-state--visible");

    students.forEach((student) => {
      const initials = student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const card = document.createElement("div");
      card.className = "student-card";

      card.innerHTML = `
        <div class="student-card__header">
          <div class="student-card__avatar">${initials}</div>
          <div class="student-card__title-group">
            <h3 class="student-card__name">${escapeHtml(student.name)}</h3>
            <p class="student-card__id">ID: ${student.id}</p>
          </div>
        </div>

        <div class="student-card__content">
          <div class="student-card__field">
            <span class="student-card__label">Course</span>
            <span class="student-card__value">${escapeHtml(student.course)}</span>
          </div>
          <div class="student-card__field">
            <span class="student-card__label">Email</span>
            <span class="student-card__value">${escapeHtml(student.email)}</span>
          </div>
        </div>

        <div class="student-card__actions">
          <button class="button button--danger student-card__action-button" onclick="deleteStudent(${student.id})">
            Delete
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Update student count badge
    const count = students.length;
    studentCountBadge.textContent = `${count} ${count === 1 ? "student" : "students"}`;
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

async function addStudent() {
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !course || !email) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course, email }),
    });

    if (res.ok) {
      // Clear form inputs
      document.getElementById("name").value = "";
      document.getElementById("course").value = "";
      document.getElementById("email").value = "";

      // Reload students
      await loadStudents();
    }
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Failed to add student");
  }
}

async function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    try {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadStudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  }
}

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Load students on page load
loadStudents();
