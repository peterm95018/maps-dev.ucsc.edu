<?php
// $Id: template.php,v 1.16.2.2 2009/08/10 11:32:54 goba Exp $

/**
 * Sets the body-tag class attribute.
 *
 * Adds 'sidebar-left', 'sidebar-right' or 'sidebars' classes as needed.
 */
function phptemplate_body_class($left, $right) {
  if ($left != '' && $right != '') {
    $class = 'sidebars';
  }
  else {
    if ($left != '') {
      $class = 'sidebar-left';
    }
    if ($right != '') {
      $class = 'sidebar-right';
    }
  }

  if (isset($class)) {
    print ' class="'. $class .'"';
  }
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return a string containing the breadcrumb output.
 */
function phptemplate_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
    return '<div class="breadcrumb">'. implode(' › ', $breadcrumb) .'</div>';
  }
}

/**
 * Override or insert PHPTemplate variables into the templates.
 */
function phptemplate_preprocess_page(&$vars) {
  $vars['tabs2'] = menu_secondary_local_tasks();

  // Hook into color.module
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

/**
 * Add a "Comments" heading above comments except on forum pages.
 */
function garland_preprocess_comment_wrapper(&$vars) {
  if ($vars['content'] && $vars['node']->type != 'forum') {
    $vars['content'] = '<h2 class="comments">'. t('Comments') .'</h2>'.  $vars['content'];
  }
}

/**
 * Returns the rendered local tasks. The default implementation renders
 * them as tabs. Overridden to split the secondary tasks.
 *
 * @ingroup themeable
 */
function phptemplate_menu_local_tasks() {
  return menu_primary_local_tasks();
}

function phptemplate_comment_submitted($comment) {
  return t('!datetime — !username',
    array(
      '!username' => theme('username', $comment),
      '!datetime' => format_date($comment->timestamp)
    ));
}

function phptemplate_node_submitted($node) {
  return t('!datetime — !username',
    array(
      '!username' => theme('username', $node),
      '!datetime' => format_date($node->created),
    ));
}

/**
 * Generates IE CSS links for LTR and RTL languages.
 */
function phptemplate_get_ie_styles() {
  global $language;

  $iecss = '<link type="text/css" rel="stylesheet" media="all" href="'. base_path() . path_to_theme() .'/fix-ie.css" />';
  if ($language->direction == LANGUAGE_RTL) {
    $iecss .= '<style type="text/css" media="all">@import "'. base_path() . path_to_theme() .'/fix-ie-rtl.css";</style>';
  }

  return $iecss;
}


/**
* Override or insert PHPTemplate variables into the search_block_form template.
*
* @param $vars
*   A sequential array of variables to pass to the theme template.
* @param $hook
*   The name of the theme function being called (not used in this case.)
* sourced from http://systemseed.com/blog/how-customise-search-box-drupal-6
* sourced from http://drupal.org/node/154137
* also uses some input from the 960 robots examples in Lullabot vids
*/
  
function garland_maps_preprocess_search_block_form(&$vars, $hook) {
  
	 // Modify elements of the search form
	    // $vars['form']['search_block_form']['#title'] = t('Search');
	    // Remove the title of the search form
        unset($vars['form']['search_block_form']['#title']);

	    // Set a default value for the search box
	  $vars['form']['search_block_form']['#value'] = t('UCSC Maps');

	    // Add a custom class to the search box
	    // Set yourtheme.css > #search-block-form .form-text { color: #888888; }
	  $vars['form']['search_block_form']['#attributes'] = array(
	       'onblur' => "if (this.value == '') {this.value = '".$vars['form']['search_block_form']['#value']."';} this.style.color = '#000000';", 
	         'onfocus' => "if (this.value == '".$vars['form']['search_block_form']['#value']."') {this.value = '';} this.style.color = '#000000';" );

	    // Modify elements of the submit button
	    unset($vars['form']['submit']);

	    // Change text on the submit button
	    $vars['form']['submit']['#value'] = t('Go!');

	    // Change submit button into image button - NOTE: '#src' leading '/' automatically added
	    $vars['form']['submit']['image_button'] = array('#type' => 'image_button', '#src' => path_to_theme() . '/images/search-button.gif');

	    // Rebuild the rendered version (search form only, rest remains unchanged)
	  unset($vars['form']['search_block_form']['#printed']);
	  $vars['search']['search_block_form'] = drupal_render($vars['form']['search_block_form']);

	    // Rebuild the rendered version (submit button, rest remains unchanged)
	    unset($vars['form']['submit']['#printed']);
	    $vars['search']['submit'] = drupal_render($vars['form']['submit']);

	    // Collect all form elements to print entire form
	  $vars['search_form'] = implode($vars['search']);
	
}