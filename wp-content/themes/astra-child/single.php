<?php
// single.php

// This fetches the header of the theme
get_header();
?>

<div class="container">
    <main id="main" class="site-main" role="main">
        <?php
        // Start the loop to display posts
        while (have_posts()) :
            the_post();

            // Display the post content
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                    <div class="entry-meta">
                        <!-- Display post author, date, categories, etc., as needed -->
                        <span class="posted-on">Posted on: <?php echo get_the_date(); ?></span>
                        <span class="byline">by <?php the_author(); ?></span>
                        <span class="categories">Categories: <?php the_category(', '); ?></span>
                    </div>
                </header>

                <div class="entry-content">
                    <?php
                    // Display the featured image (if set)
                    if (has_post_thumbnail()) {
                        the_post_thumbnail('large', array('class' => 'post-thumbnail'));
                    }
                    ?>
                    <?php the_content(); ?>
                </div>

                <footer class="entry-footer">
                    <!-- You can add additional information, tags, comments, etc., here -->
                </footer>
            </article>

        <?php
        endwhile; // End of the loop.
        ?>
    </main>
</div>

<?php
// This fetches the footer of the theme
get_footer();
?>
