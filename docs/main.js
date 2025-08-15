// main.js

// DOM elements
const tableBody = document.getElementById("module-table");
const searchInput = document.getElementById("search");

// Load modules from embedded <script type="application/json">
const raw = document.getElementById("module-data").textContent;
let modules = [];

try {
  modules = JSON.parse(raw);
  renderModules(); // Initial render
} catch (error) {
  console.error("Error parsing embedded module data:", error);
  tableBody.innerHTML = `<tr><td colspan="4">Failed to load module data.</td></tr>`;
}

// Render table rows based on filter
function renderModules(filter = "") {
  tableBody.innerHTML = "";

  const filtered = modules.filter(mod =>
    Object.values(mod).some(val =>
      val.toLowerCase().includes(filter.toLowerCase())
    )
  );

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No matching modules found.</td></tr>`;
    return;
  }

  filtered.forEach(mod => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${mod.name}</td>
      <td>${mod.keyword}</td>
      <td>${mod.version}</td>
      <td>${mod.description}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Live search
searchInput.addEventListener("input", e => {
  renderModules(e.target.value);
});
