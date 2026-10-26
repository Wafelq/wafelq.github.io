const manifestUrl = "articles.json";

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nie można wczytać ${url} (HTTP ${response.status}).`);
  }
  return response.text();
}

async function loadManifest() {
  const text = await fetchText(manifestUrl);
  const articles = JSON.parse(text);
  if (!Array.isArray(articles)) {
    throw new Error("Plik articles.json musi zawierać listę artykułów.");
  }
  return articles;
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function createTickerGroup(articles, linked) {
  const group = document.createElement("div");
  group.className = "ticker-group";

  const welcome = document.createElement("span");
  welcome.textContent = "WITAJ NA MOJEJ STRONIE";
  group.append(welcome);

  articles.slice(0, 3).forEach((article) => {
    const separator = document.createElement("span");
    separator.className = "ticker-separator";
    separator.setAttribute("aria-hidden", "true");
    separator.textContent = "✦";
    group.append(separator);

    const item = linked ? document.createElement("a") : document.createElement("span");
    item.className = "ticker-item";
    if (linked) {
      item.href = `article.html?post=${encodeURIComponent(article.slug)}`;
    }
    item.textContent = `${formatDate(article.date)} — ${article.title}`;
    group.append(item);
  });

  return group;
}

function renderTicker(articles) {
  const track = document.querySelector("#ticker-track");
  if (!track) {
    return;
  }

  const firstGroup = createTickerGroup(articles, true);
  const repeatedGroup = createTickerGroup(articles, false);
  repeatedGroup.setAttribute("aria-hidden", "true");
  track.replaceChildren(firstGroup, repeatedGroup);
}

function extractExcerpt(markup) {
  const parsed = new DOMParser().parseFromString(markup, "text/html");
  const paragraph = parsed.querySelector("p");
  return paragraph ? paragraph.textContent.trim().replace(/\s+/g, " ") : "";
}

function makeMessage(text, className) {
  const message = document.createElement("p");
  message.className = className;
  message.textContent = text;
  return message;
}

function renderArticleCard(article, excerpt) {
  const card = document.createElement("article");
  card.className = "article-card";

  const content = document.createElement("div");
  content.className = "article-card-content";

  const heading = document.createElement("h2");
  const link = document.createElement("a");
  link.href = `article.html?post=${encodeURIComponent(article.slug)}`;
  link.textContent = article.title;
  heading.append(link);

  const date = document.createElement("p");
  date.className = "article-date";
  date.textContent = formatDate(article.date);

  const summary = document.createElement("p");
  summary.className = "article-excerpt";
  summary.textContent = excerpt || "Otwórz wpis, aby przeczytać całość.";

  const readMore = document.createElement("a");
  readMore.className = "read-more";
  readMore.href = link.href;
  readMore.textContent = "Czytaj wpis →";

  content.append(heading, date, summary, readMore);
  if (article.image) {
    const thumbnailLink = document.createElement("a");
    thumbnailLink.className = "article-thumbnail";
    thumbnailLink.href = link.href;
    thumbnailLink.setAttribute("aria-label", `Otwórz artykuł: ${article.title}`);

    const thumbnail = document.createElement("img");
    thumbnail.src = article.image;
    thumbnail.alt = article.imageAlt || "";
    thumbnail.loading = "lazy";
    thumbnailLink.append(thumbnail);
    card.append(thumbnailLink);
  }
  card.append(content);
  return card;
}

async function renderArticleList(articles) {
  const list = document.querySelector("#article-list");
  if (!list) {
    return;
  }

  const cards = await Promise.all(articles.map(async (article) => {
    const markup = await fetchText(article.file);
    return renderArticleCard(article, extractExcerpt(markup));
  }));
  list.replaceChildren(...(cards.length ? cards : [makeMessage("Nie ma jeszcze żadnych wpisów.", "loading-message")]));
}

async function renderArticlePage(articles) {
  const content = document.querySelector("#article-content");
  const title = document.querySelector("#article-title");
  const date = document.querySelector("#article-date");
  const post = new URLSearchParams(window.location.search).get("post");
  const article = articles.find((item) => item.slug === post);

  if (!article) {
    title.textContent = "Nie znaleziono wpisu";
    document.title = "Nie znaleziono wpisu — Pischinger";
    content.replaceChildren(makeMessage("Nie znaleziono tego wpisu. Sprawdź adres albo wróć do listy artykułów.", "error-message"));
    return;
  }

  title.textContent = article.title;
  date.textContent = formatDate(article.date);
  date.dateTime = article.date;
  document.title = `${article.title} — Pischinger`;

  const markup = await fetchText(article.file);
  const parsed = new DOMParser().parseFromString(markup, "text/html");
  content.innerHTML = parsed.body.innerHTML;
}

async function startBlog() {
  const articleList = document.querySelector("#article-list");
  const articleContent = document.querySelector("#article-content");

  try {
    const articles = await loadManifest();
    renderTicker(articles);
    if (articleContent) {
      await renderArticlePage(articles);
    } else if (articleList) {
      await renderArticleList(articles);
    }
  } catch (error) {
    console.error("Nie udało się załadować bloga:", error);
    const target = articleContent || articleList;
    if (target) {
      target.replaceChildren(makeMessage("Nie udało się wczytać wpisów. Spróbuj odświeżyć stronę za chwilę.", "error-message"));
    }
  }
}

startBlog();