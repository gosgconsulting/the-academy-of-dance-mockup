<?php
/**
 * The template for displaying the footer
 * 
 * @package AcademyOfDance
 */
?>

    <footer class="bg-black text-white py-12">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-1 gap-8 mb-8">
                <div class="text-center">
                    <div class="flex justify-center mb-4">
                        <?php if (has_custom_logo()) : ?>
                            <?php the_custom_logo(); ?>
                        <?php else : ?>
                            <h3 class="text-white text-2xl font-bold"><?php bloginfo('name'); ?></h3>
                        <?php endif; ?>
                    </div>
                    <p class="text-gray-300 mb-6"><?php echo esc_html(get_bloginfo('description')); ?></p>
                    
                    <div class="flex justify-center space-x-4">
                        <?php if (get_theme_mod('facebook_url')) : ?>
                            <a href="<?php echo esc_url(get_theme_mod('facebook_url')); ?>" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        <?php endif; ?>
                        
                        <?php if (get_theme_mod('instagram_url')) : ?>
                            <a href="<?php echo esc_url(get_theme_mod('instagram_url')); ?>" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 rounded-full transition-colors">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.794 3.752 13.643 3.752 12.346s.49-2.448 1.369-3.328c.88-.88 2.031-1.369 3.328-1.369s2.448.49 3.328 1.369c.88.88 1.369 2.031 1.369 3.328s-.49 2.448-1.369 3.328c-.88.88-2.031 1.297-3.328 1.297zm7.598 0c-1.297 0-2.448-.49-3.328-1.297-.88-.88-1.369-2.031-1.369-3.328s.49-2.448 1.369-3.328c.88-.88 2.031-1.369 3.328-1.369s2.448.49 3.328 1.369c.88.88 1.369 2.031 1.369 3.328s-.49 2.448-1.369 3.328c-.88.88-2.031 1.297-3.328 1.297z"/>
                                </svg>
                            </a>
                        <?php endif; ?>
                        
                        <?php if (get_theme_mod('youtube_url')) : ?>
                            <a href="<?php echo esc_url(get_theme_mod('youtube_url')); ?>" target="_blank" rel="noopener noreferrer" class="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        <?php endif; ?>
                        
                        <?php if (get_theme_mod('tiktok_url')) : ?>
                            <a href="<?php echo esc_url(get_theme_mod('tiktok_url')); ?>" target="_blank" rel="noopener noreferrer" class="bg-black hover:bg-gray-800 p-2 rounded-full transition-colors border border-white">
                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="text-center border-t border-gray-700 pt-8">
                <div class="flex justify-center space-x-8 text-sm mb-4">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class' => 'flex justify-center space-x-8 text-sm',
                        'container' => false,
                        'fallback_cb' => function() {
                            if (get_page_by_path('terms-conditions')) {
                                echo '<a href="' . esc_url(get_permalink(get_page_by_path('terms-conditions'))) . '" class="hover:text-secondary transition-colors">' . __('Terms & Conditions', 'academy-of-dance') . '</a>';
                            }
                            if (get_page_by_path('privacy-policy')) {
                                echo '<a href="' . esc_url(get_permalink(get_page_by_path('privacy-policy'))) . '" class="hover:text-secondary transition-colors">' . __('Privacy Policy', 'academy-of-dance') . '</a>';
                            }
                        }
                    ));
                    ?>
                </div>
                <div class="text-gray-400 text-sm">
                    <?php printf(__('© %s %s. All rights reserved.', 'academy-of-dance'), date('Y'), get_bloginfo('name')); ?>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Button -->
    <?php if (get_theme_mod('whatsapp_number')) : ?>
        <div id="whatsapp-button" class="fixed bottom-6 right-6 z-40">
            <a href="https://wa.me/<?php echo esc_attr(str_replace(['+', ' ', '-'], '', get_theme_mod('whatsapp_number'))); ?>" 
               target="_blank" 
               rel="noopener noreferrer"
               class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
            </a>
        </div>
    <?php endif; ?>

</div><!-- #page -->

<?php wp_footer(); ?>

<script>
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});
</script>

</body>
</html>
