// State Management
let allStudents = [];
let editingStudentId = null;

// DOM Elements
const container = document.getElementById("students");
const emptyState = document.getElementById("emptyState");
const editModal = document.getElementById("editModal");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Validation Patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================================
// VALIDATION & ERROR HANDLING
// ============================================================================

function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

function validateForm(name, course, email, prefix = "") {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!course || course.trim().length < 2) {
    errors.course = "Course must be at least 2 characters";
  }

  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Display errors
  displayFormErrors(errors, prefix);

  return Object.keys(errors).length === 0;
}

function displayFormErrors(errors, prefix = "") {
  // Clear all errors first
  document.querySelectorAll(`.${prefix}Error`).forEach((el) => {
    el.textContent = "";
    el.classList.remove("form__error--visible");
    const input = el.previousElementSibling;
    if (input) input.classList.remove("form__input--error");
  });

  // Display new errors
  if (errors.name) {
    const errorEl = document.getElementById(`${prefix}nameError`);
    const inputEl = document.getElementById(`${prefix}name`);
    if (errorEl && inputEl) {
      errorEl.textContent = errors.name;
      errorEl.classList.add("form__error--visible");
      inputEl.classList.add("form__input--error");
    }
  }

  if (errors.course) {
    const errorEl = document.getElementById(`${prefix}courseError`);
    const inputEl = document.getElementById(`${prefix}course`);
    if (errorEl && inputEl) {
      errorEl.textContent = errors.course;
      errorEl.classList.add("form__error--visible");
      inputEl.classList.add("form__input--error");
    }
  }

  if (errors.email) {
    const errorEl = document.getElementById(`${prefix}emailError`);
    const inputEl = document.getElementById(`${prefix}email`);
    if (errorEl && inputEl) {
      errorEl.textContent = errors.email;
      errorEl.classList.add("form__error--visible");
      inputEl.classList.add("form__input--error");
    }
  }
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, type = "success", duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast toast--${type} toast--visible`;

  setTimeout(() => {
    toast.classList.add("toast--exit");
    setTimeout(() => {
      toast.classList.remove("toast--visible", `toast--${type}`, "toast--exit");
    }, 250);
  }, duration);
}

// ============================================================================
// STATS DASHBOARD
// ============================================================================

function updateStats() {
  const totalStudents = allStudents.length;
  const uniqueCourses = [...new Set(allStudents.map((s) => s.course))].length;
  const recentActivity = allStudents.length > 0 ? `${totalStudents} enrolled` : "—";

  document.getElementById("totalStudents").textContent = totalStudents;
  document.getElementById("uniqueCourses").textContent = uniqueCourses;
  document.getElementById("recentActivity").textContent = recentActivity;
}

// ============================================================================
// LOAD STUDENTS
// ============================================================================

async function loadStudents() {
  try {
    const res = await fetch("http://localhost:3000/api/students");
    if (!res.ok) throw new Error("Failed to load students");

    allStudents = await res.json();
    updateStats();
    renderStudents(allStudents);
  } catch (error) {
    console.error("Error loading students:", error);
    showToast("Error loading students", "error");
  }
}

// ============================================================================
// RENDER STUDENTS
// ============================================================================

function renderStudents(students) {
  container.innerHTML = "";

  if (students.length === 0) {
    emptyState.classList.add("empty-state--visible");
    return;
  }

  emptyState.classList.remove("empty-state--visible");

  students.forEach((student) => {
    const card = createStudentCard(student);
    container.appendChild(card);
  });
}

function createStudentCard(student) {
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
      <button class="button button--secondary student-card__action-button" onclick="openEditModal(${student.id})">
        ✎ Edit
      </button>
      <button class="button button--danger student-card__action-button" onclick="deleteStudent(${student.id})">
        🗑 Delete
      </button>
    </div>
  `;

  return card;
}

// ============================================================================
// ADD STUDENT
// ============================================================================

async function addStudent() {
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!validateForm(name, course, email)) {
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course, email }),
    });

    if (res.ok) {
      document.getElementById("name").value = "";
      document.getElementById("course").value = "";
      document.getElementById("email").value = "";
      clearFormErrors();

      await loadStudents();
      showToast(`✅ ${name} added successfully!`, "success");
    } else {
      showToast("Error adding student", "error");
    }
  } catch (error) {
    console.error("Error adding student:", error);
    showToast("Failed to add student", "error");
  }
}

// ============================================================================
// EDIT STUDENT MODAL
// ============================================================================

function openEditModal(studentId) {
  const student = allStudents.find((s) => s.id === studentId);
  if (!student) return;

  editingStudentId = studentId;
  document.getElementById("editName").value = student.name;
  document.getElementById("editCourse").value = student.course;
  document.getElementById("editEmail").value = student.email;

  clearFormErrors("edit");
  editModal.classList.add("modal--open");
}

function closeEditModal() {
  editModal.classList.remove("modal--open");
  editingStudentId = null;
  clearFormErrors("edit");
}

async function saveEditedStudent() {
  const name = document.getElementById("editName").value.trim();
  const course = document.getElementById("editCourse").value.trim();
  const email = document.getElementById("editEmail").value.trim();

  if (!validateForm(name, course, email, "edit")) {
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/students/${editingStudentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course, email }),
      }
    );

    if (res.ok) {
      closeEditModal();
      await loadStudents();
      showToast(`✅ ${name} updated successfully!`, "success");
    } else {
      showToast("Error updating student", "error");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    showToast("Failed to update student", "error");
  }
}

// ============================================================================
// DELETE STUDENT
// ============================================================================

async function deleteStudent(id) {
  const student = allStudents.find((s) => s.id === id);
  if (!student) return;

  if (confirm(`Are you sure you want to delete ${student.name}?`)) {
    try {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadStudents();
        showToast(`✅ ${student.name} deleted`, "success");
      } else {
        showToast("Error deleting student", "error");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      showToast("Failed to delete student", "error");
    }
  }
}

// ============================================================================
// SEARCH & FILTER
// ============================================================================

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length === 0) {
    searchResults.classList.remove("search-results--visible");
    renderStudents(allStudents);
    return;
  }

  const filtered = allStudents.filter((student) => {
    return (
      student.name.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  // Show search results indicator
  const resultCount = filtered.length;
  searchResults.textContent = `Found ${resultCount} ${resultCount === 1 ? "student" : "students"}`;
  searchResults.classList.add("search-results--visible");

  renderStudents(filtered);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

function clearFormErrors(prefix = "") {
  document.querySelectorAll(`.form__error`).forEach((el) => {
    el.textContent = "";
    el.classList.remove("form__error--visible");
  });
  document.querySelectorAll(`.form__input`).forEach((el) => {
    el.classList.remove("form__input--error");
  });
}

// Close modal when clicking overlay
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", closeEditModal);
  }

  // Clear search when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box") && searchInput.value.trim() === "") {
      searchResults.classList.remove("search-results--visible");
    }
  });

  // Initial load
  loadStudents();
});
