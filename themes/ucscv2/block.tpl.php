<!-- Begin block -->
<div class="<?php print 'inner block block-' . $block->module; ?>" id="block-<?php print $block->module . '-' . $block->delta; ?>">
<?php

if ($block->subject != "") {
  if ((substr($block->region, 0, 13) == "three_column_") or (substr($block->region, 0, 12) == "four_column_")) {
    if (strpos($block->subject, " ") > 0) {
      preg_match(
        "/^(.*) (.*)$/",
        $block->subject,
        $matches
      );

      $block_title =
        $matches[1] .
        " <span>" .
        $matches[2] .
        "</span>";
    } else {
      $block_title = $block->subject;
    }
  } else {
    $block_title = $block->subject;
  }

  echo
    "<h4 class=\"title\">" .
    $block_title .
    "</h4>\n";
}

?>
	<div class="content">
	<?php print $block->content; ?>
	</div>
</div>
<!-- End block -->
