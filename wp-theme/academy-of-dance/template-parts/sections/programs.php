<?php
/**
 * Template part for displaying the programs section
 * 
 * @package AcademyOfDance
 */

// Query programs
$programs = new WP_Query(array(
    'post_type' => 'programs',
    'posts_per_page' => -1,
    'post_status' => 'publish'
));
?>

<section id="programmes" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                <?php _e('Our Programmes', 'academy-of-dance'); ?>
            </h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                <?php _e('From beginner to advanced levels, we offer comprehensive dance programmes designed to nurture your passion and develop your skills.', 'academy-of-dance'); ?>
            </p>
        </div>

        <?php if ($programs->have_posts()) : ?>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <?php while ($programs->have_posts()) : $programs->the_post(); 
                    $age_group = get_post_meta(get_the_ID(), '_program_age_group', true);
                    $duration = get_post_meta(get_the_ID(), '_program_duration', true);
                    $price = get_post_meta(get_the_ID(), '_program_price', true);
                ?>
                    <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                                <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-cover')); ?>
                            </div>
                        <?php else : ?>
                            <div class="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <svg class="w-16 h-16 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                </svg>
                            </div>
                        <?php endif; ?>
                        
                        <div class="p-6">
                            <h3 class="font-playfair text-2xl font-bold text-primary mb-3">
                                <?php the_title(); ?>
                            </h3>
                            
                            <div class="space-y-2 mb-4 text-sm text-gray-600">
                                <?php if ($age_group) : ?>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        <span><?php printf(__('Age: %s', 'academy-of-dance'), esc_html($age_group)); ?></span>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if ($duration) : ?>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span><?php printf(__('%s minutes', 'academy-of-dance'), esc_html($duration)); ?></span>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if ($price) : ?>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                        </svg>
                                        <span><?php echo esc_html($price); ?></span>
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <div class="text-gray-700 mb-6">
                                <?php the_excerpt(); ?>
                            </div>
                            
                            <a href="#trials" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                <?php _e('Book Trial Class', 'academy-of-dance'); ?>
                            </a>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <!-- Fallback content when no programs are found -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="font-playfair text-2xl font-bold text-primary mb-3">
                        <?php _e('Ballet', 'academy-of-dance'); ?>
                    </h3>
                    <p class="text-gray-700 mb-4">
                        <?php _e('Classical ballet training focusing on technique, grace, and artistic expression.', 'academy-of-dance'); ?>
                    </p>
                    <a href="#trials" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <?php _e('Book Trial Class', 'academy-of-dance'); ?>
                    </a>
                </div>
                
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="font-playfair text-2xl font-bold text-primary mb-3">
                        <?php _e('Contemporary', 'academy-of-dance'); ?>
                    </h3>
                    <p class="text-gray-700 mb-4">
                        <?php _e('Modern dance combining elements of ballet, jazz, and lyrical movement.', 'academy-of-dance'); ?>
                    </p>
                    <a href="#trials" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <?php _e('Book Trial Class', 'academy-of-dance'); ?>
                    </a>
                </div>
                
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="font-playfair text-2xl font-bold text-primary mb-3">
                        <?php _e('Jazz', 'academy-of-dance'); ?>
                    </h3>
                    <p class="text-gray-700 mb-4">
                        <?php _e('Energetic and dynamic dance style with emphasis on rhythm and performance.', 'academy-of-dance'); ?>
                    </p>
                    <a href="#trials" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <?php _e('Book Trial Class', 'academy-of-dance'); ?>
                    </a>
                </div>
            </div>
        <?php endif; ?>
        
        <?php wp_reset_postdata(); ?>
    </div>
</section>
