drupal_add_js(
	'$(document).ready(function () {
	    $("input[type=checkbox][checked]").each( 
		    function() { 
		       alert("alerting you");
		    }
		);
	  }); ' , 'inline')
	
	working code