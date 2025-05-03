<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="overlay" id="overlay" onclick="toggleNav()"></div>
    <?php get_sidebar(); // Pobiera sidebar.php ?>

    <div class="header-top-bar">
        <div class="contact-info">
            <span><i class="fas fa-map-marker-alt"></i><a href="https://maps.app.goo.gl/qH3q6a37zARHdDhr8">Ruda Śląska, ul. Mickiewicza 15</a></span>
            <span><i class="fas fa-phone"></i><a href="tel:+48509637361">+48 509 637 361</a></span>
        </div>
        <div class="social-media">
            <span><i class="fab fa-facebook-f"></i><a href="https://www.facebook.com/people/najlepszaszkolajazdypl/100059604371483/">Facebook </a></span>
            <span><i class="fab fa-instagram"></i><a href="https://www.instagram.com/najlepszaszkolajazdy/">Instagram </a></span>
        </div>
    </div>

    <header class="main-header">
        <div class="logo"><img src="/assets/img/logo.png" alt="Najlepsza Szkoła Jazdy"><a href="<?php echo home_url(); ?>"></a></div>
        <nav class="main-nav">
            <ul>
                <li><a href="<?php echo home_url(); ?>">Strona Główna</a></li>
                <li><a href="<?php echo home_url('/news'); ?>">Informacje</a></li>
                <li><a href="<?php echo home_url('/about'); ?>">O Nas</a></li>
                <li><a href="<?php echo home_url('/location.html'); ?>">Miejsce</a></li>
                <li><a href="<?php echo home_url('/schedule.html'); ?>">Kalendarz</a></li>
                <li><a href="<?php echo home_url('/contact.html'); ?>">Kontakt</a></li>
            </ul>
        </nav>
    </header>