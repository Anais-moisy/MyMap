
var map;


function initGoogleMap() {

	console.log('init');

	var mapOptions = {
		center: { lat: 55.948588, lng: -3.200620}, 
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  	var overlayEurope = [
    	new google.maps.LatLng(72.484310, -43.466847),
    	new google.maps.LatLng(72.484310, 43.466847),
    	new google.maps.LatLng(34.404477, 35.029347),
    	new google.maps.LatLng(34.404477, -35.029347)
  	];
  

  	var overlayTransparent = [
    	new google.maps.LatLng(55.958813, -3.231337),
    	new google.maps.LatLng(55.930359, -3.231337),
    	new google.maps.LatLng(55.930359, -3.160956),
    	new google.maps.LatLng(55.958813, -3.160956)
  	];

 
  // Construct the polygon.
  	var myPath = new google.maps.Polygon({
    	paths: [overlayEurope , overlayTransparent] ,
    	strokeColor: '#e9e5dc',
    	strokeOpacity: 0.8,
    	strokeWeight: 0,
    	fillColor: '#e9e5dc',
    	fillOpacity: 0.90
  	});


  myPath.setMap(map);

  // var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

  var watchId = navigator.geolocation.watchPosition(geolocationSuccess,
                                                  geolocationError,
                                                  {});
  
}

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var geolocationSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function geolocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}