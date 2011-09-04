/* $Id: gmap_markerlist.js,v 1.1 2009/02/26 22:42:48 bdragon Exp $ */

(function () {
  var MarkerList = function (gmap) {
    this.obj = gmap;
  }
  MarkerList.prototype = new GControl();
  MarkerList.prototype.initialize = function (map) {
    this.map = map;
    this.markerlist = document.createElement("div");
    map.getContainer().appendChild(this.markerlist);
    $(this.markerlist).addClass('gmap_markerlist').append('<div class="key">Key</div><ul></ul>');
    return this.markerlist;
  }
  MarkerList.prototype.test = function (str) {
    $(this.markerlist).append(str);
  }
  
  var myMarkers = new Array();
  var markerTypes = new Array();
  
  MarkerList.prototype.addMarker = function (marker) {
    var obj = this.obj;

 	//add the marker to the array   
    myMarkers.push(marker);
    
    var newType = true;
	//only add the marker type list item if it hasn't already been added
	for(i=0;i<markerTypes.length; i++)
  	{
  		type = markerTypes[i];
  		if(type == marker.type)
  		{
  			newType = false;
  		}
  	}
  	
  	if(newType)
	{
		//add the new marker type to the array
		markerTypes.push(marker.type);
		
		//add the new marker type to the list
	    $('<li class="marker_'+marker.type+'">' + marker.type_readable + '</li>').appendTo($('ul', this.markerlist)).click(function () {
	     
		  		   
			hideMarkersByType(marker.type);
		   
	    });
    }
    
    
    
  }
  
  var hideMarkersByType = function (type) {
  	for(i=0;i<myMarkers.length; i++)
  	{
  		marker = myMarkers[i];
  		if (marker.type == type)
  		{
  		   (marker.marker.isHidden())?(marker.marker.show()):(marker.marker.hide());
  		}
  	}
  }
  
  MarkerList.prototype.getDefaultPosition = function () {
    return new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(7, 33));
  }

  Drupal.gmap.addHandler('gmap', function(elem) {
    var obj = this;
    var myList;
    obj.bind('init', function () {
      myList = new MarkerList(obj);
      obj.map.addControl(myList);
    });

    obj.bind('addmarker', function (marker) {
      myList.addMarker(marker);
    });

  });





})();