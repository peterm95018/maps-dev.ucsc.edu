<?php
// $Id: page.tpl.php,v 1.4 2010/07/02 23:14:21 eternalistic Exp $
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php print $language->language; ?>" xml:lang="<?php print $language->language; ?>">

<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $setting_styles; ?>
  <!--[if IE 8]>
  <?php print $ie8_styles; ?>
  <![endif]-->
  <!--[if IE 7]>
  <?php print $ie7_styles; ?>
  <![endif]-->
  <!--[if lte IE 6]>
  <?php print $ie6_styles; ?>
  <![endif]-->
  <?php if ($local_styles): ?>
  <?php print $local_styles; ?>
  <?php endif; ?>
  <?php print $scripts; ?>
</head>

<body id="<?php print $body_id; ?>" class="<?php print $body_classes; ?> <?php print $skinr; ?>">
  <div id="page" class="page">
    <div id="page-inner" class="page-inner">
      <div id="skip">
        <a href="#main-content-area"><?php print t('Skip to Main Content Area'); ?></a>
      </div>

      <!-- header-top row: width = grid_width -->
      <?php print theme('grid_row', $header_top, 'header-top', 'full-width', $grid_width); ?>

      <!-- header-group row: width = grid_width -->
      <div id="header-group-wrapper" class="header-group-wrapper <?php if ($preface_top) { echo "with-preface-top"; } else { echo "without-preface-top"; }?> full-width">
        <div id="header-group" class="header-group row <?php print $grid_width; ?>">
          <div id="header-group-inner" class="header-group-inner inner clearfix">
            <?php print theme('grid_block', $primary_links_tree, 'primary-menu'); ?>
            <?php if ($logo || $site_name || $site_slogan || $header): ?>
            <div id="header-site-info" class="header-site-info <?php if ($preface_top) { echo "with-preface-top"; } else { echo "without-preface-top"; }?> block">
              <div id="header-site-info-inner" class="header-site-info-inner inner clearfix">
                <?php print theme('grid_block', $search_box, 'search-box'); ?>
                <?php if ($logo): ?>
                <div id="logo">
                  <a href="<?php print check_url($front_page); ?>" title="<?php print t('Home'); ?>"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a>
                </div>
                <?php endif; ?>
                <?php if ($site_name || $site_slogan): ?>
                <div id="site-name-wrapper" class="clearfix">
                  <?php if ($site_name): ?>
                  <span id="site-name"<?php if ($site_slogan): ?> class="with-slogan"<?php endif; ?>><a href="<?php print check_url($front_page); ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a></span>
                  <?php endif; ?>
                  <?php if ($site_slogan): ?>
                  <span id="slogan"><?php print $site_slogan; ?></span>
                  <?php endif; ?>
                </div><!-- /site-name-wrapper -->
                <?php endif; ?>
                <?php if ($header): ?>
                <div id="header-wrapper" class="header-wrapper">
                  <?php print $header; ?>
                </div>
                <?php endif; ?>
              </div><!-- /header-site-info-inner -->
            </div><!-- /header-site-info -->
            <?php endif; ?>
          </div><!-- /header-group-inner -->

          <!-- preface-top row: width = grid_block -->
          <?php print theme('grid_block', $preface_top, 'preface-top'); ?>
          <?php print theme('grid_block', theme('links', $secondary_links), 'secondary-menu'); ?>

        </div><!-- /header-group -->
      </div><!-- /header-group-wrapper -->

      <!-- main row: width = grid_width -->
      <div id="main-wrapper" class="main-wrapper full-width">
        <div id="main" class="main row <?php print $grid_width; ?>">
          <div id="main-inner" class="main-inner inner clearfix">
            <?php print theme('grid_row', $sidebar_first, 'sidebar-first', 'nested', $sidebar_first_width); ?>

            <!-- main group: width = grid_width - sidebar_first_width -->
            <div id="main-group" class="main-group row nested <?php print $main_group_width; ?>">
              <div id="main-group-inner" class="main-group-inner inner clearfix">
                <?php print theme('grid_row', $preface_bottom, 'preface-bottom', 'nested'); ?>

                <div id="main-content" class="main-content row nested">
                  <div id="main-content-inner" class="main-content-inner inner clearfix">
                    <!-- content group: width = grid_width - (sidebar_first_width + sidebar_last_width) -->
                    <div id="content-group" class="content-group row nested <?php print $content_group_width; ?>">
                      <div id="content-group-inner" class="content-group-inner inner clearfix">
                        <?php print theme('grid_block', $breadcrumb, 'breadcrumbs'); ?>
                        <?php print theme('grid_block', $help, 'content-help'); ?>
                        <?php print theme('grid_block', $messages, 'content-messages'); ?>
                        <?php if ($content_top): ?>
                        <div id="content-top-wrapper" class="content-top-wrapper row nested">
                          <div id="content-top-inner" class="content-top-inner inner clearfix">
                            <div id="content-top-inner-inner" class="content-top-inner-inner inner clearfix">
                              <div id="content-top" class="inner clearfix">
                                <?php print $content_top; ?>
                              </div>
                            </div>
                          </div><!-- /content-top-inner -->
                        </div><!-- /content-top -->
                        <?php endif; ?>
                        <div id="content-region" class="content-region row nested">
                          <div id="content-region-inner" class="content-region-inner inner clearfix">
                            <a name="main-content-area" id="main-content-area"></a>
                            <?php print theme('grid_block', $tabs, 'content-tabs'); ?>
                            <div id="content-inner" class="content-inner block">
                              <div id="content-inner-inner" class="content-inner-inner inner clearfix">
                                <?php if ($title): ?>
                                <h1 class="title"><?php print $title; ?></h1>
                                <?php endif; ?>
                              <!-- PSM embeddeding detailed map view -->
			      <div class="destination-maps">
                              <?php print views_embed_view('map_node_destination_maps', 'default', arg(1)); ?>
                              </div>
                                <?php if ($content): ?>
                                <div id="content-content" class="content-content">
                                  <?php print $content; ?>
                                  <?php print $feed_icons; ?>
                                </div><!-- /content-content -->
                                <?php endif; ?>
                              </div><!-- /content-inner-inner -->
                            </div><!-- /content-inner -->
                          </div><!-- /content-region-inner -->
                        </div><!-- /content-region -->

                        <?php print theme('grid_row', $content_bottom, 'content-bottom', 'nested'); ?>
                      </div><!-- /content-group-inner -->
                    </div><!-- /content-group -->

                    <?php print theme('grid_row', $sidebar_last, 'sidebar-last', 'nested', $sidebar_last_width); ?>
                  </div><!-- /main-content-inner -->
                </div><!-- /main-content -->

                <?php print theme('grid_row', $postscript_top, 'postscript-top', 'nested'); ?>
	      </div><!-- /main-group-inner -->
            </div><!-- /main-group -->
          </div><!-- /main-inner -->
        </div><!-- /main -->
      </div><!-- /main-wrapper -->

      <!-- postscript-bottom row: width = grid_width -->
      <?php print theme('grid_row', $postscript_bottom, 'postscript-bottom', 'full-width', $grid_width); ?>

      <!-- footer row: width = grid_width -->
      <?php print theme('grid_row', $footer, 'footer', 'full-width', $grid_width); ?>

      <!-- footer-message row: width = grid_width -->
      <div id="footer-message-wrapper" class="footer-message-wrapper full-width">
        <div id="footer-message" class="footer-message row <?php print $grid_width; ?>">
          <div id="footer-message-inner" class="footer-message-inner inner clearfix">
            <?php print theme('grid_block', $footer_message, 'footer-message-text'); ?>
          </div><!-- /footer-message-inner -->
        </div><!-- /footer-message -->
      </div><!-- /footer-message-wrapper -->
    </div><!-- /page-inner -->
  </div><!-- /page -->
  <?php print $closure; ?>
</body>
</html>
