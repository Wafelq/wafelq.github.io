<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baza wiedzy = RyBcia</title>
    <link href="/matura/assets/css/style_streszczenia.css" rel="stylesheet"/>
    <link rel="icon" href="/matura/assets/img/Trollface.png" type="image/x-icon" href="Trollface.png">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="sidebar" id="sidebar">
        <a href="streszczenia.php" target="_blank">📚 Streszczenia lektur</a>
        <a href="#" target="_blank">🧮 Matematyka</a>
        <a href="#" target="_blank">🌍 Język angielski</a>
        <a href="#" target="_blank">📖 Inne materiały</a>
        <a href="index.php">🏠 Strona Główna</a>
    </div>

    <button class="menu-button" onclick="toggleMenu()">☰</button>
    
    <!-- <div class="content">
        <h3>Baza Wiedzy do Matury</h3>
        <p>Witaj! Wybierz interesujący Cię dział z menu po prawej stronie.</p>

        <div class="textbox" style="width: 25%;">
            <br>
			<h1>Lektura</h1>
            <div class="text-seperator"></div>
            <br><br>
			<iframe src="https://www.youtube.com/embed?listType=playlist&list=UU2LIlu3ifDrEJz4X9tBG5cw" scrolling="no" style="text-align: center; height: 240px;"></iframe>
			<br>
		</div>
    </div> -->

    <div class="nav-content">

        <br><br>

        <div class="textbox">
            <img style="width: 25%;" src="/matura/assets/img/linux_gaming.gif">
            <marquee>📦 strona under construction 🦺 </marquee>
        </div>

        <br><br>

        <div class="textbox">
            <!-- <img src="/assets/images/gamedev_splash.png" style="width: 100%"> -->
            <br>
            <h1 style="margin-top: -5px;">Info</h1>
            <div class="text-seperator"></div>
            <br><br>
                Dzień dobry! long story short, jest to strona którą zrobiłem by pomóc swojej dziewczynie zdać maturkę. Są tu materiały z Polskiego, Maths & English.
            <br><br>
                Jeśli coś nie działa/chcecie żebym dodał = piszcie do mnie na <a href="https://discord.gg/BbvJhXj">Discordzie</a>, albo na <a href="https://www.instagram.com/wafelq_">Instagramie</a>
            <br><br>
                Nawigowanie jest raczej intuicyjnie, w prawnym dolnym rogu masz przycisk który aktywuje nawigacje do działów po lewej stronie. Miłego używania!
            <br>

            <div class="textbox">
                <h1>Dostępne streszczenia lektur:</h1>
                <div class="text-seperator"></div>
                <ul>
                    <?php
                    $folder = "lektury/";
                    $files = glob($folder . "*.html");
            
                    if ($files) {
                        foreach ($files as $file) {
                            $filename = basename($file);
                            $title = pathinfo($filename, PATHINFO_FILENAME);
                            echo "<li><a href=\"$file\">📘 " . htmlspecialchars(ucwords(str_replace('_', ' ', $title))) . "</a></li>";
                        }
                    } else {
                        echo "<li>Brak dostępnych streszczeń.</li>";
                    }
                    ?>
                </ul>
            </div>

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
