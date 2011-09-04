<?php
/**
 * Parking Sales View
 * Used for marking locations where you can buy parking.
 */

 
$view = new view;
$view->name = 'parking_sales';
$view->description = 'A view of all parking sales locations';
$view->tag = 'parking';
$view->view_php = '';
$view->base_table = 'node';
$view->is_cacheable = FALSE;
$view->api_version = 2;
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */
$handler = $view->new_display('default', 'Defaults', 'default');
$handler->override_option('fields', array(
  'field_map_point_openlayers_wkt' => array(
    'label' => 'Map Point',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_node' => 0,
    'label_type' => 'widget',
    'format' => 'openlayers_wkt',
    'multiple' => array(
      'group' => TRUE,
      'multiple_number' => '',
      'multiple_from' => '',
      'multiple_reversed' => FALSE,
    ),
    'exclude' => 0,
    'id' => 'field_map_point_openlayers_wkt',
    'table' => 'node_data_field_map_point',
    'field' => 'field_map_point_openlayers_wkt',
    'relationship' => 'none',
  ),
  'body' => array(
    'label' => '',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'exclude' => 0,
    'id' => 'body',
    'table' => 'node_revisions',
    'field' => 'body',
    'relationship' => 'none',
  ),
  'title' => array(
    'label' => '',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '',
      'link_class' => '',
      'alt' => '',
      'prefix' => '',
      'suffix' => '',
      'target' => '',
      'help' => '',
      'trim' => 0,
      'max_length' => '',
      'word_boundary' => 1,
      'ellipsis' => 1,
      'html' => 0,
      'strip_tags' => 0,
    ),
    'empty' => '',
    'hide_empty' => 0,
    'empty_zero' => 0,
    'link_to_node' => 0,
    'exclude' => 0,
    'id' => 'title',
    'table' => 'node',
    'field' => 'title',
    'relationship' => 'none',
  ),
));
$handler->override_option('filters', array(
  'status' => array(
    'operator' => '=',
    'value' => '1',
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'id' => 'status',
    'table' => 'node',
    'field' => 'status',
    'relationship' => 'none',
  ),
  'type' => array(
    'operator' => 'in',
    'value' => array(
      'map_item' => 'map_item',
    ),
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'id' => 'type',
    'table' => 'node',
    'field' => 'type',
    'relationship' => 'none',
  ),
  'field_item_type_value_many_to_one' => array(
    'operator' => 'or',
    'value' => array(
      '3' => '3',
    ),
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'id' => 'field_item_type_value_many_to_one',
    'table' => 'node_data_field_item_type',
    'field' => 'field_item_type_value_many_to_one',
    'relationship' => 'none',
    'reduce_duplicates' => 0,
  ),
  'field_parking_type_value_many_to_one' => array(
    'operator' => 'or',
    'value' => array(
      '2' => '2',
    ),
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'id' => 'field_parking_type_value_many_to_one',
    'table' => 'node_data_field_parking_type',
    'field' => 'field_parking_type_value_many_to_one',
    'relationship' => 'none',
    'reduce_duplicates' => 0,
  ),
));
$handler->override_option('access', array(
  'type' => 'none',
));
$handler->override_option('cache', array(
  'type' => 'time',
  'results_lifespan' => '3600',
  'output_lifespan' => '3600',
));
$handler->override_option('title', 'Parking Sales Locations');
$handler->override_option('style_plugin', 'openlayers_data');
$handler->override_option('style_options', array(
  'grouping' => '',
  'data_source' => array(
    'value' => 'openlayers_wkt',
    'other_lat' => 'field_map_point_openlayers_wkt',
    'other_lon' => 'field_map_point_openlayers_wkt',
    'openlayers_wkt' => 'field_map_point_openlayers_wkt',
    'other_top' => 'field_map_point_openlayers_wkt',
    'other_right' => 'field_map_point_openlayers_wkt',
    'other_bottom' => 'field_map_point_openlayers_wkt',
    'other_left' => 'field_map_point_openlayers_wkt',
    'name_field' => 'title',
    'description_field' => 'body',
  ),
));
$handler = $view->new_display('openlayers', 'OpenLayers Data', 'openlayers_1');
$handler->override_option('row_plugin', '');
$handler->override_option('displays', array());
$handler = $view->new_display('page', 'Page', 'page_1');
$handler->override_option('style_plugin', 'openlayers_map');
$handler->override_option('style_options', array(
  'preset' => 'all_parking',
));
$handler->override_option('path', 'parking-sales');
$handler->override_option('menu', array(
  'type' => 'none',
  'title' => 'All Parking Locations',
  'description' => 'All markers for parking locations',
  'weight' => '0',
  'name' => 'secondary-links',
));
$handler->override_option('tab_options', array(
  'type' => 'none',
  'title' => '',
  'description' => '',
  'weight' => 0,
  'name' => 'navigation',
));

