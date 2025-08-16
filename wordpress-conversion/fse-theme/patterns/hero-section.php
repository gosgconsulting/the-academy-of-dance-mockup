<?php
/**
 * Title: Hero Section
 * Slug: dance-academy/hero-section
 * Categories: hero
 * Description: A hero section with background image, heading, description and CTA button
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--xxx-large)","bottom":"var(--wp--preset--spacing--xxx-large)","left":"var(--wp--preset--spacing--medium)","right":"var(--wp--preset--spacing--medium)"}},"color":{"gradient":"var(--wp--preset--gradient--hero-gradient)"}},"textColor":"primary-foreground","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-primary-foreground-color has-text-color has-background" style="background:var(--wp--preset--gradient--hero-gradient);padding-top:var(--wp--preset--spacing--xxx-large);padding-right:var(--wp--preset--spacing--medium);padding-bottom:var(--wp--preset--spacing--xxx-large);padding-left:var(--wp--preset--spacing--medium)">

	<!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
	<div class="wp-block-group">
		
		<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(2.5rem, 5vw, 4rem)","lineHeight":"1.1","fontWeight":"700"}}} -->
		<h1 class="wp-block-heading has-text-align-center" style="font-size:clamp(2.5rem, 5vw, 4rem);font-weight:700;line-height:1.1">Transform Your Passion Into Performance</h1>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem","lineHeight":"1.6"},"spacing":{"margin":{"top":"var(--wp--preset--spacing--large)","bottom":"var(--wp--preset--spacing--x-large)"}}}} -->
		<p class="has-text-align-center" style="margin-top:var(--wp--preset--spacing--large);margin-bottom:var(--wp--preset--spacing--x-large);font-size:1.25rem;line-height:1.6">Discover the joy of dance with our expert instructors and comprehensive programs designed for all ages and skill levels.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
		<div class="wp-block-group">
			
			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"backgroundColor":"primary-foreground","textColor":"primary","style":{"border":{"radius":"8px"},"spacing":{"padding":{"left":"var(--wp--preset--spacing--x-large)","right":"var(--wp--preset--spacing--x-large)","top":"var(--wp--preset--spacing--medium)","bottom":"var(--wp--preset--spacing--medium)"}}}} -->
				<div class="wp-block-button"><a class="wp-block-button__link has-primary-color has-primary-foreground-background-color has-text-color has-background wp-element-button" href="#trials" style="border-radius:8px;padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--x-large);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--x-large)">Book Free Trial</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
			
			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"backgroundColor":"transparent","textColor":"primary-foreground","style":{"border":{"radius":"8px","width":"2px","color":"var(--wp--preset--color--primary-foreground)"},"spacing":{"padding":{"left":"var(--wp--preset--spacing--x-large)","right":"var(--wp--preset--spacing--x-large)","top":"var(--wp--preset--spacing--medium)","bottom":"var(--wp--preset--spacing--medium)"}}}} -->
				<div class="wp-block-button"><a class="wp-block-button__link has-primary-foreground-color has-transparent-background-color has-text-color has-background has-border-color wp-element-button" href="#programmes" style="border-color:var(--wp--preset--color--primary-foreground);border-radius:8px;border-width:2px;padding-top:var(--wp--preset--spacing--medium);padding-right:var(--wp--preset--spacing--x-large);padding-bottom:var(--wp--preset--spacing--medium);padding-left:var(--wp--preset--spacing--x-large)">View Programmes</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
			
		</div>
		<!-- /wp:group -->
		
	</div>
	<!-- /wp:group -->
	
</div>
<!-- /wp:group -->