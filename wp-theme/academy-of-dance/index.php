<?php
/**
 * The main template file
 * 
 * @package AcademyOfDance
 */

get_header(); ?>

<main id="main" class="min-h-screen bg-white">
    <?php if (is_front_page()) : ?>
        <!-- Hero Section -->
        <?php get_template_part('template-parts/sections/hero'); ?>
        
        <!-- Trials Section -->
        <?php get_template_part('template-parts/sections/trials'); ?>
        
        <!-- About Us Section -->
        <?php get_template_part('template-parts/sections/about'); ?>
        
        <!-- Vision Mission Section -->
        <?php get_template_part('template-parts/sections/vision-mission'); ?>
        
        <!-- Programs Section -->
        <?php get_template_part('template-parts/sections/programs'); ?>
        
        <!-- Competition Excellence Section -->
        <?php get_template_part('template-parts/sections/competition-excellence'); ?>
        
        <!-- Events Section -->
        <?php get_template_part('template-parts/sections/events'); ?>
        
        <!-- Achievements Section -->
        <?php get_template_part('template-parts/sections/achievements'); ?>
        
        <!-- Teachers Section -->
        <?php get_template_part('template-parts/sections/teachers'); ?>
        
        <!-- Reviews Section -->
        <?php get_template_part('template-parts/sections/reviews'); ?>
        
        <!-- Locations Section -->
        <?php get_template_part('template-parts/sections/locations'); ?>
        
        <!-- Gallery Section -->
        <?php get_template_part('template-parts/sections/gallery'); ?>
        
    <?php else : ?>
        <div class="container mx-auto px-6 py-20">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('mb-8'); ?>>
                        <header class="entry-header mb-6">
                            <h1 class="entry-title font-playfair text-4xl font-bold text-primary"><?php the_title(); ?></h1>
                            <div class="entry-meta text-gray-600 text-sm">
                                <?php
                                printf(
                                    __('Posted on %s by %s', 'academy-of-dance'),
                                    '<time class="entry-date" datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>',
                                    '<span class="author">' . esc_html(get_the_author()) . '</span>'
                                );
                                ?>
                            </div>
                        </header>
                        
                        <div class="entry-content prose max-w-none">
                            <?php the_content(); ?>
                        </div>
                    </article>
                <?php endwhile; ?>
                
                <?php
                the_posts_navigation(array(
                    'prev_text' => __('&larr; Older posts', 'academy-of-dance'),
                    'next_text' => __('Newer posts &rarr;', 'academy-of-dance'),
                ));
                ?>
            <?php else : ?>
                <p><?php _e('Sorry, no posts were found.', 'academy-of-dance'); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
