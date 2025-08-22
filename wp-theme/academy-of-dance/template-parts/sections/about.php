<?php
/**
 * Template part for displaying the about section
 * 
 * @package AcademyOfDance
 */
?>

<section id="about" class="py-20 bg-white">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                <?php _e('About Us', 'academy-of-dance'); ?>
            </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div class="space-y-6">
                <h3 class="font-playfair text-3xl font-bold text-primary mb-4">
                    <?php _e('Our Story', 'academy-of-dance'); ?>
                </h3>
                <p class="text-gray-700 leading-relaxed">
                    <?php _e('At The Academy of Dance (TAD), we merge passion with precision. Our tagline, "Our insatiable passion for dance," truly encapsulates the spirit of TAD. Dance is not just an art form for us; it is our passion. At TAD, we believe that dance transcends mere movements and steps. It is a profound expression of the soul and a vital journey of self-discovery and improvement. Established in 2019, TAD has since emerged as one of the most renowned dance schools in Singapore.', 'academy-of-dance'); ?>
                </p>
                <p class="text-gray-700 leading-relaxed">
                    <?php _e('What distinguishes us is our devoted team of teachers who not only have extensive experience in their respective genres but also possess a profound passion for sharing the love of dance and providing a comprehensive education for dancers.', 'academy-of-dance'); ?>
                </p>
                <p class="text-gray-700 leading-relaxed">
                    <?php _e('At TAD, our teachers foster an encouraging environment for everyone, from beginners taking their first steps to seasoned dancers gracing the stage. We prioritize our students\' progress to ensure every dancer achieves their fullest potential. Whether your aim is to pursue a professional dance career, maintain fitness, or simply enjoy moving to the rhythm, we are here to support you in reaching your goals.', 'academy-of-dance'); ?>
                </p>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
                    <svg class="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <h4 class="font-playfair text-xl font-bold text-primary mb-2">
                        <?php _e('Expert Faculty', 'academy-of-dance'); ?>
                    </h4>
                    <p class="text-gray-600 text-sm">
                        <?php _e('Internationally trained instructors with decades of experience', 'academy-of-dance'); ?>
                    </p>
                </div>
                
                <div class="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 text-center">
                    <svg class="w-12 h-12 text-secondary mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <h4 class="font-playfair text-xl font-bold text-primary mb-2">
                        <?php _e('Passion Driven', 'academy-of-dance'); ?>
                    </h4>
                    <p class="text-gray-600 text-sm">
                        <?php _e('Every class is taught with love, dedication, and enthusiasm', 'academy-of-dance'); ?>
                    </p>
                </div>
                
                <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
                    <svg class="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    <h4 class="font-playfair text-xl font-bold text-primary mb-2">
                        <?php _e('Award Winning', 'academy-of-dance'); ?>
                    </h4>
                    <p class="text-gray-600 text-sm">
                        <?php _e('Over 1000 awards and recognitions in competitions', 'academy-of-dance'); ?>
                    </p>
                </div>
                
                <div class="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 text-center">
                    <svg class="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    <h4 class="font-playfair text-xl font-bold text-primary mb-2">
                        <?php _e('Goal Oriented', 'academy-of-dance'); ?>
                    </h4>
                    <p class="text-gray-600 text-sm">
                        <?php _e('Structured curriculum designed for measurable progress', 'academy-of-dance'); ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
