<?php

if (trim($content) != "") {
  echo "<div class=\"node";

  if ($sticky) {
    echo " sticky";
  }

  if (!$status) {
    print " node-unpublished";
  }
  echo "\">\n";

  echo $content;

  echo "</div>\n";
}

?>
