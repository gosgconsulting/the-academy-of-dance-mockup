<?php
/**
 * Template part for displaying the hero section
 * 
 * @package AcademyOfDance
 */

// Get customizer values
$hero_title = get_theme_mod('hero_title', 'Where dreams take flight through the art of dance');
$hero_subtitle = get_theme_mod('hero_subtitle', 'Discover your passion for dance at Singapore\'s premier dance academy');
?>

<section id="hero" class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 overflow-hidden">
    <!-- Background Video or Image -->
    <div class="absolute inset-0 z-0">
        <?php 
        $hero_bg = get_theme_mod('hero_background_video');
        if ($hero_bg) : ?>
            <video autoplay muted loop class="w-full h-full object-cover">
                <source src="<?php echo esc_url($hero_bg); ?>" type="video/mp4">
            </video>
        <?php else : ?>
            <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30"></div>
        <?php endif; ?>
        <div class="absolute inset-0 bg-black/40"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <h1 class="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-up">
            <?php echo esc_html($hero_title); ?>
        </h1>
        <p class="text-xl md:text-2xl mb-12 leading-relaxed animate-fade-up opacity-90">
            <?php echo esc_html($hero_subtitle); ?>
        </p>
        
        <div class="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center animate-fade-up">
            <a href="#trials" class="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <?php _e('Book Your Trial Class', 'academy-of-dance'); ?>
            </a>
            <a href="#about" class="inline-block border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                <?php _e('Learn More About Us', 'academy-of-dance'); ?>
            </a>
        </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    </div>
</section>
