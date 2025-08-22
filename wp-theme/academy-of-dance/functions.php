<?php
/**
 * Academy of Dance Theme Functions
 * 
 * @package AcademyOfDance
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme setup
 */
function academy_of_dance_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'academy-of-dance'),
        'footer' => __('Footer Menu', 'academy-of-dance'),
    ));
}
add_action('after_setup_theme', 'academy_of_dance_setup');

/**
 * Enqueue scripts and styles
 */
function academy_of_dance_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('academy-of-dance-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue Tailwind CSS
    wp_enqueue_style('academy-of-dance-tailwind', get_template_directory_uri() . '/assets/css/tailwind.css', array(), '1.0.0');
    
    // Enqueue custom JavaScript
    wp_enqueue_script('academy-of-dance-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('academy-of-dance-script', 'academy_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('academy_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'academy_of_dance_scripts');

/**
 * Register widget areas
 */
function academy_of_dance_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'academy-of-dance'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'academy-of-dance'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'academy_of_dance_widgets_init');

/**
 * Custom post types
 */
function academy_of_dance_custom_post_types() {
    // Teachers post type
    register_post_type('teachers', array(
        'labels' => array(
            'name' => __('Teachers', 'academy-of-dance'),
            'singular_name' => __('Teacher', 'academy-of-dance'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-admin-users',
    ));
    
    // Programs post type
    register_post_type('programs', array(
        'labels' => array(
            'name' => __('Programs', 'academy-of-dance'),
            'singular_name' => __('Program', 'academy-of-dance'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-playlist-audio',
    ));
    
    // Events post type
    register_post_type('events', array(
        'labels' => array(
            'name' => __('Events', 'academy-of-dance'),
            'singular_name' => __('Event', 'academy-of-dance'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-calendar-alt',
    ));
    
    // Gallery post type
    register_post_type('gallery', array(
        'labels' => array(
            'name' => __('Gallery', 'academy-of-dance'),
            'singular_name' => __('Gallery Item', 'academy-of-dance'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-gallery',
    ));
    
    // Reviews post type
    register_post_type('reviews', array(
        'labels' => array(
            'name' => __('Reviews', 'academy-of-dance'),
            'singular_name' => __('Review', 'academy-of-dance'),
        ),
        'public' => true,
        'has_archive' => false,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-star-filled',
    ));
}
add_action('init', 'academy_of_dance_custom_post_types');

/**
 * Theme customizer
 */
function academy_of_dance_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title' => __('Hero Section', 'academy-of-dance'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_title', array(
        'default' => 'Where dreams take flight through the art of dance',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label' => __('Hero Title', 'academy-of-dance'),
        'section' => 'hero_section',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('hero_subtitle', array(
        'default' => 'Discover your passion for dance at Singapore\'s premier dance academy',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('hero_subtitle', array(
        'label' => __('Hero Subtitle', 'academy-of-dance'),
        'section' => 'hero_section',
        'type' => 'textarea',
    ));
    
    // Contact Information
    $wp_customize->add_section('contact_info', array(
        'title' => __('Contact Information', 'academy-of-dance'),
        'priority' => 40,
    ));
    
    $wp_customize->add_setting('whatsapp_number', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('whatsapp_number', array(
        'label' => __('WhatsApp Number', 'academy-of-dance'),
        'section' => 'contact_info',
        'type' => 'text',
    ));
    
    // Social Media Links
    $wp_customize->add_section('social_media', array(
        'title' => __('Social Media', 'academy-of-dance'),
        'priority' => 50,
    ));
    
    $social_platforms = array('facebook', 'instagram', 'youtube', 'tiktok');
    
    foreach ($social_platforms as $platform) {
        $wp_customize->add_setting($platform . '_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        
        $wp_customize->add_control($platform . '_url', array(
            'label' => __(ucfirst($platform) . ' URL', 'academy-of-dance'),
            'section' => 'social_media',
            'type' => 'url',
        ));
    }
}
add_action('customize_register', 'academy_of_dance_customize_register');

/**
 * Custom meta boxes
 */
function academy_of_dance_add_meta_boxes() {
    add_meta_box(
        'teacher_details',
        __('Teacher Details', 'academy-of-dance'),
        'academy_of_dance_teacher_meta_box',
        'teachers'
    );
    
    add_meta_box(
        'program_details',
        __('Program Details', 'academy-of-dance'),
        'academy_of_dance_program_meta_box',
        'programs'
    );
}
add_action('add_meta_boxes', 'academy_of_dance_add_meta_boxes');

/**
 * Teacher meta box callback
 */
function academy_of_dance_teacher_meta_box($post) {
    wp_nonce_field('academy_of_dance_teacher_meta', 'academy_of_dance_teacher_nonce');
    
    $specialty = get_post_meta($post->ID, '_teacher_specialty', true);
    $experience = get_post_meta($post->ID, '_teacher_experience', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="teacher_specialty">' . __('Specialty', 'academy-of-dance') . '</label></th>';
    echo '<td><input type="text" id="teacher_specialty" name="teacher_specialty" value="' . esc_attr($specialty) . '" class="regular-text" /></td></tr>';
    echo '<tr><th><label for="teacher_experience">' . __('Years of Experience', 'academy-of-dance') . '</label></th>';
    echo '<td><input type="number" id="teacher_experience" name="teacher_experience" value="' . esc_attr($experience) . '" class="small-text" /></td></tr>';
    echo '</table>';
}

/**
 * Program meta box callback
 */
function academy_of_dance_program_meta_box($post) {
    wp_nonce_field('academy_of_dance_program_meta', 'academy_of_dance_program_nonce');
    
    $age_group = get_post_meta($post->ID, '_program_age_group', true);
    $duration = get_post_meta($post->ID, '_program_duration', true);
    $price = get_post_meta($post->ID, '_program_price', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="program_age_group">' . __('Age Group', 'academy-of-dance') . '</label></th>';
    echo '<td><input type="text" id="program_age_group" name="program_age_group" value="' . esc_attr($age_group) . '" class="regular-text" /></td></tr>';
    echo '<tr><th><label for="program_duration">' . __('Duration (minutes)', 'academy-of-dance') . '</label></th>';
    echo '<td><input type="number" id="program_duration" name="program_duration" value="' . esc_attr($duration) . '" class="small-text" /></td></tr>';
    echo '<tr><th><label for="program_price">' . __('Price', 'academy-of-dance') . '</label></th>';
    echo '<td><input type="text" id="program_price" name="program_price" value="' . esc_attr($price) . '" class="regular-text" /></td></tr>';
    echo '</table>';
}

/**
 * Save meta box data
 */
function academy_of_dance_save_meta_boxes($post_id) {
    // Teacher meta
    if (isset($_POST['academy_of_dance_teacher_nonce']) && wp_verify_nonce($_POST['academy_of_dance_teacher_nonce'], 'academy_of_dance_teacher_meta')) {
        if (isset($_POST['teacher_specialty'])) {
            update_post_meta($post_id, '_teacher_specialty', sanitize_text_field($_POST['teacher_specialty']));
        }
        if (isset($_POST['teacher_experience'])) {
            update_post_meta($post_id, '_teacher_experience', intval($_POST['teacher_experience']));
        }
    }
    
    // Program meta
    if (isset($_POST['academy_of_dance_program_nonce']) && wp_verify_nonce($_POST['academy_of_dance_program_nonce'], 'academy_of_dance_program_meta')) {
        if (isset($_POST['program_age_group'])) {
            update_post_meta($post_id, '_program_age_group', sanitize_text_field($_POST['program_age_group']));
        }
        if (isset($_POST['program_duration'])) {
            update_post_meta($post_id, '_program_duration', intval($_POST['program_duration']));
        }
        if (isset($_POST['program_price'])) {
            update_post_meta($post_id, '_program_price', sanitize_text_field($_POST['program_price']));
        }
    }
}
add_action('save_post', 'academy_of_dance_save_meta_boxes');
