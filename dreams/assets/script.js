const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRppV24sIlzNsiAGRsl12a_lz78cC1O2q6P2azGtiFGe5xe5lQWLXhQ-uwc88vDrMSybrvqOkCGx3e-/pub?output=csv";

const categoryMap = {
    "POD": "Podróże",
    "GRY": "Gry",
    "MAR": "Marzenia",
    "SPR": "Sprzęt",
    "RZC": "Rzeczy",
    "FLM": "Filmy",
    "OSB": "Osobiste",
    "WYD": "Wywiad"
};

const categoryIcons = {
    "Podróże": "✈️",
    "Gry": "🎮",
    "Marzenia": "⭐",
    "Sprzęt": "💾",
    "Rzeczy": "📦",
    "Filmy": "🎬",
    "Osobiste": "💚",
    "Wywiad": "🎙️",
    "Inne": "📁"
};

const statusIcons = {
    "DONE": "✅",
    "PENDING": "🟠",
    "IDEA": "⚪"
};

let items = [];
let currentFilter = "all";

function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"' && inQuotes && next === '"') {
            field += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
            row.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") i++;

            row.push(field);
            rows.push(row);
            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    if (field.length || row.length) {
        row.push(field);
        rows.push(row);
    }

    return rows;
}

fetch(SHEET_URL)
    .then(res => res.text())
    .then(text => {
        const rows = parseCSV(text).slice(1);

        items = rows
            .filter(row => row.length >= 2)
            .map(row => {
                const tag = row[0]?.trim() || "";
                const name = row[1]?.trim() || "";
                const link = row[2]?.trim() || "";
                const status = row[3]?.trim().toUpperCase() || "IDEA";

                return {
                    tag,
                    category: categoryMap[tag] || "Inne",
                    name,
                    link,
                    status: statusIcons[status] ? status : "IDEA"
                };
            });

        renderCategories();
        renderList();
    });

function renderCategories() {
    const box = document.getElementById("categoryButtons");
    box.innerHTML = "";

    const categories = ["all", ...new Set(items.map(item => item.category))];

    categories.forEach(category => {
        const button = document.createElement("button");

        const count = category === "all"
            ? items.length
            : items.filter(item => item.category === category).length;

        if (category === "all") {
            button.textContent = `📋 Wszystkie (${count})`;
        } else {
            button.textContent = `${categoryIcons[category] || "📁"} ${category} (${count})`;
        }

        button.className = "category-btn";

        if (category === currentFilter) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentFilter = category;
            renderCategories();
            renderList();
        });

        box.appendChild(button);
    });
}

function renderList() {
    const list = document.getElementById("wishlist");
    list.innerHTML = "";

    items.forEach(item => {
        if (currentFilter !== "all" && item.category !== currentFilter) {
            return;
        }

        const li = document.createElement("li");

        li.classList.add(`status-${item.status.toLowerCase()}`);

        const left = document.createElement("div");
        left.className = "wish-left";

        const categoryIcon = document.createElement("span");
        categoryIcon.className = "category-icon";
        categoryIcon.textContent = categoryIcons[item.category] || "📁";

        const name = item.link
            ? document.createElement("a")
            : document.createElement("span");

        name.textContent = item.name;

        if (item.link) {
            name.href = item.link;
            name.target = "_blank";
            name.rel = "noopener noreferrer";
        }

        left.appendChild(categoryIcon);
        left.appendChild(name);

        const status = document.createElement("span");
        status.className = "status-icon";
        status.textContent = statusIcons[item.status];

        li.appendChild(left);
        li.appendChild(status);

        list.appendChild(li);
    });
}