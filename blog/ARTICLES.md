# Dodawanie artykułów

Każdy wpis to zwykły fragment HTML w folderze `articles/`. Nie dodawaj do niego `<html>`, `<head>` ani `<body>` — wspólna strona artykułu automatycznie zapewnia nagłówek, nawigację, datę, style i stopkę.

## Nowy wpis

1. Utwórz plik, np. `articles/moj-wpis.html`, i wpisz w nim zwykły HTML:

   ```html
   <p>Krótki wstęp, który pojawi się też na stronie głównej.</p>
   <h2>Śródtytuł</h2>
   <p>Dalsza treść wpisu. Możesz używać list, linków, cytatów i obrazków.</p>
   ```

2. Dodaj wpis na początku tablicy w `articles.json`:

   ```json
   {
     "slug": "moj-wpis",
     "title": "Tytuł wpisu",
     "date": "2026-10-26",
     "file": "articles/moj-wpis.html",
     "image": "img/moj-obrazek.jpg",
     "imageAlt": "Krótki opis obrazka"
   }
   ```

   `slug` jest unikalnym adresem wpisu, a `date` używa formatu `RRRR-MM-DD`. Zachowaj przecinek między wpisami JSON.

   `image` i `imageAlt` są opcjonalne. Gdy podasz obrazek, pojawi się jako miniatura po lewej stronie zapowiedzi na stronie głównej. Bez pola `image` wpis pokaże się jako karta tekstowa.

3. Otwórz `article.html?post=moj-wpis`, aby zobaczyć wpis. Pojawi się on również na stronie głównej i w pasku nowości.

Obrazki w treści umieszczaj w folderze `img/` i odwołuj się do nich względem folderu `blog`, np. `<img src="img/moj-obrazek.jpg" alt="Opis obrazka">`. Aby tekst opływał obraz z lewej strony, dodaj mu klasę `post-image`.

Strona pobiera wpisy przez `fetch`, dlatego testuj ją przez lokalny serwer WWW (lub po opublikowaniu), a nie przez bezpośrednie otwarcie `index.html` jako `file://`.