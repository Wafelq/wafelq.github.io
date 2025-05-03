<?php
function nsj_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main-menu' => __('Główne menu', 'najlepsza-szkola-jazdy')
    ));
}
add_action('after_setup_theme', 'nsj_theme_setup');

function nsj_enqueue_styles() {
    wp_enqueue_style('nsj-style', get_stylesheet_uri());
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&display=swap');
}
add_action('wp_enqueue_scripts', 'nsj_enqueue_styles');
?>