const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVkZlOIa0g8uaOVMIgn6l3uRiBSs1y0xauosE2oSaZrDi8vG65dBt26bZ1R-LB00CvFNqszzM9DPjt/pub?output=csv";

let entries = [];

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  complete: function(results) {

    entries = results.data
      .filter(row => row.DATA && row.TEKST)
      .map(row => ({
        date: row.DATA.trim(),
        text: row.TEKST.trim()
      }));

    renderDates();
    renderEntries();
  }
});

function renderDates(){
  const box = document.getElementById("dateList");
  const dates = [...new Set(entries.map(e => e.date))];

  box.innerHTML = "";
  dates.forEach(d => {
    const btn = document.createElement("button");
    btn.textContent = d;
    btn.onclick = () => renderEntries(d);
    box.appendChild(btn);
  });
}

function renderEntries(filterDate = null){
  const box = document.getElementById("entries");
  box.innerHTML = "";

  entries.forEach(e => {
    if(filterDate && e.date !== filterDate) return;

    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <div class="entry-date">${e.date}</div>
      <div>${e.text}</div>
    `;
    box.appendChild(div);
  });
}