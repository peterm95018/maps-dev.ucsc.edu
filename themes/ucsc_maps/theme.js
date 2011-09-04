/**
* attach Jquery Dropdown functionality
* sourced from article at: http://drupalsn.com/learn-drupal/drupal-tutorials/fancy-select-menus-drupal-using-jquery

Drupal.behaviors.themeAttachJQDropDown = function(context) {
  //$('select').each(function () {
  $('.view-id-campus_buildings_dropdown li').each(function () {
    $(this).addClass('jquery_dropdown jquery_dropdown_jump');
  });
}
*/

/**
 * Search Form
 */
// Prefill the search box with Search... text.
$(document).ready(function(){
  $('#search-block-form input:text').autofill({
    value: "Search..."
  });
});

