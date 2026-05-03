const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3FmM1fc-1XKmJJKt7jR2AaDPiCTzGOpaCOjsJaT-AwS7YQYa9AJPUZYfxcV2TzfeglLLu0py8EJUc/pub?output=csv";

let entries = [];
let activeFilters = {
  epoka: null,
  dzielo: null,
  autor: null,
  motyw: null
};

Papa.parse(SHEET_URL, {
  download: true,
  header: false,
    complete: function(results) {
    entries = results.data
    .slice(1)
    .filter(row => row[0] && row[3])
    .map(row => ({
      epoka: row[0]?.trim() || "",
      dzielo: row[1]?.trim() || "",
      autor: row[2]?.trim() || "",
      streszczenie: row[3]?.trim() || "",
      konteksty: row[4]?.trim() || "",
      motywy: row[5]
        ? row[5].split(",").map(m => m.trim()).filter(m => m)
        : [],

      epoka_nazwa: row[7]?.trim() || "",
      epoka_opis: row[8]?.trim() || "",
      epoka_motywy: row[9]
        ? row[9].split(",").map(m => m.trim()).filter(m => m)
        : []
    }));

    renderFilters();
    // renderEpochList();
    renderEntries();
    highlightActiveFilters();
    renderTimeline();
  }
});

function renderFilters(){
  renderFilterGroup("epokaFilters", "epoka");
  renderFilterGroup("dzieloFilters", "dzielo");
  renderFilterGroup("autorFilters", "autor");
}

function renderFilterGroup(elementId, key){
  const box = document.getElementById(elementId);
  if(!box) return;

  const values = [...new Set(entries.map(e => e[key]).filter(v => v))];

  box.innerHTML = "";

  values.forEach(v => {
    const btn = document.createElement("button");
    btn.textContent = v;

    btn.onclick = () => {
      // JEŚLI JUŻ ZAZNACZONE → ODKLIKNIJ
      if(activeFilters[key] === v){
        activeFilters[key] = null;
      } else {
        activeFilters[key] = v;
      }
      renderEntries();
      highlightActiveFilters();
    };

    btn.dataset.value = v;
    box.appendChild(btn);
  });
}

function renderEntries(){
  const box = document.getElementById("entries");
  const search = document.getElementById("search").value.toLowerCase();
  box.innerHTML = "";

  entries.forEach(e => {

    if(activeFilters.epoka && e.epoka !== activeFilters.epoka) return;
    if(activeFilters.dzielo && e.dzielo !== activeFilters.dzielo) return;
    if(activeFilters.autor && e.autor !== activeFilters.autor) return;
    if(activeFilters.motyw && !e.motywy.includes(activeFilters.motyw)) return;

    // WYSZUKIWARKA
    if(search){
      const text = (e.dzielo + e.autor + e.streszczenie + e.konteksty).toLowerCase();
      if(!text.includes(search)) return;
    }

    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <h2>${e.dzielo}</h2>

      <div class="tags">
        <div><b>Epoka:</b> ${e.epoka}</div>
        <div><b>Autor:</b> ${e.autor}</div>
      </div>

      <div class="motywy">
        ${e.motywy.map(m => `<span class="tag" onclick="filterByMotyw('${m}')">${m}</span>`).join("")}
      </div>

      <h3>Streszczenie</h3>
      <p>${e.streszczenie}</p>

      <h3>Konteksty</h3>
      <p>${e.konteksty}</p>
    `;

    box.appendChild(div);
  });
}

// SPIS EPOK
// function renderEpochList(){
//   const box = document.getElementById("epochList");
//   const epoki = [...new Set(entries.map(e => e.epoka))];

//   box.innerHTML = "";
//   epoki.forEach(ep => {
//     const li = document.createElement("li");
//     li.textContent = ep;
//     li.onclick = () => {
//       activeFilters.epoka = ep;
//       renderEntries();
//     };
//     box.appendChild(li);
//   });
// }

// LOSUJ LEKTURĘ
function randomEntry(){
  const random = entries[Math.floor(Math.random() * entries.length)];
  activeFilters.epoka = null;
  activeFilters.dzielo = random.dzielo;
  activeFilters.autor = null;
  renderEntries();
}

function filterByMotyw(motyw){
  activeFilters.motyw = motyw;
  renderEntries();
}

// TRYB NOCNY
function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

function highlightActiveFilters(){
  ["epokaFilters","dzieloFilters","autorFilters"].forEach((id, index)=>{
    const key = ["epoka","dzielo","autor"][index];
    const box = document.getElementById(id);
    const buttons = box.querySelectorAll("button");

    buttons.forEach(btn=>{
      if(btn.dataset.value === activeFilters[key]){
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  });
}

// renderFilters();
// renderEpochList();
// renderEntries();
// highlightActiveFilters();

function resetFilters(){
  activeFilters = {
    epoka: null,
    dzielo: null,
    autor: null,
    motyw: null
  };

  document.getElementById("search").value = "";
  renderEntries();
  highlightActiveFilters();
  highlightActiveTimeline();
}

// ============= TIMELINE EPOK ================

function getEpokaYears(epoka){
    const map = {
      "Starożytność": "do V w.",
      "Średniowiecze": "V–XV w.",
      "Renesans": "XVI w.",
      "Barok": "XVII w.",
      "Oświecenie": "XVIII w.",
      "Romantyzm": "1822–1863",
      "Pozytywizm": "1864–1890",
      "Młoda Polska": "1890–1918",
      "Dwudziestolecie międzywojenne": "1918–1939",
      "Wojna": "1939–1945",
      "Współczesność": "po 1945"
    };

    return map[epoka] || "";
  }

function renderTimeline(){
  const timeline = document.getElementById("timeline");
  if(!timeline) return;

  const epoki = [
    "Starożytność",
    "Średniowiecze",
    "Renesans",
    "Barok",
    "Oświecenie",
    "Romantyzm",
    "Pozytywizm",
    "Młoda Polska",
    "Dwudziestolecie międzywojenne",
    "Wojna",
    "Współczesność"
  ];

  timeline.innerHTML = "";

  epoki.forEach(epoka => {
    const div = document.createElement("div");
    div.className = "timelineItem";

    div.innerHTML = `
      <div>${epoka}</div>
      <small>${getEpokaYears(epoka)}</small>
    `;

    div.dataset.value = epoka;

    div.onclick = () => {
      if(activeFilters.epoka === epoka){
        activeFilters.epoka = null;
      } else {
        activeFilters.epoka = epoka;
      }

      openEpokaModal(epoka);
      renderEntries();
      highlightActiveTimeline();
      highlightActiveFilters();
    };

    timeline.appendChild(div);
  });
}

// ================ EPOKI OKIENKA =================

function openEpokaModal(epoka){
  const modal = document.getElementById("epokaModal");
  modal.classList.remove("hidden");

  document.getElementById("modalTitle").textContent = epoka;

  // 👇 NOWE
  document.getElementById("modalYears").textContent = getEpokaYears(epoka);

  const first = entries.find(e => e.epoka === epoka);

  document.getElementById("modalOpis").textContent =
    first?.epoka_opis || "Brak opisu";

  document.getElementById("modalMotywy").innerHTML =
    (first?.epoka_motywy || [])
      .map(m => `<span class="tag">${m}</span>`)
      .join("");

  const lektury = entries.filter(e => e.epoka === epoka);

  document.getElementById("modalLektury").innerHTML =
    lektury.map(e => `
      <div class="modalLektura">
        <b>${e.dzielo}</b><br>
        <small>${e.autor}</small>
      </div>
    `).join("");
}

function closeEpokaModal(){
  document.getElementById("epokaModal").classList.add("hidden");
}

const modalWindow = document.getElementById("modalWindow");
const modalBar = document.getElementById("modalBar");

let offsetX = 0, offsetY = 0, isDown = false;

modalBar?.addEventListener("mousedown", (e)=>{
  isDown = true;
  offsetX = e.clientX - modalWindow.offsetLeft;
  offsetY = e.clientY - modalWindow.offsetTop;
});

document.addEventListener("mousemove", (e)=>{
  if(!isDown) return;
  modalWindow.style.position = "absolute";
  modalWindow.style.left = (e.clientX - offsetX) + "px";
  modalWindow.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", ()=> isDown = false);