<?php
/**
 * The header for our theme
 * 
 * @package AcademyOfDance
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#main"><?php _e('Skip to content', 'academy-of-dance'); ?></a>

    <nav class="fixed top-0 w-full bg-black backdrop-blur-md z-50">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center">
                            <h1 class="text-white text-xl font-bold"><?php bloginfo('name'); ?></h1>
                        </a>
                    <?php endif; ?>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:flex space-x-8">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'flex space-x-8',
                        'container' => false,
                        'fallback_cb' => function() {
                            ?>
                            <a href="#hero" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Home', 'academy-of-dance'); ?></a>
                            <a href="#trials" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Trials', 'academy-of-dance'); ?></a>
                            <a href="#about" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('About Us', 'academy-of-dance'); ?></a>
                            <a href="#programmes" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Programmes', 'academy-of-dance'); ?></a>
                            <a href="#reviews" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Reviews', 'academy-of-dance'); ?></a>
                            <a href="#teachers" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Teachers', 'academy-of-dance'); ?></a>
                            <a href="#gallery" class="text-white hover:text-secondary transition-colors nav-link"><?php _e('Gallery', 'academy-of-dance'); ?></a>
                            <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="text-white hover:text-secondary transition-colors"><?php _e('Blog', 'academy-of-dance'); ?></a>
                            <?php
                        }
                    ));
                    ?>
                </div>
                
                <!-- Desktop Book Now Button -->
                <a href="#trials" class="hidden md:block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded transition-colors nav-link">
                    <?php _e('Book Now!', 'academy-of-dance'); ?>
                </a>
                
                <!-- Mobile Menu Button -->
                <button 
                    id="mobile-menu-toggle"
                    class="md:hidden text-white p-2"
                    aria-label="<?php _e('Toggle mobile menu', 'academy-of-dance'); ?>"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="md:hidden mt-4 pb-4 hidden">
                <div class="flex flex-col space-y-4">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'flex flex-col space-y-4',
                        'container' => false,
                        'fallback_cb' => function() {
                            ?>
                            <a href="#hero" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Home', 'academy-of-dance'); ?></a>
                            <a href="#trials" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Trials', 'academy-of-dance'); ?></a>
                            <a href="#about" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('About Us', 'academy-of-dance'); ?></a>
                            <a href="#programmes" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Programmes', 'academy-of-dance'); ?></a>
                            <a href="#reviews" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Reviews', 'academy-of-dance'); ?></a>
                            <a href="#teachers" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Teachers', 'academy-of-dance'); ?></a>
                            <a href="#gallery" class="text-white hover:text-secondary transition-colors text-left nav-link"><?php _e('Gallery', 'academy-of-dance'); ?></a>
                            <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="text-white hover:text-secondary transition-colors text-left"><?php _e('Blog', 'academy-of-dance'); ?></a>
                            <?php
                        }
                    ));
                    ?>
                </div>
            </div>
        </div>
    </nav>
