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

function ucscv2_preprocess_search_result(&$variables) {
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
 * Peter's customizations
 * Register the node variables that will be used in the Map Item content type.
 * We use these variables in the Title description.
 */


function ucscv2_preprocess_node(&$vars) {
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

?>
