// Define a global object to hold our global variables.
var CUMap = {};

function loadCustomOverlay() {
	// Allow the map to show a custom overlay. Look for a certain object that may be present in a page calling the main map file via an iframe. If found, process that object and add it to the map by adding the overlay object's icon and point array to those already known to the map page.
	if (typeof(customOverlay) != "undefined") {
		// Add overlay checkbox and label to the overlays area.
		var coCheckbox = $("<input type='checkbox' >").attr("id", "Custom").attr("class", "overlayBox").attr("checked", "checked").click(function(event) {toggleOverlay($(this).attr("checked"), this.id);});
		var coLabel = $("<label>").html(customOverlay.title.substring(0, 25)).prepend(coCheckbox);
		var coItem = $("<li>").append(coLabel)
		$("#overlays>ul").prepend(coItem);
		// Define overlay's icon.
		// Add overlay's points to the map.
		var iconStr = "Custom,32,32";
		var temp = iconStr.split(',');
		var name = temp[0];
		var width = Math.round(temp[1]*.75);
		var height = Math.round(temp[2]*.75);
		icons[name] = new GIcon();
		icons[name].image = customOverlay.iconURL;
		icons[name].shadow = null;
		icons[name].iconSize = new GSize(width, height);
		icons[name].iconAnchor = new GPoint(Math.round(width/2), Math.round(height/2));
		
		var coPoints = customOverlay.points;
		for (i in coPoints) {
			if ((typeof coPoints[i].title == "undefined") || (typeof coPoints[i].lat == "undefined") || (typeof coPoints[i].lng == "undefined")) {
				alert("Custom point " + i + " is missing title and/or lat and/or lng.");
			}
			else {
				overlays.push(coPoints[i].title+":"+coPoints[i].lng+","+coPoints[i].lat+",0:Custom");
			}
		}
		toggleOverlay(true, "Custom");
	}
}


//When KML files are updated they are given new names in order to avoid problems with caching.
CUMap.RedRoverFileName = "Red_Rover20090422.kml";
CUMap.CampusPolygonsFileName = "CampusPolygons20091017.kml";

jQuery(document).ready(function($) {
		loadMap();
		
		// Bind actions to page elements and set some defaults.
		$.ajaxSetup({
				timeout: 5000,
				type: "GET",
				dataType: "html",
				url: "search-maps.cfm",
				complete: function(xhr, status) {
					//alert(xhr.responseText);
				}, 
				error: function(xhr) {
					alert("Ajax error; server response: " + xhr.status + ":" + xhr.statusText);
				}
		});
		
		$(".overlayBox").click(function(event) {
				toggleOverlay($(this).attr("checked"), this.id);
		});
		$(".overlayBox2").click(function(event) {
				toggleOverlay2($(this).attr("checked"), this.id);
		});
		$(".overlayBox3").click(function(event) {
				toggleOverlay3($(this).attr("checked"), this.id);
		});
		
		$("#feedback").click(function(event) {
				userSuggest();
		});
		
		$("#searchMapsButton").click(function(event) {
				searchMaps($("#searchMaps").val(), 1);
		});
		
		$("#resetLocationList").click(function(event) {
				resetLocationList();
		});
		
		$("#makeURLlink").click(function(event) {
				makeURL();
		});
		
		$(".locItem").livequery("click", function(event) {
				var index = parseInt(this.id.replace("locItem_", ""), 10);
				centerMap(index, 0);
		});
		
		// Clear overlay boxes on page load to ensure none checked if page is reloaded because that will cause errors if they are loaded checked and then unchecked by a user.
		$(".overlayBox").attr("checked", false);
		$(".overlayBox2").attr("checked", false);
		$(".overlayBox3").attr("checked", false);
		
		// If the location box has an address (from an incoming URL) perform a search for it.
		if ($("#searchMaps").val() != "") {
			searchMaps($("#searchMaps").val());
		}
		
		loadCustomOverlay();
});


function generateLocationList(searchTerm) {
	// Search database of Cornell units and show the buildings in which they're located.
	$.ajax({
			data: {action:"list", searchTerm:searchTerm},
			success: function(data) {
				//alert(data);
				searchResults = data.replace(/^\s+/g, "");
			}
	});
}

function generateBubbleText(location) {
	// Search database of Cornell units and show them in the location's info bubble.
	$.ajax({
			data: {action:"bubble", location:location},
			success: function(data) {
				//alert(data);
				$("#bubbleTextContents").html(data.replace(/^\s+/g, ""));
			}
	});
}

function processZoomChange(oldzoom, zoom) {
	// Toggle overlays off if zooming too far out. Toggle them back on if zooming back in.
	// We toggle the display of the overlays checkboxes and store a list of those that are active for later re-activation if the user zooms back in.
	if ((zoom <= 13) && (oldzoom >13)) {
		//alert('Turning off overays.');
		gCU_overlays = [];
		gCU_overlays = getActiveOverlays().split(",");
		toggleOverlays(false);
		$("#overlays input").hide();
		$("#overlays label").hide();
		$("#overlaysZoomIn").hide();
		$("#overlaysZoomOut").show();
	}
	if ((zoom > 13) && (oldzoom <=13)) {
		//alert('Turning on overays.');
		$("#overlays").show();
		// Re-activate any overlays that were active before zooming out.
		$("#overlays input").show();
		$("#overlays label").show();
		$("#overlaysZoomOut").hide();
		$("#overlaysZoomIn").show();
		toggleOverlays(true);
	}
	// Toggle building outlines off if zooming too far out. Toggle them back on if zooming back in.
	if ((zoom <= 13) && (oldzoom >13)) {
		//alert('Turning off building outlines.');
		map.removeOverlay(buildingShapes);
	}
	if ((zoom > 13) && (oldzoom <=13)) {
		//alert('Turning on building outlines.');
		map.addOverlay(buildingShapes);
	}
}

function processMapTypeChange() {
	// Hide building shapes overlay while in satellite or hybrid view, turn it back on if in map or terrain.
	//alert(map.getCurrentMapType().getName());
	var mapType = map.getCurrentMapType().getName();
	if ((mapType == "Satellite") || (mapType == "Hybrid")) {
		map.removeOverlay(buildingShapes);
	}
	else {
		map.addOverlay(buildingShapes);
	}
}

function getActiveOverlays() {
	// Detect which overlays are active and return a comma-separated list of them.
	var activeOverlays = "";
	var checkboxes = [];
	// Determine all active overlays.
	$("[class^=overlayBox]:checked").each(function() {
			activeOverlays += this.id + ",";
	});
	activeOverlays = activeOverlays.replace(/,$/, "");
	return activeOverlays;
}

function makeURL() {
	// Generate a link for the current page, including named location and activated overlays.
	var URL = "http://www.cornell.edu/maps/interactive.cfm?loc=" + gCU_loc;
	URL += "&zoom=" + map.getZoom();
	var overlays = getActiveOverlays();
	if (overlays != "") {
		URL += "&overlays=" + overlays;
	}
	URL = URL.replace(/ /g, "%20");
	alert('Copy and paste this link to center, zoom, and overlay the map as shown below:\n\n' + URL);
}

function toggleOverlays(display) {
	// If an incoming parameter requests overlays to default as visible, activate them.
	// Also use this to show or hide overlays when the zoom level changes.
	$("[class^=overlayBox]").each(function() {
		for (var i=0; i<gCU_overlays.length; i++) {
			if (gCU_overlays[i] == this.id) {
				$(this).attr("checked", display);
				if ($(this).hasClass("overlayBox")) {
					toggleOverlay(display, this.id);
				}
				if ($(this).hasClass("overlayBox2")) {
					toggleOverlay2(display, this.id);
				}
				if ($(this).hasClass("overlayBox3")) {
					toggleOverlay3(display, this.id);
				}
			}
		}
	});
}

function resetLocationList() {
	// Reset the location list to be the original default list and hide its reset link/button.
	$("#locationListItems").html("");
	var newListItems = $("<ul>").attr("class", "scrollingList");
	var mapinfo = [];
	for (var i = 0; i<places.length; i++) {
		mapinfo = places[i].split(':');
		var locLink = $("<a>").attr("href", "#").attr("class", "locItem").attr("id", "locItem_" + i).html(mapinfo[0]);
		var locItem = $("<li>").append(locLink);
		$(newListItems).append(locItem);
	}
	$("#locationListItems").html(newListItems);
	$("#resetLocationList").hide();
	$("#makeURL").hide();
}

function userSuggest() {
	// Open a window and allow users to suggest new places to add to the map.
	var formStr = "<html><head><title>Suggest a Cornell map addition</title></head><body>";
	formStr = formStr + '<p><strong>Suggest a Cornell map addition</strong></p>';
	formStr = formStr + '<form name="mapsuggestform" action="emailsuggestion.cfm" method="post">';
	formStr = formStr + '<label for="fromname">Your Name (optional): </label><input type="text" name="fromname" id="fromname" value=""/><br /><br />';
	formStr = formStr + '<label for="fromaddr">Your Email (optional): </label><input type="text" name="fromaddr" id="fromaddr" value=""/><br /><br />';
	formStr = formStr + '<label for="additionname">Name of addition: </label><input type="text" name="additionname" id="additionname" value=""/><br /><br />';
	formStr = formStr + '<label for="location">Location: </label><br /><textarea name="location" id="location" rows="12" cols="40"></textarea><br /><p>Enter a street address, a latitude/longitude datum, or a description that will help us place the addition on the map, or associate with a location we already list.</p>';
	formStr = formStr + '<br /><br />';
	formStr = formStr + '<input type="submit" value="Send"/>';
	formStr = formStr + '<br /><br /><br /><br />';
	formStr = formStr + '</form></body></html>';
	var mailWin = window.open("", "myWin", "width=450,height=600,scrollbar=auto");
	mailWin.document.write(formStr);
	mailWin.focus();
}

function getParameter(parameterName) {
	var queryString = window.location.search.substring(1).toLowerCase();
	//alert(queryString);
	//if (queryString.length==0) {return "null";}
	var parameters = [];
	parameters = queryString.split('&');
	for(var i = 0; i < parameters.length; i++) {
		//alert(parameters[i]);
		//alert(parameters[i].indexOf(parameterName));
		if (parameters[i].indexOf(parameterName.toLowerCase()) >= 0) {
			//alert(parameters[i]);
			var parameterValue = [];
			parameterValue = parameters[i].split('=');
			return parameterValue[1];
		}
	}
	return "null";
}

parkingPointClosest = null;
parkingMarkerClosest = null;
infoPointClosest = null;
infoMarkerClosest = null;
closestParking1 = null;
closestParking0 = null;
closestInfo1 = null;
closestInfo0 = null;
function findClosestParking(locationName, locCoord1, locCoord2) {
	// Given coords, determine whether on campus, and if so find and display closest public parking location from our list of places.
	// Is location on campus (off-campus locations probably have closer parking that we don't track.
	var locPoint = new GLatLng(parseFloat(locCoord1), parseFloat(locCoord2));
	var closestParkingDistance = 999999;
	var closestInfoDistance = 999999;
	var closestParking = 0;
	var closestInfo = 0;
	// Remove old marker if one is present.
	if (parkingPointClosest != null) {
		map.removeOverlay(parkingMarkerClosest);
	}
	if (infoPointClosest != null) {
		map.removeOverlay(infoMarkerClosest);
	}
	destinationOnCampus = false;
	if (campusPoly.Contains(locPoint)) {
		destinationOnCampus = true;
		var mapinfo = [];
		var coords = [];
		var re = new RegExp(/Metered Parking/);
		// Find closest metered parking.
		for (var i=0; i<places.length; i++) {
			if (places[i].match(re)) {
				mapinfo = places[i].split(':');
				coords = mapinfo[1].split(',');
				var tempPt = new GLatLng(coords[1], coords[0]);
				var distance = tempPt.distanceFrom(locPoint);
				if (distance < closestParkingDistance) {
					closestParking1 = coords[1];
					closestParking0 = coords[0];
					closestParkingDistance = distance;
				}
			}
		}
		// Show closest metered parking point on the map, if the location is not an info booth or parking lot.
		if ((locationName.indexOf('Info Booth') == -1) && (locationName.indexOf('Parking') == -1)) {
			parkingPointClosest = new GLatLng(closestParking1, closestParking0);
			parkingMarkerClosest = new GMarker(parkingPointClosest,{title:mapinfo[0],icon:icons["Parking"]});
			map.addOverlay(parkingMarkerClosest);
		}
		var re = new RegExp(/Info Booth/);
		// Find closest info booth.
		for (var i=0; i<overlays.length; i++) {
			if (overlays[i].match(re)) {
				mapinfo = overlays[i].split(':');
				coords = mapinfo[1].split(',');
				var tempPt = new GLatLng(coords[1], coords[0]);
				var distance = tempPt.distanceFrom(locPoint);
				if (distance < closestInfoDistance) {
					closestInfo1 = coords[1];
					closestInfo0 = coords[0];
					closestInfoDistance = distance;
				}
			}
		}
		// Show closest info booth on the map, if the location is not an info booth or parking lot.
		if ((locationName.indexOf('Info Booth') == -1) && (locationName.indexOf('Parking') == -1)) {
			infoPointClosest = new GLatLng(closestInfo1, closestInfo0);
			infoMarkerClosest = new GMarker(infoPointClosest,{title:mapinfo[0],icon:icons["Info"]});
			map.addOverlay(infoMarkerClosest);
		}
	}
}

point = null;
marker = null;
function centerMap(loc, delay) {
	if (GBrowserIsCompatible()) {
		
		// The loc variable defaults to an array index, but it may be a string containing a room number at the beginning, such as 201 McGraw Hall. If it's a string, we need to determine the array index, checking both with and without a leading number, because the leading number might be a street address used in the array, such as 312 College Ave.
		// Also, try to match the name of a building without leading name or name's initials if possible; e.g., Frank H. T . Rhodes Hall should be the same as Rhodes Hall.
		
		// We accept a delay value in order to handle different calling conditions. We need to have a delay of some amount in order to ensure a smooth AJAX call/return, but the amount needed depends on whether we're receiving a polygon click or a location-list link click.
		
		// If we have a string, try to find an array item that matches it, and then get its index.
		if (typeof(loc) == "string") {
			// Strip off common terms from the search term, such as road, street, and ave.
			loc = loc.replace(/(str?e?e?t?\.?|ro?a?d\.?|ave?n?u?e?\.?|way|ce?n?te?r\.?)/gi, "");
			var loc1 = loc;
			var loc2 = loc;
			loc2 = loc2.replace(/^P?\.? ?O?\.? ?Box \d+, /i, ""); // Remove PO box number if present.
			loc2 = loc2.replace(/^Main Floor, /i, ""); // Remove floor reference if present.
			loc2 = loc2.replace(/^Main Office, /i, ""); // Remove office reference if present.
			loc2 = loc2.replace(/^[A-Z]?\d?\-?\d+[A-Z]? /i, ""); // Remove office numbers, which can vary a lot.
			var temp = [];
			for (var i=0; i<places.length; i++) {
				temp = places[i].split(':');
				var tempName = temp[0];
				if ((tempName == loc1) || (tempName == loc2) || (tempName.indexOf(loc1) > -1) || (tempName.indexOf(loc2) > -1) || (loc1.indexOf(tempName) > -1) ||(loc2.indexOf(tempName) > -1) || places[i].indexOf(loc) > -1) {
					loc = i;
					break;
				}
			}
		}
		if (typeof(loc) == "string") {
			alert('Could not find places index for ' + loc + '\n\nloc1: ' + loc1 + '\n\nloc2: ' + loc2);
		}
		else {
			// Pan to and then center the map on a specific location.
			var mapinfo = [];
			mapinfo = places[loc].split(':');
			var locationName = mapinfo[0];
			
			// Activate widget for makings a URL once a location has been selected.
			gCU_loc = locationName; // Set global variable with location name, for use in generating a link to the current map.
			$("#makeURL").show();	
	
			// Dynamically fetch content for units in this location via AJAX.
			$("#bubbleTextContents").html("");
			generateBubbleText(mapinfo[0]);

			var coords = [];
			coords = mapinfo[1].split(',');
			var center = new GLatLng(coords[1], coords[0]);
			map.panTo(center, 500);
			
			// Determine distance between the specific point and Day Hall. If greater than about 10 miles, set a larger zoom for better context.
			var DayHall = new GLatLng(parseFloat(42.4457), parseFloat(-76.4814));
			var distance = center.distanceFrom(DayHall);
			
			// Set the zoom level default but adjust if site is far away from campus, unless a param overrides.
			var zoom = 16;
			if (gCU_zoom > 0) {
				zoom = gCU_zoom;
			}
			if (distance > 15000) {
				zoom = 10;
				if (gCU_zoom > 0) {
					zoom = gCU_zoom;
				}
			}
			setTimeout('map.setZoom(' + parseInt(zoom) + ')', 1000);
			
			// Add a point marker for the location.
			if (point != null) {
				map.removeOverlay(marker);
			}
			point = new GLatLng(coords[1],coords[0]);
			marker = new GMarker(point,{title:mapinfo[0]});
			map.addOverlay(marker);
			findClosestParking(mapinfo[0], coords[1] ,coords[0]);
	
			// We need a delay here while waiting for AJAX to complete its fetch.
			// There should be enough going on with the pan and zoom that the user experiences no apparent delay.
			delay = delay + parseInt(2000);
			setTimeout('addBubbleText("'+locationName+'",'+coords[1]+','+coords[0]+')', delay);
			delay = delay + parseInt(500);
			setTimeout('marker.openInfoWindowTabsHtml(infoTabs)', delay);
//			delay = delay + parseInt(500);
//			setTimeout('updateTab()', delay);
		}
	}
}

function updateTab(){
	// Update the tab so that it redraws to fit its content. This addresses a problem in IE.
	map.updateCurrentTab(function(currentTab){currentTab.contentElem.innerHTML = "<div style='height:400px; width:300px; border:1px solid red;'>Test test test</div>";})
};

CUMap.bubbleDir = "enter starting address";
CUMap.bubble2Dir = "enter destination address";
function addBubbleText(locationName, parkingLat, parkingLng) {
	// Create the text that will appear in the info bubble for the location's map marker.
	// The reference to driving directions varies according to the site, particularly with respect to providing them to the nearest parking area or to the location itself.
	
	// Create tab option for directions to the location.
	toDir = "<div class='infowindow'><p><strong>" + locationName + "</strong><br />";
	toDir += $("#bubbleTextDirections").html();
	toDir += "</p>";
	toDir += '<form action="http://maps.google.com/maps" method="get" name="bubbleDir" target="_blank" onsubmit="CUMap.bubbleDir = document.bubbleDir.saddr.value">';
	toDir += '<p>Show <select name="dirflg"><option value="d">driving</option><option value="b">biking</option><option value="w">walking</option></select> directions to ';
	// Show choice of driving directions to or from the location, the nearest metered parking, or the nearest info booth if the location is on campus and not a parking space or info booth, else show route to the location (parking and info booths are to themselves).
	toOptions = "";
	if ((destinationOnCampus) && (locationName.indexOf('Info Booth') == -1) && (locationName.indexOf('Parking') == -1)) {
		toOptions += '<p id="toOptions"><input type="radio" name="dir" value="loc" onfocus="document.bubbleDir.daddr.value=\'' + parkingLat + ',' + parkingLng + '\'" checked="checked"/>this exact location <br />';
		toOptions += '<input type="radio" name="dir" value="park" onfocus="document.bubbleDir.daddr.value=\'' + closestParking1 + ',' + closestParking0 + '\'"/>closest metered parking <br />';
		toOptions += '<input type="radio" name="dir" value="info" onfocus="document.bubbleDir.daddr.value=\'' + closestInfo1 + ',' + closestInfo0 + '\'"/>closest information booth </p>';
		toDir += toOptions;
	}
	else {
		toDir += " here from";
	}
	toDir += '<p><input type="text" name="saddr" id="saddr" value="' + CUMap.bubbleDir + '" size="40" onfocus="JavaScript:if (this.value.indexOf(\'enter\') == 0) {this.value=\'\'}" /></p>';
	toDir += '<input type="hidden" name="daddr" id="daddr" value="' + parkingLat + ',' + parkingLng + '" />';
	toDir += '<input type="submit" value="View directions in new window" /></form></div>';
	
	// Create tab option for directions from the location.
	fromDir = "<div class='infowindow'><p><strong>" + locationName + "</strong><br />";
	fromDir += $("#bubbleTextDirections").html();
	fromDir += "</p>";
	fromDir += '<form action="http://maps.google.com/maps" method="get" name="bubbleDir2" target="_blank" onsubmit="CUMap.bubble2Dir = document.bubbleDir2.daddr.value">';
	fromDir += '<p>Show <select name="dirflg"><option value="d">driving</option><option value="b">biking</option><option value="w">walking</option></select> directions from here to';
	fromDir += '<p><input type="text" name="daddr" id="daddr" value="' + CUMap.bubble2Dir + '" size="40" onfocus="JavaScript:if (this.value.indexOf(\'enter\') == 0) {this.value=\'\'}" /></p>'
	fromDir += '<input type="hidden" name="saddr" id="saddr" value="' + parkingLat + ',' + parkingLng + '" />';
	fromDir += '<input type="submit" value="View directions in new window" /></form></div>';
	
	infoTabs = [];
	//alert(boxtext);
	infoTabs.push(new GInfoWindowTab("To Here", toDir));
	infoTabs.push(new GInfoWindowTab("From Here", fromDir));
	
	var contentsTab = $("#bubbleTextContents").html();
	contentsTab = "<div class='infowindow'>" + contentsTab + "</div>";
	if (contentsTab.indexOf("What's here") > -1) {
		//alert(contentsTab);
		infoTabs.push(new GInfoWindowTab("Contents", contentsTab));
	}
	
	phototext = "<div class='infowindow'>";
	phototext += "<img src=\"http://www.cornell.edu/maps/insignia.jpg\" width=\"200\" height=\"200\" alt=\"Cornell University insignia\"/>";
	phototext += "</div>";
	//alert(phototext);
	infoTabs.push(new GInfoWindowTab("Photo", phototext));

	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowTabsHtml(infoTabs);
	});
}


function loadIcons() {
	// Load different icons for various features.
	var iconData = [];
	iconData[0] = "Parking,32,32";
	iconData[1] = "Dining,32,32";
	iconData[2] = "Cafe,32,32";
	iconData[3] = "Housing,32,32";
	iconData[4] = "Info,32,32";
	iconData[5] = "Greek,34,34";
	iconData[6] = "TCAT,32,32";
	iconData[7] = "Library,32,32";
	iconData[8] = "Tour,32,32";
	iconData[9] = "Blue,32,32";
	iconData[10] = "Lactation,32,32";
	iconData[11] = "Diaper,32,32";
	iconData[12] = "Carshare,30,29";
	iconData[13] = "Bike,32,32";
	iconData[14] = "Access,32,32";
	iconData[15] = "Invis,32,32";
	iconData[16] = "EHS,32,32";
	iconData[17] = "Campus-to-Campus,32,32";
	
	icons = [];
	var temp = [];
	for (var i=0; i<iconData.length; i++) {
		temp = iconData[i].split(',');
		var name = temp[0];
		var width = Math.round(temp[1]*.75);
		var height = Math.round(temp[2]*.75);
		var filename = name.toLowerCase();
		filename = filename.replace(/ /g, "");
		icons[name] = new GIcon();
		icons[name].image = "http://www.cornell.edu/maps/icons/" + filename + ".png";
		icons[name].shadow = null;
		icons[name].iconSize = new GSize(width, height);
		icons[name].iconAnchor = new GPoint(Math.round(width/2), Math.round(height/2));
	}
}

function toggleOverlay3(display, overlay) {
	//alert(overlay);
	// Swap the main set of building overlays and/or place it on top of the default one.
	if (overlay == "RedRover") {
		if (display) {
			// This filename has to be updated when changed, to force a new cache on Google's end.
			redroverShapes = new GGeoXml("http://www.cornell.edu/maps/" + CUMap.RedRoverFileName); 
			map.addOverlay(redroverShapes);
		}
		else {
			map.removeOverlay(redroverShapes);
		}
	}
}

paths = [];
function toggleOverlay2(display, pathType) {
	//alert(pathType);
	// Show or hide a specific set of paths.
	var mapinfo = [];
	var points = [];
	var coords = [];
	var vertices = [];
	var colors = [];
	colors[0] = "#660099"; // Purple
	colors[1] = "#00FF00"; // Green
	colors[2] = "#0000FF"; // Blue
	colors[3] = "#FF00FF"; // Magenta
	//colors[4] = "#FFFF00"; // Yellow
	colors[4] = "#00FFFF"; // Cyan
	var colorCount = 0;
	
	var re = new RegExp(pathType);
	for (var p=0; p<overlays.length; p++) {
		if (overlays[p].match(re)) {
			vertices = [];
			mapinfo = overlays[p].split(':');
			points = mapinfo[1].split(' ');
			for (var i=0; i<points.length; i++) {
				coords = points[i].split(',');
				if ((typeof(coords[1]) != "undefined") && (typeof(coords[0]) != "undefined")) {
					var newpoint = new GLatLng(coords[1], coords[0]);
					vertices.push(newpoint);
				}
			}
			if (display) {
				var color = colors[colorCount];
				var thickness = 2;
				if (pathType == "Closed Roads") {
					color = "#888888";
					thickness = 3;
				}
				paths[p] = new GPolyline(vertices, color, thickness, 1);
				map.addOverlay(paths[p]);
				//alert(colors[colorCount]);
				colorCount++;
			}
			else {
				map.removeOverlay(paths[p]);
			}
		}
	}
}

markers = [];
markersOverlay = [];
markersTour = [];
function toggleOverlay(display, placeType) {
	// Show or hide a specific set of points.
	var mapinfo = [];
	var coords = [];
	var ID = "";
	var url = "";
	
	// When activating the clickable icons, deactive clickable locations so they don't interfere with the icons; reactivate them if hiding the icons.
	var anyClickablesVisible = false;
	if (($("#Dining").attr("checked")) || ($("#Cafe").attr("checked")) || ($("#Tour").attr("checked"))) {
		anyClickablesVisible = true;
	}
	if ((display) && (anyClickablesVisible)) {
		removePlaces();
	}
	if ((!display) && (!anyClickablesVisible)) {
		addPlaces();
	}
	
	if (placeType == "TCAT") {
		for (var i=0; i<TCATStops.length; i++) {
			ID = placeType + i;
			if (display) {
				mapinfo = TCATStops[i].split(':');
				coords = mapinfo[1].split(',');
				var point = new GLatLng(coords[1], coords[0]);
				markers[ID] = new GMarker(point,{title:mapinfo[0],icon:icons[placeType]});
				map.addOverlay(markers[ID]);
			}
			else {
				map.removeOverlay(markers[ID]);
			}
		}
	}
	else if (placeType == "Tour") {
		for (var i=0; i<TourPoints.length; i++) {
			mapinfo = TourPoints[i].split(':');
			ID = parseInt(mapinfo[3], 10);
			coords = mapinfo[1].split(',');
			if (display) {
				var point = new GLatLng(coords[1], coords[0]);
				markersTour[ID] = new GMarker(point,{title:mapinfo[0],icon:icons[placeType]});
				// Add info window with tiny pano.
				// See http://code.google.com/apis/maps/documentation/events.html
				panoClick(markersTour[ID], mapinfo[0], ID, point);
				map.addOverlay(markersTour[ID]);
			}
			else {
				map.removeOverlay(markersTour[ID]);
			}
		}
	}
	else {
		//var re = new RegExp(placeType);
		for (var i=0; i<places.length; i++) {
			ID = placeType + i;
			if (places[i].indexOf(placeType) > -1) {
				if (display) {
					mapinfo = places[i].split(':');
					coords = mapinfo[1].split(',');
					var comments = mapinfo[2];
					var point = new GLatLng(coords[1], coords[0]);
					markers[ID] = new GMarker(point,{title:mapinfo[0],icon:icons[placeType]});
					// Make eatery icons clickable to show location details from external web site.
					if ((placeType == "Dining") || (placeType == "Cafe")) {
						var re = (placeType == "Dining") ? /Dining \(([^\(]*)\)/ : /Cafe \(([^\(]*)\)/;
						//alert(comments);
						var match = re.exec(comments);
						if (match != null) {
							if (match.length > 0) {
								var pagename = match[1];
								url = "http://" + pagename;
								eateryClick(markers[ID], url);
							}
						}
						else {
							eateryClick(markers[ID], "n/a");
						}
					}
					map.addOverlay(markers[ID]);
				}
				else {
					map.removeOverlay(markers[ID]);
				}
			}
		}
		for (var i=0; i<overlays.length; i++) {
			ID = placeType + i;
			if (overlays[i].indexOf(placeType) > -1) {
				if (display) {
					mapinfo = overlays[i].split(':');
					coords = mapinfo[1].split(',');
					var point = new GLatLng(coords[1], coords[0]);
					markersOverlay[ID] = new GMarker(point,{title:mapinfo[0],icon:icons[placeType]});
					map.addOverlay(markersOverlay[ID]);
				}
				else {
					map.removeOverlay(markersOverlay[ID]);
				}
			}
		}
	}
}

function eateryClick(marker, url) {
	// Open external dining page for specified location.
	//alert(window.location);
	//alert(url);
	if (url == "n/a") {
		GEvent.addListener(marker, "click", function() {
				alert("A details page for this establishment is not available at the present time.");
		});
	}
	else {
		GEvent.addListener(marker, "click", function() {
				//window.location = url;
				window.open(url);
		});
	}
}

function panoClick(marker, mapinfo, ID, point) {
	// Add the HTML into the pano node's text bubble.
	// See http://code.google.com/apis/maps/documentation/events.html
	var agent = navigator.userAgent.toLowerCase(); 
	if (agent.indexOf("msie") > -1) {
		GEvent.addListener(marker, "click", function() {
				loadPano(ID, "S2")
		});
	}
	else {
		GEvent.addListener(marker, "click", function() {
				var btext = showPano(mapinfo, 'Small', ID);
				map.openInfoWindowHtml(point, btext);
		});
	}
}

function loadPano(ID, size) {
	window.open('/tours/qtvrs.cfm?format=html&id=' + ID + '&size=' + size, 'mywindow', 'width=512,height=384');
}

function showPano(nodeTitle, panoSize, ID) {
	foundQuickTime = true;
	if (getQuicktimeVersion() < 4) {
		foundQuickTime = false;
	}
	//var filename = nodeTitle.toLowerCase();
	var filename = nodeTitle;
	filename = filename.replace(/ - /g, "-");
	filename = filename.replace(/\./g, "");
	filename = filename.replace(/ /g, "_");
	var panoHTML = "";
	panoHTML += '<div style="width: 270px; height: 230px; text-align: center;"><br />';
	if (foundQuickTime) {
		panoHTML += qtvrEmbed[ID];
		panoHTML += '<p><a href="#" onclick="loadPano(\'' + ID + '\', \'L\')">Full-screen, high-res</a> | ';
		panoHTML += '<a href="#" onclick="loadPano(\'' + ID + '\', \'M\')">Medium-size</a></p>';
	}
	else {
		panoHTML += "<p>QuickTime is needed to view this immersive panorama. You may <a href=\"http://www.apple.com/quicktime/download/\">download QuickTime</a> for free from Apple.</p>";
	}
	panoHTML += '</div>';
	// After a tiny delay we move the window by a single pixel: without this, for some reason, Firefox won't display the QTVR, just a black box where it should be.
	setTimeout("window.scrollBy(0, 1)", 1000);
	return panoHTML;
}

gmarkers = [];
function loadMap(locStr) {
	if (GBrowserIsCompatible()) {
		// If a place name was specified (in the URL from the referring page), then show it centered on the map at a close zoom, otherwise default to showing the whole campus zoomed out.
		//var locStr = getParameter('locStr');
		if ((locStr == "") || (locStr == null) || (locStr == "null")) {locStr = "Day Hall";}
		var loc = 0;
		for (var i=0; i<places.length; i++) {
			var locData = places[i].split(':');
			if (locData[0] == locStr) {
				loc = i;
			}
		}
		
		var mapinfo = [];
		mapinfo = places[loc].split(':');
		var coords = [];
		coords = mapinfo[1].split(',');
		
		//map = new GMap2(document.getElementById("map"), {size: new GSize(520, 460)});
		map = new GMap2(document.getElementById("CUmap"));
		var CUzoom = 15;
		if (gCU_zoom > 0) {
			CUzoom = gCU_zoom;
		}
		//map.setCenter(new GLatLng(coords[1],coords[0]), parseInt(CUzoom));
		var centerLat = 42.449191;
		var centerLng = -76.480138;
		if (gCU_centerLatLng != "") {
			var customCenter = gCU_centerLatLng.split(",");
			centerLat = customCenter[0];
			centerLng = customCenter[1];
		}
		map.setCenter(new GLatLng(centerLat, centerLng), parseInt(CUzoom));
		
		map.addControl(new GLargeMapControl());
		map.addControl(new GMapTypeControl());
		map.addControl(new GScaleControl());
		//map.enableScrollWheelZoom();
		map.addMapType(G_PHYSICAL_MAP);
		defineCampus();
		defineBuildingCodes();
		loadIcons();
		GEvent.addListener(map, "zoomend", function(oldzoom, zoom) {processZoomChange(oldzoom, zoom);}); 
		GEvent.addListener(map, "maptypechanged", function() {processMapTypeChange();}); 
		
		// This filename has to be updated when changed, to force a new cache on Google's end.
		buildingShapes = new GGeoXml("http://www.cornell.edu/maps/" + CUMap.CampusPolygonsFileName); 
		map.addOverlay(buildingShapes);
		
		//	for (building in buildings) { 
		//          var polygon = createPoly(building);
		//          map.addOverlay(polygon);
		//	}
		
		addPlaces();
		toggleOverlay2(true, "Closed Roads");
		toggleOverlays(true);
	}
}


function addPlaces() {
	// Add markers for all buildings so that we get rollover labels and can click on them to see their contents.
	for (var i=0; i<places.length; i++) {
		var mapinfo = [];
		var coords = [];
		var mapinfo = places[i].split(':');
		var coords = mapinfo[1].split(',');
		if (mapinfo[0].indexOf("Parking at") == -1) {
			var gpoint = new GLatLng(coords[1], coords[0]);
			gmarkers[i] = new GMarker(gpoint,{title:mapinfo[0],icon:icons['Invis']});
			//GEvent.addListener(gmarkers[i], "click", function() {gmarkers[i].alert(mapinfo[0]);})
			map.addOverlay(gmarkers[i]);
		}
	}
	addListeners();
}

function removePlaces() {
	// Remove markers for all buildings so that they don't interfere with overlay icons.
	for (i in gmarkers) {
		map.removeOverlay(gmarkers[i]);
	}
	removeListeners();
}


function addListeners() {
	// Add click listeners for polygon centers.
	// See http://groups.google.com/group/Google-Maps-API/browse_thread/thread/7613ba04a7b4555d to be sure to include point's details.
	for (var i=0; i<gmarkers.length; i++) {
		var mapinfo = places[i].split(':');
		var coords = mapinfo[1].split(',');
		myAddListener(gmarkers[i], mapinfo[0]);
	}
}

function myAddListener(gmarker, info) {
	// Add an individual polygon's listener.
	//GEvent.addListener(gmarker, "click", function() {alert(info);});
	try {
		GEvent.addListener(gmarker, "click", function() {searchMaps(info, 0);});
	}
	catch(err) {
		//alert(info);
		//alert(err.description);
	}
}

function removeListeners() {
	// Remove click listeners for polygon centers.
	for (var i=0; i<gmarkers.length; i++) {
		var mapinfo = places[i].split(':');
		var coords = mapinfo[1].split(',');
		myRemoveListener(gmarkers[i], mapinfo[0]);
	}
}

function myRemoveListener(gmarker, info) {
	// Remove an individual polygon's listener.
	try {
		GEvent.removeListener(gmarker);
	}
	catch(err) {
		//alert(info);
		//alert(err.description);
	}
}

function createPoly(building) {
	var polygon = new GPolygon(buildings[building], "#CCCCCC", 1, 1, "#888888", 0.5);
	GEvent.addListener(polygon, "click", function(latlng) {
			map.openInfoWindow(latlng, "You clicked " + building);
	});
	GEvent.addListener(polygon, "mouseover", function(latlng) {
			map.openInfoWindow(latlng, "You moused over " + building);
	});
	return polygon;
}

function searchMaps(searchTerm, updateLocationList) {
	// Find a list of items matching a search. Resulting value is HTML to be substituted into the right-side list of campus places.
	
	// Handle LDAP-formatted location as it comes from PeopleSearch (e.g., "Day Hall, Room 308").
	searchTerm = searchTerm.replace(/, Room ?\d*.?/i, "").replace(/^East Hill Plaza, /i, "");
//	alert(searchTerm);
	
	// Strip off common terms from the search term, such as road, street, and ave.
	searchTerm = searchTerm.replace(/(str?e?e?t?\.?|ro?a?d\.?|ave?n?u?e?\.?|way|ce?n?te?r\.?)/gi, "");
//	alert(searchTerm);
	
	// Handle addresses of the format "College Ave., 312".
	var addressName = searchTerm.replace(/\s?,\s?\d+/, "");
	var addressNumber = searchTerm.replace(/^[^\d]*/, "");
	if ((parseInt(addressNumber, 10) > 0) && (addressName != addressNumber)) {
		searchTerm = addressNumber + " " + addressName;
	}
	//alert2(addressName,addressNumber,searchTerm);
	
	// Show "working" graphic animation.
	if (updateLocationList == 1) {
		$("#locationListItems").html("<p><img src=\"loading.gif\" alt=\"\" /></p>");
	}
	
	// If search term is exactly three characters long, search through building codes.
	if (searchTerm.length == 3) {
		var code = searchTerm.toUpperCase();
		if (typeof(buildingCodes[code]) != "undefined") {
			searchTerm = buildingCodes[code];
			//alert(searchTerm);
		}
	}
	
	// Search through internal array of buildings to match them to the search term.
	var re = new RegExp(searchTerm, "i");
	newInnerHTML = "";
	var numHits = 0;
	var firstHit = 0;
	for (var i=0; i<places.length; i++) {
		if (places[i].match(re)) {
			mapinfo = places[i].split(':');
			coords = mapinfo[1].split(',');
			if (mapinfo[0] != "Untitled Placemark") {
				newInnerHTML += '<li><a href="##" onclick="centerMap('+i+', 0)">'+mapinfo[0]+'</a></li>';
				numHits++;
				if (numHits == 1) {
					firstHit = i;
				}
			}
		}
	}
	
	// Call search script via AJAX to look at units database as well as internal JavaScript location list.
	searchResults = "";
	generateLocationList($("#searchMaps").val());
	// Update the location list only if returning from a true search, not when returning from a polygon click.
	if (updateLocationList == 1) {
		setTimeout('showUnitSearchResults('+numHits+', '+firstHit+')', 1000);
	}
	else {
		centerMap(firstHit, 250);
	}
}

function showUnitSearchResults(numHits, firstHit) {
	if (searchResults.indexOf('<li>') >= 0) {
		newInnerHTML += searchResults;
	}
	if (newInnerHTML != "") {
		$("#locationListItems").html("<ul class=\"scrollingList\">" + newInnerHTML + "</ul>");
		// Show a link to reset the search results list.
		$("#resetLocationList").show();	
		$("#makeURL").show();
	}
	else {
		//alert("Found no locations matching " + $("#searchMaps").val() + ".");
		$("#locationListItems").html("<ul class=\"scrollingList\"><li>Found no results for \"" + $("#searchMaps").val() + "\".</li></ul>");
		$("#resetLocationList").show();	
	}
	if (numHits == 1) {
		centerMap(firstHit, 0);
	}
}


function submitEnter(myfield,e) {
	// Detect enter key being pressed to execute search.
	// From http://www.htmlcodetutorial.com/forms/index_famsupp_157.html
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	
	if (keycode == 13) {
		searchMaps($("#searchMaps").val(), 1);
		return false;
	}
	else {
		return true;
	}
}


// Quicktime Detection  v1.0
// documentation: http://www.dithered.com/javascript/quicktime_detect/index.html
// license: http://creativecommons.org/licenses/by/1.0/
// code by Chris Nott (chris[at]dithered[dot]com)

var quicktimeVersion = 0;
function getQuicktimeVersion() {
	var agent = navigator.userAgent.toLowerCase(); 
	
	// NS3+, Opera3+, IE5+ Mac (support plugin array):  check for Quicktime plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		for (i=0; i < navigator.plugins.length; i++ ) {
			var plugin = navigator.plugins[i];
			if (plugin.name.indexOf("QuickTime") > -1) {
				quicktimeVersion = parseFloat(plugin.name.substring(18));
			}
		}
	}
	
	// IE4+ Win32:  attempt to create an ActiveX object using VBScript
	else if (agent.indexOf("msie") != -1 && parseInt(navigator.appVersion) >= 4 && agent.indexOf("win")!=-1 && agent.indexOf("16bit")==-1) {
		document.write('<scr' + 'ipt language="VBScript"\> \n');
		document.write('on error resume next \n');
		document.write('dim obQuicktime \n');
		document.write('set obQuicktime = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1") \n');
		document.write('if IsObject(obQuicktime) then \n');
		document.write('   if obQuicktime.IsQuickTimeAvailable(0) then \n');
		document.write('      quicktimeVersion = CInt(Hex(obQuicktime.QuickTimeVersion) / 1000000) \n');
		document.write('   end if \n');
		document.write('end if \n');
		document.write('</scr' + 'ipt\> \n');
	}
	
	// Can't detect in all other cases
	else {
		quicktimeVersion = quicktimeVersion_DONTKNOW;
	}
	
	return quicktimeVersion;
}

quicktimeVersion_DONTKNOW = -1;

function defineCampus() {
	// Define a polygon of main campus, to be used to determine whether a location is inside it when showing closest public parking space.
	// While it is possible to define this polygon in a KML file, loading the KML file via GGeoXml does not result in obtaining a polygon that can be handled as an object unless a third-party script is used (http://econym.googlepages.com/egeoxml.htm).
	campusPolyPoints = [];
	campusPolyPoints[0] = new GLatLng(parseFloat(42.44923319939294), parseFloat(-76.49040622077894));
	campusPolyPoints[1] = new GLatLng(parseFloat(42.44749551447904), parseFloat(-76.49038465780161));
	campusPolyPoints[2] = new GLatLng(parseFloat(42.44561338661595), parseFloat(-76.48999759065072));
	campusPolyPoints[3] = new GLatLng(parseFloat(42.44500601897025), parseFloat(-76.48919139010211));
	campusPolyPoints[4] = new GLatLng(parseFloat(42.446418083132), parseFloat(-76.48749217009399));
	campusPolyPoints[5] = new GLatLng(parseFloat(42.4458994383202), parseFloat(-76.48605669824109));
	campusPolyPoints[6] = new GLatLng(parseFloat(42.44320940503714), parseFloat(-76.48514813033701));
	campusPolyPoints[7] = new GLatLng(parseFloat(42.44312148458147), parseFloat(-76.4808768663423));
	campusPolyPoints[8] = new GLatLng(parseFloat(42.44297721981287), parseFloat(-76.47814688453994));
	campusPolyPoints[9] = new GLatLng(parseFloat(42.44347594689156), parseFloat(-76.47547172218755));
	campusPolyPoints[10] = new GLatLng(parseFloat(42.44407826228719), parseFloat(-76.47347802685796));
	campusPolyPoints[11] = new GLatLng(parseFloat(42.44377666653718), parseFloat(-76.47103700416872));
	campusPolyPoints[12] = new GLatLng(parseFloat(42.44269954570201), parseFloat(-76.46953526346094));
	campusPolyPoints[13] = new GLatLng(parseFloat(42.44370256318714), parseFloat(-76.46139413694144));
	campusPolyPoints[14] = new GLatLng(parseFloat(42.44674407426825), parseFloat(-76.4608831260106));
	campusPolyPoints[15] = new GLatLng(parseFloat(42.44773794633294), parseFloat(-76.46173722111445));
	campusPolyPoints[16] = new GLatLng(parseFloat(42.44927969053899), parseFloat(-76.46347893858906));
	campusPolyPoints[17] = new GLatLng(parseFloat(42.4500039887334), parseFloat(-76.4650102955699));
	campusPolyPoints[18] = new GLatLng(parseFloat(42.45335155621223), parseFloat(-76.46828257927373));
	campusPolyPoints[19] = new GLatLng(parseFloat(42.45524769441009), parseFloat(-76.47034282628331));
	campusPolyPoints[20] = new GLatLng(parseFloat(42.45807729490416), parseFloat(-76.47177451622082));
	campusPolyPoints[21] = new GLatLng(parseFloat(42.45895463031213), parseFloat(-76.47520087486095));
	campusPolyPoints[22] = new GLatLng(parseFloat(42.45888136904116), parseFloat(-76.47923703219217));
	campusPolyPoints[23] = new GLatLng(parseFloat(42.45891354512717), parseFloat(-76.48053886532657));
	campusPolyPoints[24] = new GLatLng(parseFloat(42.45866252045583), parseFloat(-76.48178067108066));
	campusPolyPoints[25] = new GLatLng(parseFloat(42.45792235978141), parseFloat(-76.48192226721285));
	campusPolyPoints[26] = new GLatLng(parseFloat(42.45640182314867), parseFloat(-76.48131993998594));
	campusPolyPoints[27] = new GLatLng(parseFloat(42.45567164809673), parseFloat(-76.48099166655136));
	campusPolyPoints[28] = new GLatLng(parseFloat(42.45469379298686), parseFloat(-76.48084964199872));
	campusPolyPoints[29] = new GLatLng(parseFloat(42.45408533830001), parseFloat(-76.48077640046668));
	campusPolyPoints[30] = new GLatLng(parseFloat(42.45333652864306), parseFloat(-76.48100984522794));
	campusPolyPoints[31] = new GLatLng(parseFloat(42.45236915935953), parseFloat(-76.48134274950799));
	campusPolyPoints[32] = new GLatLng(parseFloat(42.4513537382696), parseFloat(-76.48215407600821));
	campusPolyPoints[33] = new GLatLng(parseFloat(42.45134116965075), parseFloat(-76.48264700364528));
	campusPolyPoints[34] = new GLatLng(parseFloat(42.45142515258371), parseFloat(-76.48353238092739));
	campusPolyPoints[35] = new GLatLng(parseFloat(42.45128184669465), parseFloat(-76.48475450637719));
	campusPolyPoints[36] = new GLatLng(parseFloat(42.45122801547301), parseFloat(-76.48562448669836));
	campusPolyPoints[37] = new GLatLng(parseFloat(42.45119577021159), parseFloat(-76.48650277731805));
	campusPolyPoints[38] = new GLatLng(parseFloat(42.4508199599135), parseFloat(-76.48682800642786));
	campusPolyPoints[39] = new GLatLng(parseFloat(42.45032244124457), parseFloat(-76.48713737555191));
	campusPolyPoints[40] = new GLatLng(parseFloat(42.44982483764933), parseFloat(-76.48733572765832));
	campusPolyPoints[41] = new GLatLng(parseFloat(42.44942171488979), parseFloat(-76.48795391987696));
	campusPolyPoints[42] = new GLatLng(parseFloat(42.44921797579579), parseFloat(-76.488904669601));
	campusPolyPoints[43] = new GLatLng(parseFloat(42.44923319939294), parseFloat(-76.49040622077894));
	campusPoly = new GPolygon(campusPolyPoints, "##000000" , 0, 0, "##FFFFFF", 0, {clickable:false});
	map.addOverlay(campusPoly);
}

function alert2() {
	// Show an alert box with multiple variables' values.
	var msg = "";
	for (var i=0; i< arguments.length; i++) {
		msg += arguments[i] + ":";
	}
	msg = msg.replace(/:$/, "");
	alert(msg);
}


