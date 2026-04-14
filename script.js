const addBtn = document.getElementById("addBtn");
const container = document.getElementById("notesContainer");
const search = document.getElementById("search");

const colors = [
  "#d1f0d1", "#f8d7da", "#e2d4f0", "#fff3b0", "#d0ebff"
];

// Load Notes
window.onload = loadNotes;

function addNote(text = "", date = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.style.background = colors[Math.floor(Math.random() * colors.length)];

  note.innerHTML = `
    <span class="delete-btn">🗑️</span>
    <textarea placeholder="Write something...">${text}</textarea>
    <div class="date">${date || new Date().toLocaleString()}</div>
  `;

  // Delete note
  note.querySelector(".delete-btn").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Save on typing
  note.querySelector("textarea").addEventListener("input", saveNotes);

  container.appendChild(note);
  saveNotes();
}

// Add Button
addBtn.addEventListener("click", () => addNote());

// Save Notes
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note").forEach(note => {
    notes.push({
      text: note.querySelector("textarea").value,
      date: note.querySelector(".date").innerText
    });
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load Notes
function loadNotes() {
  const data = JSON.parse(localStorage.getItem("notes")) || [];
  data.forEach(n => addNote(n.text, n.date));
}

// Search Function
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  document.querySelectorAll(".note").forEach(note => {
    const text = note.querySelector("textarea").value.toLowerCase();
    note.style.display = text.includes(value) ? "block" : "none";
  });
});