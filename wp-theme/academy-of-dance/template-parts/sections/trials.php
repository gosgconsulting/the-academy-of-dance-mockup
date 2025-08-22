<?php
/**
 * Template part for displaying the trials section
 * 
 * @package AcademyOfDance
 */
?>

<section id="trials" class="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                <?php _e('Book Your Trial Class', 'academy-of-dance'); ?>
            </h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto">
                <?php _e('Experience the joy of dance with our trial classes. Perfect for beginners and experienced dancers alike.', 'academy-of-dance'); ?>
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="font-playfair text-3xl font-bold text-primary mb-6">
                            <?php _e('Why Choose Our Trial Classes?', 'academy-of-dance'); ?>
                        </h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-4">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-1">
                                        <?php _e('Professional Instruction', 'academy-of-dance'); ?>
                                    </h4>
                                    <p class="text-gray-600 text-sm">
                                        <?php _e('Learn from certified and experienced dance instructors', 'academy-of-dance'); ?>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-4">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-1">
                                        <?php _e('Small Class Sizes', 'academy-of-dance'); ?>
                                    </h4>
                                    <p class="text-gray-600 text-sm">
                                        <?php _e('Personalized attention in our intimate class settings', 'academy-of-dance'); ?>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-4">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-1">
                                        <?php _e('All Skill Levels Welcome', 'academy-of-dance'); ?>
                                    </h4>
                                    <p class="text-gray-600 text-sm">
                                        <?php _e('From complete beginners to advanced dancers', 'academy-of-dance'); ?>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-4">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-1">
                                        <?php _e('State-of-the-Art Studios', 'academy-of-dance'); ?>
                                    </h4>
                                    <p class="text-gray-600 text-sm">
                                        <?php _e('Modern facilities with professional dance floors and equipment', 'academy-of-dance'); ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 rounded-2xl p-8">
                        <h4 class="font-playfair text-2xl font-bold text-primary mb-6 text-center">
                            <?php _e('Ready to Start Dancing?', 'academy-of-dance'); ?>
                        </h4>
                        
                        <div class="text-center space-y-6">
                            <div class="text-4xl font-bold text-primary">
                                <?php _e('$25', 'academy-of-dance'); ?>
                            </div>
                            <p class="text-gray-600">
                                <?php _e('Single trial class (60 minutes)', 'academy-of-dance'); ?>
                            </p>
                            
                            <?php if (get_theme_mod('whatsapp_number')) : ?>
                                <a href="https://wa.me/<?php echo esc_attr(str_replace(['+', ' ', '-'], '', get_theme_mod('whatsapp_number'))); ?>?text=<?php echo urlencode(__('Hi! I would like to book a trial class at The Academy of Dance.', 'academy-of-dance')); ?>" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   class="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors w-full">
                                    <?php _e('Book Now via WhatsApp', 'academy-of-dance'); ?>
                                </a>
                            <?php else : ?>
                                <a href="tel:+6591234567" class="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors w-full">
                                    <?php _e('Call to Book Now', 'academy-of-dance'); ?>
                                </a>
                            <?php endif; ?>
                            
                            <p class="text-xs text-gray-500">
                                <?php _e('No commitment required. Pay after your trial class.', 'academy-of-dance'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
