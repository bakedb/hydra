const modules = [
  {
    name: "HydraCore",
    keyword: "DSL",
    version: "1.3.2",
    description: "Core logic for Hydra scripting DSL."
  },
  {
    name: "SpriteKit",
    keyword: "sprites",
    version: "2.0.0",
    description: "Animated sprite rendering and alignment tools."
  },
  {
    name: "JuiceFX",
    keyword: "feedback",
    version: "0.9.5",
    description: "Celebratory feedback and UI polish utilities."
  },
  {
    name: "PyPackager",
    keyword: "packaging",
    version: "3.1.0",
    description: "Cross-platform packaging for Python apps."
  },
  {
    name: "FontFusion",
    keyword: "fonts",
    version: "1.0.1",
    description: "Custom font loader and floating text engine."
  }
];

const tableBody = document.getElementById("module-table");
const search = document.getElementById("search");

function renderModules(filter = "") {
  tableBody.innerHTML = "";
  modules
    .filter(mod =>
      Object.values(mod).some(val =>
        val.toLowerCase().includes(filter.toLowerCase())
      )
    )
    .forEach(mod => {
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

search.addEventListener("input", () => renderModules(search.value));
renderModules();

let targetX = 50;
let targetY = 50;
let currentX = 50;
let currentY = 50;

document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  targetX = (e.clientX / innerWidth) * 100;
  targetY = (e.clientY / innerHeight) * 100;
});

function updateGradient() {
  // Smoothly interpolate toward target
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  document.documentElement.style.setProperty("--gradient-x", `${currentX}%`);
  document.documentElement.style.setProperty("--gradient-y", `${currentY}%`);

  requestAnimationFrame(updateGradient);
}

updateGradient();
