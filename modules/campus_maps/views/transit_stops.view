<?php
/**
 * Transit Stops View
 * Used to mark transit stop locations.
 */

$view = new view;
$view->name = 'transit_stops';
$view->description = 'A view for the transit stops';
$view->tag = '';
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
  'title' => array(
    'operator' => 'starts',
    'value' => 'Transit',
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'case' => 1,
    'id' => 'title',
    'table' => 'node',
    'field' => 'title',
    'relationship' => 'none',
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
$handler->override_option('title', 'Transit Stops');
$handler->override_option('items_per_page', 0);
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
  'preset' => 'transit_stops',
));
$handler->override_option('path', 'transit-stops');
$handler->override_option('menu', array(
  'type' => 'normal',
  'title' => 'Transit Stops',
  'description' => 'Transit Stops',
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
