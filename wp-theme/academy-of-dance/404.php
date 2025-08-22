<?php
/**
 * The template for displaying 404 pages (not found)
 * 
 * @package AcademyOfDance
 */

get_header(); ?>

<main id="main" class="min-h-screen bg-white pt-20">
    <div class="container mx-auto px-6 py-20 text-center">
        <h1 class="font-playfair text-6xl md:text-8xl font-bold text-primary mb-8">404</h1>
        <h2 class="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            <?php _e('Page Not Found', 'academy-of-dance'); ?>
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            <?php _e('Sorry, the page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.', 'academy-of-dance'); ?>
        </p>
        
        <div class="space-y-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" 
               class="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                <?php _e('Go to Homepage', 'academy-of-dance'); ?>
            </a>
            
            <div class="max-w-md mx-auto">
                <?php get_search_form(); ?>
            </div>
        </div>
        
        <div class="mt-12">
            <h3 class="font-playfair text-2xl font-bold text-gray-800 mb-6">
                <?php _e('Popular Pages', 'academy-of-dance'); ?>
            </h3>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="#about" class="text-primary hover:text-secondary transition-colors"><?php _e('About Us', 'academy-of-dance'); ?></a>
                <a href="#programmes" class="text-primary hover:text-secondary transition-colors"><?php _e('Programmes', 'academy-of-dance'); ?></a>
                <a href="#teachers" class="text-primary hover:text-secondary transition-colors"><?php _e('Teachers', 'academy-of-dance'); ?></a>
                <a href="#gallery" class="text-primary hover:text-secondary transition-colors"><?php _e('Gallery', 'academy-of-dance'); ?></a>
                <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="text-primary hover:text-secondary transition-colors"><?php _e('Blog', 'academy-of-dance'); ?></a>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
