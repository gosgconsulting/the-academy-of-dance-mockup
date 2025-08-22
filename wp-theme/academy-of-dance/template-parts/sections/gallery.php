<?php
/**
 * Template part for displaying the gallery section
 * 
 * @package AcademyOfDance
 */

// Query gallery items
$gallery_items = new WP_Query(array(
    'post_type' => 'gallery',
    'posts_per_page' => 12,
    'post_status' => 'publish'
));
?>

<section id="gallery" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                <?php _e('Gallery', 'academy-of-dance'); ?>
            </h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                <?php _e('Discover the magic of dance through our students\' performances, competitions, and daily classes.', 'academy-of-dance'); ?>
            </p>
        </div>

        <?php if ($gallery_items->have_posts()) : ?>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                <?php while ($gallery_items->have_posts()) : $gallery_items->the_post(); ?>
                    <div class="group relative aspect-square overflow-hidden rounded-xl bg-gray-200">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110')); ?>
                        <?php else : ?>
                            <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <svg class="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        <?php endif; ?>
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-4 left-4 right-4">
                                <h3 class="text-white font-semibold text-sm mb-1">
                                    <?php the_title(); ?>
                                </h3>
                                <?php if (has_excerpt()) : ?>
                                    <p class="text-white/80 text-xs">
                                        <?php the_excerpt(); ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <!-- Fallback content -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                <?php for ($i = 1; $i <= 8; $i++) : ?>
                    <div class="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                        <svg class="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
        
        <?php wp_reset_postdata(); ?>
        
        <div class="text-center mt-12">
            <a href="<?php echo esc_url(get_post_type_archive_link('gallery')); ?>" 
               class="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                <?php _e('View Full Gallery', 'academy-of-dance'); ?>
            </a>
        </div>
    </div>
</section>
