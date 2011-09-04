<?php

function ucscv2_settings($saved_settings) {
  $defaults = array(
    "ucscv2_frontpage" => 0,
    "ucscv2_google_cse" => "011202561819012672529:sdiwpevx7ba",
  );

  // Merge the saved variables and their default values
  $settings = array_merge($defaults, $saved_settings);

  // Create the form widgets using Forms API
  $form["ucscv2_frontpage"] = array(
    "#type" => "checkbox",
    "#title" => t("Use Division/Department Front Page"),
    "#default_value" => $settings["ucscv2_frontpage"],
  );

  $form["ucscv2_google_cse"] = array(
    "#type" => "textfield",
    "#title" => t("Google Custom Search Engine ID"),
    "#default_value" => $settings["ucscv2_google_cse"],
  );

  $form["ucscv2_google_url"] = array(
    "#type" => "textfield",
    "#title" => t("Google Custom Search Engine URL"),
    "#default_value" => $settings["ucscv2_google_url"],
  );

  $form["ucscv2_css_url"] = array(
    "#type" => "textfield",
    "#title" => t("Supplementary CSS URL"),
    "#default_value" => $settings["ucscv2_css_url"],
  );

  // Return the additional form widgets
  return $form;
}

?>
