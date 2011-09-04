<?php
/**
 * Printable Maps View
 * Used to create the list of printable maps
 */


$view = new view;
$view->name = 'printable_maps';
$view->description = 'A list of nodes with PDF\'s attached.';
$view->tag = '';
$view->view_php = '';
$view->base_table = 'node';
$view->is_cacheable = FALSE;
$view->api_version = 2;
$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */
$handler = $view->new_display('default', 'Defaults', 'default');
$handler->override_option('fields', array(
  'nid' => array(
    'label' => 'Nid',
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
    'exclude' => 1,
    'id' => 'nid',
    'table' => 'node',
    'field' => 'nid',
    'relationship' => 'none',
  ),
  'field_pdf_fid' => array(
    'label' => '',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 0,
      'path' => '[field_pdf_fid]',
      'link_class' => '',
      'alt' => '[title] printable map in pdf',
      'prefix' => '',
      'suffix' => '',
      'target' => '_blank',
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
    'label_type' => 'none',
    'format' => 'url_plain',
    'multiple' => array(
      'group' => TRUE,
      'multiple_number' => '',
      'multiple_from' => '',
      'multiple_reversed' => FALSE,
    ),
    'exclude' => 1,
    'id' => 'field_pdf_fid',
    'table' => 'node_data_field_pdf',
    'field' => 'field_pdf_fid',
    'relationship' => 'none',
  ),
  'title' => array(
    'label' => '',
    'alter' => array(
      'alter_text' => 0,
      'text' => '',
      'make_link' => 1,
      'path' => '[field_pdf_fid]',
      'link_class' => '',
      'alt' => 'PDF map of [title]',
      'prefix' => '',
      'suffix' => '',
      'target' => '_blank',
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
$handler->override_option('sorts', array(
  'title' => array(
    'order' => 'ASC',
    'id' => 'title',
    'table' => 'node',
    'field' => 'title',
    'relationship' => 'none',
  ),
));
$handler->override_option('filters', array(
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
  'field_pdf_list' => array(
    'operator' => '=',
    'value' => '1',
    'group' => '0',
    'exposed' => FALSE,
    'expose' => array(
      'operator' => FALSE,
      'label' => '',
    ),
    'id' => 'field_pdf_list',
    'table' => 'node_data_field_pdf',
    'field' => 'field_pdf_list',
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
$handler->override_option('title', 'Printable Maps');
$handler->override_option('header', '<p><strong>General Campus Maps</strong>
<ul>
<li><a href="/sites/maps-dev.ucsc.edu/files/ucscCampus201009.pdf">UCSC Campus</a> (color)</li>
<li><a href="/sites/maps-dev.ucsc.edu/files/ucscCampus201008.jpg">UCSC Campus</a> (color, suitable for mobile device)</li>
<li><a href="/sites/maps-dev.ucsc.edu/files/ucscparking.pdf">UCSC Parking Map</a></li>
<li><a href="/sites/maps-dev.ucsc.edu/files/ucsc_campusmap_bw.pdf">UCSC Campus</a> (black & white)</li>
<li><a href="/sites/maps-dev.ucsc.edu/files/UCSC_upper_campus_map.pdf">UCSC Upper Campus Map</></li>
<li><a href="/sites/maps-dev.ucsc.edu/files/UCSC_walking_map.pdf">UCSC Walking Map</a></li>
</ul>
</p>
<br />
<p>The PDFs listed below are one-page documents that include close-up maps (as well as driving and parking instructions) for common destinations at the UCSC campus. They are suitable for printing on 8.5x11 paper.</p>');
$handler->override_option('header_format', '2');
$handler->override_option('header_empty', 0);
$handler->override_option('items_per_page', 50);
$handler->override_option('use_pager', '1');
$handler->override_option('style_plugin', 'table');
$handler->override_option('style_options', array(
  'grouping' => '',
  'override' => 1,
  'sticky' => 0,
  'order' => 'asc',
  'columns' => array(
    'nid' => 'nid',
    'field_pdf_fid' => 'field_pdf_fid',
    'title' => 'title',
  ),
  'info' => array(
    'nid' => array(
      'sortable' => 0,
      'separator' => '',
    ),
    'field_pdf_fid' => array(
      'separator' => '',
    ),
    'title' => array(
      'sortable' => 0,
      'separator' => '',
    ),
  ),
  'default' => '-1',
));
$handler = $view->new_display('page', 'Page', 'page_1');
$handler->override_option('path', 'content/printable-maps');
$handler->override_option('menu', array(
  'type' => 'normal',
  'title' => 'Printable Maps',
  'description' => 'PDF versions suitable for printing.',
  'weight' => '10',
  'name' => 'primary-links',
));
$handler->override_option('tab_options', array(
  'type' => 'none',
  'title' => '',
  'description' => '',
  'weight' => 0,
  'name' => 'navigation',
));
