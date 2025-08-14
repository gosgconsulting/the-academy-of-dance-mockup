// =============================================================================
// WORDPRESS PLACEHOLDER COMPONENTS
// These components include WordPress function placeholders ready for PHP conversion
// =============================================================================

// =============================================================================
// GLOBAL COMPONENTS
// =============================================================================

// Navigation.tsx → header.php
const NavigationWP = () => {
  return (
    <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="{{site_url}}">
              <img 
                src="{{theme_url}}/assets/images/{{site_logo}}" 
                alt="{{site_title}}" 
                className="h-8 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </a>
          </div>
          
          {/* Desktop Menu - becomes wp_nav_menu() */}
          <div className="hidden md:flex space-x-8">
            {{wp_menu_primary}}
          </div>
          
          {/* Desktop CTA Button */}
          <button className="hidden md:block bg-primary hover:bg-primary/90 text-white">
            {{cta_button_text}}
          </button>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" id="mobile-menu-toggle">
            <span id="hamburger-icon">☰</span>
            <span id="close-icon" style="display: none;">✕</span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div id="mobile-menu" className="md:hidden mt-4 pb-4" style="display: none;">
          {{wp_menu_mobile}}
        </div>
      </div>
    </nav>
  );
};

// Footer.tsx → footer.php  
const FooterWP = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="{{theme_url}}/assets/images/{{site_logo}}" 
                alt="{{site_title}}" 
                className="h-12 md:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-gray-300 mb-6">{{site_tagline}}</p>
            
            <div className="flex justify-center space-x-4">
              <a href="{{social_facebook}}" target="_blank" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                {{facebook_icon}}
              </a>
              <a href="{{social_instagram}}" target="_blank" className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full transition-colors">
                {{instagram_icon}}
              </a>
              <a href="{{social_youtube}}" target="_blank" className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                {{youtube_icon}}
              </a>
              <a href="{{social_tiktok}}" target="_blank" className="bg-black hover:bg-gray-800 p-2 rounded-full transition-colors border border-white">
                {{tiktok_icon}}
              </a>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-8 text-sm mb-4">
            {{wp_menu_footer}}
          </div>
          <div className="text-gray-400 text-sm">
            © {{current_year}} {{site_title}}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// =============================================================================
// HOMEPAGE TEMPLATE PARTS
// =============================================================================

// HeroSection.tsx → template-parts/hero-section.php
const HeroSectionWP = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {{wp_loop_start}}
        {{hero_image_carousel}}
        {{wp_loop_end}}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 animate-fade-up flex flex-col items-center">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 text-center">
          {{hero_title_line_1}}
          <span className="text-secondary block text-center">{{hero_title_line_2}}</span>
        </h1>
        <p className="font-inter text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed md:text-xl text-center">
          {{hero_description}}
        </p>
        <div className="flex justify-center items-center">
          <button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
            {{hero_cta_text}}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        {{scroll_down_arrow}}
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {{hero_carousel_dots}}
      </div>
    </section>
  );
};

// AboutUsSection.tsx → template-parts/about-section.php
const AboutUsSectionWP = () => {
  return (
    <section id="about" className="py-20 bg-elegant-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-vibrant-bronze mb-6">
            {{about_title}}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            {{about_description}}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {{wp_loop_start}}
          {{about_values_repeater}}
          <div className="text-center group">
            <div className="bg-white rounded-full p-6 shadow-lg mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:shadow-xl transition-shadow">
              {{value_icon}}
            </div>
            <h3 className="text-xl font-playfair font-semibold text-vibrant-bronze mb-2">
              {{value_title}}
            </h3>
            <p className="text-gray-600 font-inter">
              {{value_description}}
            </p>
          </div>
          {{wp_loop_end}}
        </div>
      </div>
    </section>
  );
};

// StatisticsSection.tsx → template-parts/statistics.php
const StatisticsSectionWP = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-stats-gold via-stats-amber to-stats-bronze">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {{wp_loop_start}}
          {{statistics_repeater}}
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl md:text-4xl font-bold mb-2" style="color: {{stat_color}};">
                {{stat_number}}
              </div>
              <div className="text-gray-600 font-inter font-medium">
                {{stat_label}}
              </div>
            </div>
          </div>
          {{wp_loop_end}}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// BLOG COMPONENTS  
// =============================================================================

// Blog.tsx → home.php
const BlogTemplateWP = () => {
  return (
    <div className="min-h-screen bg-background">
      {{get_header()}}
      
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-12">
        <div className="container mx-auto px-4 text-center text-foreground">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-dance-bronze">
            {{blog_title}}
          </h1>
          <p className="text-lg md:text-xl mb-0 max-w-2xl mx-auto font-inter text-gray-600">
            {{blog_description}}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Blog Posts - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {{wp_loop_start}}
              {{while(have_posts())}}
              {{the_post()}}
              
              <article className="overflow-hidden hover:shadow-lg transition-shadow bg-card rounded-lg">
                <a href="{{the_permalink()}}">
                  <div className="aspect-video overflow-hidden">
                    {{the_post_thumbnail('large', 'class=w-full h-full object-cover hover:scale-105 transition-transform duration-300')}}
                  </div>
                </a>
                
                <header className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {{the_category('badge')}}
                    {{the_tags('badge')}}
                  </div>
                  
                  <a href="{{the_permalink()}}">
                    <h2 className="text-2xl font-playfair hover:text-primary transition-colors cursor-pointer text-dance-bronze">
                      {{the_title()}}
                    </h2>
                  </a>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      {{calendar_icon}}
                      {{the_date()}}
                    </div>
                    <div className="flex items-center gap-1">
                      {{clock_icon}}
                      {{reading_time}}
                    </div>
                  </div>
                </header>
                
                <div className="px-6 pb-6">
                  <p className="mb-4 font-inter text-gray-600">{{the_excerpt()}}</p>
                  <a href="{{the_permalink()}}" className="text-primary hover:text-primary/80 font-medium transition-colors font-inter">
                    Read More →
                  </a>
                </div>
              </article>
              
              {{endwhile}}
              {{wp_loop_end}}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {{get_sidebar()}}
              
              {/* Categories Widget */}
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-playfair text-dance-bronze mb-4">Categories</h3>
                {{wp_list_categories()}}
              </div>

              {/* Tags Widget */}
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-playfair text-dance-bronze mb-4">Tags</h3>
                {{wp_tag_cloud()}}
              </div>
            </div>
          </div>
        </div>
      </section>

      {{get_footer()}}
    </div>
  );
};

// =============================================================================
// CUSTOM POST TYPE TEMPLATES
// =============================================================================

// ProgrammesAndExamsSection.tsx → template-parts/programmes.php
const ProgrammesSectionWP = () => {
  return (
    <section id="programmes" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-vibrant-bronze mb-6">
            {{programmes_title}}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            {{programmes_description}}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {{wp_loop_start}}
          {{query_posts('post_type=programs&posts_per_page=-1')}}
          {{while(have_posts())}}
          {{the_post()}}
          
          <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {{the_post_thumbnail('medium', 'class=w-full h-48 object-cover')}}
            <div className="p-6">
              <h3 className="text-xl font-playfair font-semibold text-vibrant-bronze mb-3">
                {{the_title()}}
              </h3>
              <p className="text-gray-600 mb-4 font-inter">
                {{the_excerpt()}}
              </p>
              <div className="text-sm text-gray-500 mb-4">
                Age Group: {{get_field('age_group')}}
              </div>
              <a href="{{the_permalink()}}" className="text-primary hover:text-primary/80 font-medium">
                Learn More →
              </a>
            </div>
          </div>
          
          {{endwhile}}
          {{wp_reset_query()}}
          {{wp_loop_end}}
        </div>
      </div>
    </section>
  );
};

// EventsSection.tsx → template-parts/events.php
const EventsSectionWP = () => {
  return (
    <section id="events" className="py-20 bg-elegant-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-vibrant-bronze mb-6">
            {{events_title}}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            {{events_description}}
          </p>
        </div>
        
        {/* Event Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <button id="tab-upcoming" className="px-6 py-3 bg-primary text-white rounded-l-lg">
              Upcoming Events
            </button>
            <button id="tab-past" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-r-lg">
              Past Events
            </button>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div id="upcoming-events" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {{wp_loop_start}}
          {{query_posts('post_type=events&meta_key=event_date&meta_value=' . date('Y-m-d') . '&meta_compare=>=&orderby=meta_value&order=ASC')}}
          {{while(have_posts())}}
          {{the_post()}}
          
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            {{the_post_thumbnail('medium', 'class=w-full h-48 object-cover')}}
            <div className="p-6">
              <h3 className="text-xl font-playfair font-semibold mb-2">{{the_title()}}</h3>
              <div className="text-sm text-gray-500 mb-3">{{get_field('event_date')}}</div>
              <p className="text-gray-600 font-inter">{{the_excerpt()}}</p>
            </div>
          </div>
          
          {{endwhile}}
          {{wp_reset_query()}}
          {{wp_loop_end}}
        </div>
        
        {/* Past Events Carousel */}
        <div id="past-events" className="hidden">
          <div className="carousel-container">
            {{wp_loop_start}}
            {{query_posts('post_type=events&meta_key=event_date&meta_value=' . date('Y-m-d') . '&meta_compare=<&orderby=meta_value&order=DESC')}}
            {{while(have_posts())}}
            {{the_post()}}
            
            <div class="carousel-item">
              <!-- Event card content -->
              {{get_template_part('template-parts/event-card')}}
            </div>
            
            {{endwhile}}
            {{wp_reset_query()}}
            {{wp_loop_end}}
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// INTERACTIVE COMPONENTS (Converted to vanilla JS)
// =============================================================================

// WhatsAppButton.tsx → template-parts/whatsapp-button.php
const WhatsAppButtonWP = () => {
  return (
    `<button
      id="whatsapp-button"
      class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    </button>

    <script>
    document.getElementById('whatsapp-button').addEventListener('click', function() {
      {{toggle_whatsapp_chat}}
    });
    </script>`
  );
};

// TrialsSection.tsx → template-parts/trials-section.php (with Contact Form 7)
const TrialsSectionWP = () => {
  return (
    <section id="trials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-vibrant-bronze mb-6">
            {{trials_title}}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            {{trials_description}}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Contact Form 7 shortcode */}
          {{do_shortcode('[contact-form-7 id="trial-booking" title="Trial Class Booking"]')}}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// JAVASCRIPT FOR INTERACTIVITY
// =============================================================================

const WordPressJS = `
<script>
// Mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-icon');
  const close = document.getElementById('close-icon');
  
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
    hamburger.style.display = 'none';
    close.style.display = 'inline';
  } else {
    menu.style.display = 'none';
    hamburger.style.display = 'inline';
    close.style.display = 'none';
  }
});

// Smooth scrolling
function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
  });
}

// Hero carousel
function initHeroCarousel() {
  const images = document.querySelectorAll('.hero-image');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentIndex = 0;
  
  function showImage(index) {
    images.forEach((img, i) => {
      img.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Auto-advance
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 3000);
  
  // Manual navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });
}

// WhatsApp integration
function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = 'https://wa.me/{{whatsapp_number}}?text=' + encodedMessage;
  window.open(whatsappUrl, '_blank');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initHeroCarousel();
});
</script>
`;

export {
  NavigationWP,
  FooterWP, 
  HeroSectionWP,
  AboutUsSectionWP,
  StatisticsSectionWP,
  BlogTemplateWP,
  ProgrammesSectionWP,
  EventsSectionWP,
  WhatsAppButtonWP,
  TrialsSectionWP,
  WordPressJS
};