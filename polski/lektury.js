const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3FmM1fc-1XKmJJKt7jR2AaDPiCTzGOpaCOjsJaT-AwS7YQYa9AJPUZYfxcV2TzfeglLLu0py8EJUc/pub?output=csv";

let entries = [];
let activeFilters = {
  epoka: null,
  dzielo: null,
  autor: null
};

Papa.parse(SHEET_URL, {
  download: true,
  header: false,
  complete: function(results) {

    entries = results.data
      .slice(1) // IGNORUJE PIERWSZY WIERSZ
      .filter(row => row[0] && row[3])
      .map(row => ({
        epoka: row[0]?.trim() || "",
        dzielo: row[1]?.trim() || "",
        autor: row[2]?.trim() || "",
        streszczenie: row[3]?.trim() || "",
        konteksty: row[4]?.trim() || ""
      }));

    renderFilters();
    renderEpochList();
    renderEntries();
  }
});

function renderFilters(){
  renderFilterGroup("epokaFilters", "epoka");
  renderFilterGroup("dzieloFilters", "dzielo");
  renderFilterGroup("autorFilters", "autor");
}

function renderFilterGroup(elementId, key){
  const box = document.getElementById(elementId);
  const values = [...new Set(entries.map(e => e[key]).filter(v => v))];

  box.innerHTML = "";

  values.forEach(v => {
    const btn = document.createElement("button");
    btn.textContent = v;
    btn.onclick = () => {
      activeFilters[key] = v;
      renderEntries();
    };
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
        <span>${e.epoka}</span>
        <span>${e.autor}</span>
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
function renderEpochList(){
  const box = document.getElementById("epochList");
  const epoki = [...new Set(entries.map(e => e.epoka))];

  box.innerHTML = "";
  epoki.forEach(ep => {
    const li = document.createElement("li");
    li.textContent = ep;
    li.onclick = () => {
      activeFilters.epoka = ep;
      renderEntries();
    };
    box.appendChild(li);
  });
}

// LOSUJ LEKTURĘ
function randomEntry(){
  const random = entries[Math.floor(Math.random() * entries.length)];
  activeFilters.epoka = null;
  activeFilters.dzielo = random.dzielo;
  activeFilters.autor = null;
  renderEntries();
}

// TRYB NOCNY
function toggleDarkMode(){
  document.body.classList.toggle("dark");
}