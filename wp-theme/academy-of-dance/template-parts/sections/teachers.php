<?php
/**
 * Template part for displaying the teachers section
 * 
 * @package AcademyOfDance
 */

// Query teachers
$teachers = new WP_Query(array(
    'post_type' => 'teachers',
    'posts_per_page' => 8,
    'post_status' => 'publish'
));
?>

<section id="teachers" class="py-20 bg-white">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                <?php _e('Meet Our Teachers', 'academy-of-dance'); ?>
            </h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                <?php _e('Our passionate and experienced instructors are dedicated to helping you achieve your dance goals.', 'academy-of-dance'); ?>
            </p>
        </div>

        <?php if ($teachers->have_posts()) : ?>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <?php while ($teachers->have_posts()) : $teachers->the_post(); 
                    $specialty = get_post_meta(get_the_ID(), '_teacher_specialty', true);
                    $experience = get_post_meta(get_the_ID(), '_teacher_experience', true);
                ?>
                    <div class="text-center group">
                        <div class="relative mb-6 overflow-hidden rounded-2xl">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('medium', array('class' => 'w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110')); ?>
                            <?php else : ?>
                                <div class="w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <svg class="w-20 h-20 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                            <?php endif; ?>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <h3 class="font-playfair text-xl font-bold text-primary mb-2">
                            <?php the_title(); ?>
                        </h3>
                        
                        <?php if ($specialty) : ?>
                            <p class="text-secondary font-semibold mb-2">
                                <?php echo esc_html($specialty); ?>
                            </p>
                        <?php endif; ?>
                        
                        <?php if ($experience) : ?>
                            <p class="text-gray-600 text-sm mb-4">
                                <?php printf(__('%s years of experience', 'academy-of-dance'), esc_html($experience)); ?>
                            </p>
                        <?php endif; ?>
                        
                        <?php if (has_excerpt()) : ?>
                            <p class="text-gray-700 text-sm">
                                <?php the_excerpt(); ?>
                            </p>
                        <?php endif; ?>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <!-- Fallback content -->
            <div class="text-center">
                <p class="text-gray-600">
                    <?php _e('Our amazing team of instructors will be featured here soon.', 'academy-of-dance'); ?>
                </p>
            </div>
        <?php endif; ?>
        
        <?php wp_reset_postdata(); ?>
    </div>
</section>
