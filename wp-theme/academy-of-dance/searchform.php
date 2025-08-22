<?php
/**
 * The template for displaying search form
 * 
 * @package AcademyOfDance
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <div class="flex">
        <input type="search" 
               class="search-field flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
               placeholder="<?php echo esc_attr_x('Search...', 'placeholder', 'academy-of-dance'); ?>" 
               value="<?php echo get_search_query(); ?>" 
               name="s" />
        <button type="submit" 
                class="search-submit bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
            <?php echo esc_html_x('Search', 'submit button', 'academy-of-dance'); ?>
        </button>
    </div>
</form>
