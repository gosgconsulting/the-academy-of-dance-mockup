<?php
/**
 * The template for displaying all single posts
 * 
 * @package AcademyOfDance
 */

get_header(); ?>

<main id="main" class="min-h-screen bg-white pt-20">
    <div class="container mx-auto px-6 py-12">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('max-w-4xl mx-auto'); ?>>
                <header class="entry-header mb-8 text-center">
                    <h1 class="entry-title font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
                        <?php the_title(); ?>
                    </h1>
                    <div class="entry-meta text-gray-600 text-sm mb-6">
                        <?php
                        printf(
                            __('Posted on %s by %s', 'academy-of-dance'),
                            '<time class="entry-date" datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>',
                            '<span class="author">' . esc_html(get_the_author()) . '</span>'
                        );
                        ?>
                    </div>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="entry-thumbnail mb-8">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-auto rounded-lg')); ?>
                        </div>
                    <?php endif; ?>
                </header>

                <div class="entry-content prose prose-lg max-w-none">
                    <?php the_content(); ?>
                </div>

                <footer class="entry-footer mt-8 pt-8 border-t border-gray-200">
                    <?php
                    $categories = get_the_category();
                    $tags = get_the_tags();
                    
                    if ($categories || $tags) :
                    ?>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <?php if ($categories) : ?>
                                <div>
                                    <span class="font-semibold"><?php _e('Categories:', 'academy-of-dance'); ?></span>
                                    <?php foreach ($categories as $category) : ?>
                                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" 
                                           class="ml-2 text-primary hover:text-secondary">
                                            <?php echo esc_html($category->name); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            
                            <?php if ($tags) : ?>
                                <div>
                                    <span class="font-semibold"><?php _e('Tags:', 'academy-of-dance'); ?></span>
                                    <?php foreach ($tags as $tag) : ?>
                                        <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" 
                                           class="ml-2 text-primary hover:text-secondary">
                                            #<?php echo esc_html($tag->name); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </footer>
            </article>

            <?php
            the_post_navigation(array(
                'prev_text' => __('&larr; Previous Post', 'academy-of-dance'),
                'next_text' => __('Next Post &rarr;', 'academy-of-dance'),
            ));
            ?>

        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
