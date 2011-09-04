<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><?php print $title . " - " . $site_name . " - UC Santa Cruz"; ?></title>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
	<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=7" /><![endif]-->
<?php

echo
  "<link rel=\"shortcut icon\" href=\"" .
  url(drupal_get_path("theme", "ucscv2") . "/images/favicon.ico") .
  "\" type=\"image/x-icon\" />\n";

print $head;
print $styles;
print $scripts;

?>

    <?php
    /* Load custom local stylesheet */
    $css_url = theme_get_setting('ucscv2_css_url');
    if ($css_url != ""): ?>
        <link type="text/css" rel="stylesheet" media="all" href="<?php print $css_url; ?>" />    
    <?php endif; ?>

</head>
<body class="<?php print $body_classes; ?>">

<div id="outer">

	<!-- Accessibility links. Hidden until they receive :focus -->
  <ul id="access-links">
      <li><a href="#content">Skip to main content</a></li>
      <li><a href="#main-nav">Skip to primary navigation</a></li>
  </ul>

<div id="wrap">
<div class="container_12">
    
    	<div class="grid_9 omega">
    		<ul id="utility-nav">
    			<li class="home"><a href="http://www.ucsc.edu">University Home</a></li>
    			<li><a href="http://my.ucsc.edu" title="Go to the MyUCSC portal">MyUCSC</a></li>
    			<li><a href="http://www.ucsc.edu/tools/people.html" title="Find People - UCSC People Search">People</a></li>
    			<li><a href="http://www.ucsc.edu/tools/calendars.html" title="View UCSC events, academic, and administrative calendars">Calendars</a></li>
    			<li><a href="http://www.ucsc.edu/tools/azindex.html" title="A to Z index of important links">A-Z Index</a></li>
    		</ul> 
    	</div>

    	<div class="grid_3 omega" id="search">
          <?php print $search_region; ?>
    	</div>

      <div class="clear"></div>
    
    	<div class="grid_3" id="ucsc-logo">
    		<a href="http://www.ucsc.edu" id="logo">UC Santa Cruz home</a>
    	</div>

    	<div class="grid_9 pull_1"><h1 id="site-title"><?php

$options = array();

if (strlen($site_name) > 32) {
  $options["attributes"] = array(
    "class" => "title-small"
  );
} else if (strlen($site_name) > 28) {
  $options["attributes"] = array(
    "class" => "title-medium"
  );
} else if (strlen($site_name) > 24) {
  $options["attributes"] = array(
    "class" => "title-large"
  );
} else {
  $options["attributes"] = array(
    "class" => "title-xlarge"
  );
}

echo l(
  $site_name,
  "<front>",
  $options
);

?></h1>
    	</div>

    <div class="clear"></div>
    
    	<div class="grid_12 alpha" id="main-nav">
    		<?php print $menu; ?>
    	</div>

    <div class="clear"></div>
		
<?php
    
    /* Code for a front page template - looks for front page-only regions */
    if (theme_get_setting('ucscv2_frontpage') == '1' &&  $is_front):
    
?>		
				
	<?php if ($is_front && $above_content): ?>
		<div id="above-content" class="grid_12">
			<?php print $above_content; ?>
		</div>
    <div class="clear"></div>
	<?php endif; ?>	
		
		
	<div class="grid_12">
		<?php print $tabs; ?>
		<?php if ($show_messages && $messages): print $messages; endif; ?>
        <?php if($help): print '<div class="help">' . $help . '</div>'; endif; ?>
        
		<?php if (trim($content)): ?>
	    <div id="content">
	        <?php print $content; ?>
			<div class="clear"></div>
	    </div>
		<?php endif; ?>
											
		<div id="three_column">
			<div class="grid_4 alpha" id="three_column_one">
				<?php print $three_column_one; ?>
			</div>
			<div class="grid_4" id="three_column_two">
				<?php print $three_column_two; ?>
			</div>
			<div class="grid_4 omega" id="three_column_three">
				<?php print $three_column_three; ?>
			</div>
		</div>

		<div class="clear"></div>

		<div id="four_column">
			<div class="grid_3 alpha" id="four_column_one">
				<?php print $four_column_one; ?>
			</div>
			<div class="grid_3" id="four_column_two">
				<?php print $four_column_two; ?>
			</div>
			<div class="grid_3" id="four_column_three">
				<?php print $four_column_three; ?>
			</div>
			<div class="grid_3 omega" id="four_column_four">
				<?php print $four_column_four; ?>
			</div>
		</div>				
		
		<?php if($below_content): ?>    
		<div class="clear"></div>    
		
		    <div>
		        <?php print $below_content; ?>
		    </div>
		    
		<?php endif; ?>	
					
	</div>
	
<?php 
    
    /* END front page-only template */
    
    /* Begin interior page template  */
    elseif (theme_get_setting('ucscv2_frontpage') == '0' && $is_front):
    
?>		
		

		<?php if ($left): // If there is a left column, we put the content first, then print it. ?>

			<div class="grid_9 push_3">
				<h1><?php print $title; ?></h1>
				<?php if($above_content): ?>
				  <div id="above-content" class="grid_12">
				    <?php print $above_content; ?>
				  </div>
				<?php endif; ?>
				<div id="content">
					<?php if ($show_messages && $messages): print $messages; endif; ?>
					<?php if($help): print '<div class="help">' . $help . '</div>'; endif; ?>
					<?php print $tabs; ?>
					<?php print $content; ?>
					<div class="clear"></div>
				</div>
				<?php if($below_content): ?>
				    <div id="below-content">
				        <?php print $below_content; ?>
				        <div class="clear"></div>
				    </div>
				<?php endif; ?>				
			</div>

			<div class="grid_3 pull_9" id="left-content">
				<?php print $left; ?>				
			</div>

		<?php else: // Otherwise, we just print the content. ?>
		
			<div class="grid_12">
			<h1 id="title"><?php print $title; ?></h1>
			<?php if($above_content): ?><div class="grid_11" id="bannerBox"><?php print $above_content; ?></div><?php endif; ?>						
				<div  id="content">
					<?php echo $messages; ?>
					<?php print $tabs; ?>
					<?php print $content; ?>
					<div class="clear"></div>
				</div>
			<?php if($below_content): ?>
			    <div id="below-content">
			        <?php print $below_content; ?>
			        <div class="clear"></div>
			    </div>
			<?php endif; ?>								
			</div>
		
		<?php endif; ?>

	
<?php 

/* END front page-only template */

/* Begin interior page template  */
elseif (!$is_front):

?>		

<?php if ($breadcrumb != ""): ?>
	<div id="breadcrumbs" class="grid_12">
		<?php print $breadcrumb; ?>	  	
	</div>
<?php endif; ?>

<div class="clear"></div>


<?php if ($left): // If there is a left column, we put the content first, then print it. ?>

	<div class="grid_9 push_3">
		<h1 id="title"><?php print $title; ?></h1>
		<?php if($above_content): ?>
		  <div id="above-content" class="grid_12">
		    <?php print $above_content; ?>
		  </div>
		<?php endif; ?>
		<!-- psm change -->
			 <div class="destination-maps">
             <?php print views_embed_view('map_node_destination_maps', 'default', arg(1)); ?>
        </div>
		<div id="content">
			<?php echo $messages; ?>
			<?php print $tabs; ?>
			<?php print $content; ?>
			<div class="clear"></div>
		</div>
		<?php if($below_content): ?>
		    <div id="below-content">
		        <?php print $below_content; ?>
		        <div class="clear"></div>
		    </div>
		<?php endif; ?>				
	</div>

	<div class="grid_3 pull_9" id="left-content">
		<?php print $left; ?>				
	</div>

<?php else: // Otherwise, we just print the content. ?>

	<div class="grid_12">
	<h1><?php print $title; ?></h1>
	<?php if($above_content): ?><div class="grid_11" id="bannerBox"><?php print $above_content; ?></div><?php endif; ?>						
		<div  id="content">
      			<?php print $messages; ?>
			<?php print $help; ?>
			<?php print $tabs; ?>
			<?php print $content; ?>
			<div class="clear"></div>
		</div>
	<?php if($below_content): ?>
	    <div id="below-content">
	        <?php print $below_content; ?>
	        <div class="clear"></div>
	    </div>
	<?php endif; ?>								
	</div>

<?php endif; ?>


		
<?php 

    /* END interior page template as home */
    endif;
    
?>	

<div class="clear"></div>

<div id="footer">
  
  <?php /* Set classes for footer divs */
    if ($links) {
      // Links region is populated
      $footer_grid_class = "grid_7 pull_5";
    } 
    else {
      // Links region is empty
      $footer_grid_class = "grid_12";
    }
  ?>
  
	<?php if($links): ?>
    <div class="grid_5 push_7" id="footer-links">
		  <?php print $links; ?>
    </div>
	<?php endif; ?>
	
	<div class="<?php print $footer_grid_class; ?>" id="campus-info">
		<p>University of California Santa Cruz, 1156 High Street, Santa Cruz, CA 95064</p>
		<p>&copy; <?php print date("Y"); ?> The Regents of the University of California. All Rights Reserved.</p>
	</div>	
		
	<div class="clear"></div>
</div>
    <!-- Clearing floated elements from #footer -->
    <div class="clear"></div>
</div><!-- /.container_12 -->
</div><!-- /#wrap -->
</div><!-- /#outer -->

<?php print $closure; ?>

<script type="text/javascript" src="https://stats.soe.ucsc.edu/stats.js"></script><noscript><img src="https://stats.soe.ucsc.edu/stats.php?JavaScript=No" width="1" height="1" alt="" /></noscript>

</body>
</html>
