var isInAddMarkerMode = false;
var isInAddAnnotationMode = false;
var isInRemoveOneMarkerMode = false;
var isInMeasureDistanceMode = false;
var wypadek = false;
var patrol = false;
var korek = false;
//var measureDistance=false;
var mapLayer = L.geoJson();
var map;
var markers = L.layerGroup();
var popups = L.layerGroup();
var measurePoint =null;

window.onload = function() {
	map = L.map('map');
	revertRange();
	map.closePopupOnClick = false;
	L.tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(map);

	// var marker = L.marker([51.595519, 18.730165]).addTo(map);
	var circle = L.circle([ 51.595519, 18.730165 ], 100, {
		color : 'red',
		fillColor : '#f03',
		fillOpacity : 0.3
	}).addTo(map);

	map.on('click', onMapClick);

	function onMapClick(e) {
		if(isInMeasureDistanceMode){
			console.log("Measure distance");
			if(measurePoint==null){
				console.log("measurePoint is null");
				measurePoint=e.latlng;
			} else {
				console.log("Displaying distance");
				var dist = measurePoint.distanceTo(e.latlng);
				alert("Dystans: " + (dist/1000).toFixed(3)  + " km");
				measurePoint = null;
				isInMeasureDistanceMode = false;
			}
			
		}
		
		
		if (isInRemoveOneMarkerMode) {
			console.log("Removing one marker");

		}

		if (isInAddAnnotationMode) {
			isInAddMarkerMode = false;
			console.log("Adding annotation at: " + e.latlng);
			var annotationText = prompt("Podaj tekst adnotacji: ");
			//
			// var popup = L.popup();
			// popup.setLatLng(e.latlng).setContent(annotationText);
			// popup.addTo(popups);
			// map.addLayer(popups);
			// // popup.addTo(popups);
			// // map.addLayer(popup);

			var popup = L.popup();
			popup.keepInView = true;
			popup.closeOnClick = false;
			popup.autoPan = false;
			popup.setLatLng(e.latlng).setContent(annotationText);
			popup.addTo(popups);
			popups.addTo(map);

			isInAddAnnotationMode = false;
		}
		if (isInAddMarkerMode) {
			var inneIcon = L.icon({
				iconUrl : 'inne.png',
				//
				iconSize : [ 50, 50 ], // size of the icon
				shadowSize : [ 50, 64 ], // size of the shadow
				iconAnchor : [ 22, 94 ], // point of the icon which will
				// correspond to marker's location
				shadowAnchor : [ 4, 62 ], // the same for the shadow
				popupAnchor : [ -3, -76 ]
			// point from which the popup should open relative to the iconAnchor
			});
			var marker = L.marker([ 51.595519, 18.730165 ], {
				icon : inneIcon
			});
			marker.on('click', onMarkerClick)
			// marker.bindPopup(e.latlng.toString()).openPopup();
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			isInAddMarkerMode = false;
		}
		if (wypadek) {
			// console.log("on wypadek click");

			var crashIcon = L.icon({
				iconUrl : 'crash.png',
				//
				iconSize : [ 50, 50 ], // size of the icon
				shadowSize : [ 50, 64 ], // size of the shadow
				iconAnchor : [ 22, 94 ], // point of the icon which will
				// correspond to marker's location
				shadowAnchor : [ 4, 62 ], // the same for the shadow
				popupAnchor : [ -3, -76 ]
			// point from which the popup should open relative to the iconAnchor
			});

			var marker = L.marker([ 51.595519, 18.730165 ], {
				icon : crashIcon
			});
			marker.on('click', onMarkerClick)
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			marker.bindPopup("<b>Uwaga Wypadek!</b>").openPopup();
			wypadek = false;
		}
		if (patrol) {
			var patrolIcon = L.icon({
				iconUrl : 'patrol.png',
				//
				iconSize : [ 50, 50 ], // size of the icon
				shadowSize : [ 50, 64 ], // size of the shadow
				iconAnchor : [ 22, 94 ], // point of the icon which will
				// correspond to marker's location
				shadowAnchor : [ 4, 62 ], // the same for the shadow
				popupAnchor : [ -3, -76 ]
			// point from which the popup should open relative to the iconAnchor
			});
			// console.log("on patrol click");
			var marker = L.marker([ 51.595519, 18.730165 ], {
				icon : patrolIcon
			});
			marker.on('click', onMarkerClick)
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			marker.bindPopup("<b>Uwaga Patrol!</b>").openPopup();
			patrol = false;
		}
		if (korek) {
			var trafficJamIcon = L.icon({
				iconUrl : 'trafficJam.png',
				//
				iconSize : [ 50, 50 ], // size of the icon
				shadowSize : [ 50, 64 ], // size of the shadow
				iconAnchor : [ 22, 94 ], // point of the icon which will
				// correspond to marker's location
				shadowAnchor : [ 4, 62 ], // the same for the shadow
				popupAnchor : [ -3, -76 ]
			// point from which the popup should open relative to the iconAnchor
			});
			// console.log("on korek click");
			var marker = L.marker([ 51.595519, 18.730165 ], {
				icon : trafficJamIcon
			});
			marker.on('click', onMarkerClick)
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			marker.bindPopup("<b>Uwaga Korek!</b>").openPopup();
			korek = false;
		}
	}

	function onMarkerClick(e) {
		// console.log("on marker click");
		if (isInRemoveOneMarkerMode) {
			markers.removeLayer(this);
		}
	}

};

function removeMarker() {
	markers.clearLayers();
}

function removeOneMarker() {
	isInRemoveOneMarkerMode = true;
}

function removeAnnotation() {
	popups.clearLayers();
}

function revertRange() {
	console.log("Revert range!");
	map.setView([ 51.110538, 17.034436 ], 14);
}

function addWMS() {
	////console.log("adding WMS");
	var orto = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'Raster',
	}).addTo(map);
}
function removeWMS() {
	//console.log("removing WMS");
	L.tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(map);
	
}
function gdzieJestem(){
	function onMapClick(e) {
	    alert("Twoje współrzędne to:  " + "\n" +  e.latlng.lat  + "  "+  e.latlng.lng);
	}

	map.on('click', onMapClick);

}
function measureDistance(){
	console.log("measureDistance");
	isInMeasureDistanceMode=true;
	
}