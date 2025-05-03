<aside class="side-nav" id="sideNav">
    <a href="<?php echo home_url(); ?>"><p>🏘️</p> Strona Główna</a>
    <a href="<?php echo home_url('/news'); ?>"><p>💬</p> Informacje</a>
    <a href="<?php echo home_url('/about'); ?>"><p>🙋‍♂️</p> O Nas</a>
    <a href="<?php echo home_url('/location.html'); ?>"><p>🚗</p> Miejsce</a>
    <a href="<?php echo home_url('/schedule.html'); ?>"><p>📅</p> Kalendarz</a>
    <a href="<?php echo home_url('/contact.html'); ?>"><p>☎️</p> Kontakt</a>
</aside>

<button class="menu-button" onclick="toggleNav()">☰</button>

<script>
    function toggleNav() {
        let sideNav = document.getElementById("sideNav");
        let overlay = document.getElementById("overlay");

        if (sideNav.classList.contains("open")) {
            sideNav.classList.remove("open");
            overlay.classList.remove("active");
        } else {
            sideNav.classList.add("open");
            overlay.classList.add("active");
        }
    }
</script>