<?php
/**
 * The template for displaying all pages
 * 
 * @package AcademyOfDance
 */

get_header(); ?>

<main id="main" class="min-h-screen bg-white pt-20">
    <div class="container mx-auto px-6 py-12">
        <?php while (have_posts()) : the_post(); ?>
            <article id="page-<?php the_ID(); ?>" <?php post_class('max-w-4xl mx-auto'); ?>>
                <header class="entry-header mb-8 text-center">
                    <h1 class="entry-title font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
                        <?php the_title(); ?>
                    </h1>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="entry-thumbnail mb-8">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-auto rounded-lg')); ?>
                        </div>
                    <?php endif; ?>
                </header>

                <div class="entry-content prose prose-lg max-w-none">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
