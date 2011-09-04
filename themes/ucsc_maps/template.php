<?php

/*
 * Implementation of hook preprocess_search_result()
 * 
 * This override allows us to insert 'content/%nid/map_detail 
 * into the path so that a search result can use the map_detail
 * view and associated openlayers preset for detail view.
 * 
 * $result is an array than contains the object $node. We need to get
 * the object into an array format so that we can loop over it for the nids
 */

function ucsc_maps_preprocess_search_result(&$variables) {
  $result = $variables['result'];
  // grab the node object
  $node_object = $result['node'];
  // create the $node array from the object
  $node = (array)$node_object;
  // we use the $base_url to give us the right URL
  global $base_url;

  // loop over the search results
  foreach ($variables['result'] as $result) {
	// loop over the node array to get the correct nid for this iteration
	foreach ($node as $key => $value) {
		$variables['url'] = $base_url .'/content/' . $node['nid'] .  '/map_detail';
		}
	}
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
  
function ucsc_maps_preprocess_search_block_form(&$vars, $hook) {
	 // Modify elements of the search form
	    $vars['form']['search_block_form']['#title'] = t('Search');

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
	    //$vars['form']['submit']['image_button'] = array('#type' => 'image_button', '#src' => path_to_theme() . '/images/search.png');

	    // Rebuild the rendered version (search form only, rest remains unchanged)
	  unset($vars['form']['search_block_form']['#printed']);
	  $vars['search']['search_block_form'] = drupal_render($vars['form']['search_block_form']);

	    // Rebuild the rendered version (submit button, rest remains unchanged)
	    unset($vars['form']['submit']['#printed']);
	    $vars['search']['submit'] = drupal_render($vars['form']['submit']);

	    // Collect all form elements to print entire form
	  $vars['search_form'] = implode($vars['search']);
	
}

/** 
 * Peter's customizations
 * Register the node variables that will be used in the Map Item content type.
 * We use these variables in the Title description.
 */


function ucsc_maps_preprocess_node(&$vars) {
$node = $vars['node'];
	if ($node->type == "map_item") {
		$vars['nid'] = $node->nid;
		$vars['title_name'] = $node->title;
		$vars['dept_location'] = $node->field_dept_location[0]['value'];
		$vars['common_destinations'] = $node->field_common_destinations[0]['value'];
		$vars['item_type'] = $node->field_item_type[0]['value'];
		$vars['parking_type'] = $node->field_parking_type[0]['value'];
		$vars['building'] = $node->field_building[0]['value'];
		
	}
	return $vars;

}