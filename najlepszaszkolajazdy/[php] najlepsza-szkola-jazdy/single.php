<?php get_header(); ?>
<section id="single" class="section-box">
    <article class="post">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <h1 style="font-size: 2.5em"><?php the_title(); ?></h1>
            <div class="post-content">
                <?php the_content(); ?>
            </div>
        <?php endwhile; endif; ?>
    </article>
</section>
<?php get_footer(); ?>