<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Streszczenia lektur - RyBcia</title>
    <link href="/matura/assets/css/style_streszczenia.css" rel="stylesheet"/>
    <link rel="icon" href="/matura/assets/img/Trollface.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="sidebar" id="sidebar">
        <a href="#">📚 Streszczenia lektur</a>
        <a href="#">🧮 Matematyka</a>
        <a href="#">🌍 Język angielski</a>
        <a href="#">📖 Inne materiały</a>
        <a href="index.html">🏠 Strona Główna</a>
    </div>

    <button class="menu-button" onclick="toggleMenu()">☰</button>

    <div class="nav-content">
        <br><br>
        <div class="textbox">
            <h1>📚 Streszczenia lektur</h1>
            <div class="text-seperator"></div>
            <br>
            <ul>
                <?php
                $folder = __DIR__ . "/lektury/";
                $webPath = "lektury/";

                $files = glob($folder . "*.html");

                if ($files) {
                    foreach ($files as $file) {
                        $filename = basename($file);
                        $title = pathinfo($filename, PATHINFO_FILENAME);
                        $displayTitle = ucwords(str_replace('_', ' ', $title));
                        echo "<li><a href=\"{$webPath}{$filename}\">📘 " . htmlspecialchars($displayTitle) . "</a></li>";
                    }
                } else {
                    echo "<li>Brak dostępnych streszczeń.</li>";
                }
                ?>
            </ul>
        </div>
    </div>

    <script>
        function toggleMenu() {
            const sidebar = document.getElementById("sidebar");
            if (sidebar.style.left === "0px") {
                sidebar.style.left = "-250px";
            } else {
                sidebar.style.left = "0px";
            }
        }
    </script>
</body>
</html>
