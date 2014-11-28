var map;
var myOverlay;
var storageObj;
var routeIndex;


function initGoogleMap()
{

	console.log('init');

	var mapOptions =
	{
		center:
		{
			lat: 55.948588,
			lng: -3.200620
		},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var overlayEurope = new google.maps.MVCArray(
		[
			new google.maps.LatLng(72.484310, -43.466847),
			new google.maps.LatLng(72.484310, 43.466847),
			new google.maps.LatLng(34.404477, 35.029347),
			new google.maps.LatLng(34.404477, -35.029347)
		]
	);


	/* Construct the polygon. */
	myOverlay = new google.maps.Polygon(
		{
			paths: [overlayEurope],
			strokeColor: '#e9e5dc',
			strokeOpacity: 0.8,
			strokeWeight: 0,
			fillColor: '#e9e5dc',
			fillOpacity: 0.90
		}
	);

	/* Attach the polygon to the map. */
	myOverlay.setMap(map);

	// var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
	var watchId = navigator.geolocation.watchPosition(geolocationSuccess,
		geolocationError, {enableHighAccuracy: true});

}

/* This fires every time we get a location */
var geolocationSuccess = function(position)
{
	/* What points are currently on the map? */
	var currentPaths = myOverlay.getPaths();

	/* myOverlay.setPaths(currentPaths);*/

	/* lets see the new point */
	focusMap();

	/* store the new data */
	addPointToRoute( position.coords );

	/* if its the first rectangle */
	if( storageObj.routes[routeIndex].points.length <= 1 )
	{
		createOverlayShape( p, 1.0, 1.0 );
	}
};

/* Handle errors with gps */
function geolocationError(error)
{
	alert('code: ' + error.code + '\n' +
		'message: ' + error.message + '\n');
}

function focusMap ()
{
	map.setZoom(16);
	map.setCenter( new google.maps.LatLng( p.coords.latitude, p.coords.longitude ) );
}


/* Make a new rect (circle later?) for our new location */
function createOverlayShape( p, scaleX, scaleY )
{
	return new google.maps.MVCArray([
		new google.maps.LatLng((+p.coords.latitude + (offset*scaleY) ), (+p.coords.longitude - (offset*scaleX*2))),
		new google.maps.LatLng((+p.coords.latitude - (offset*scaleY) ), (+p.coords.longitude - (offset*scaleX*2))),
		new google.maps.LatLng((+p.coords.latitude - (offset*scaleY) ), (+p.coords.longitude + (offset*scaleX*2))),
		new google.maps.LatLng((+p.coords.latitude + (offset*scaleY) ), (+p.coords.longitude + (offset*scaleX*2)))
	]);
}

function getPointVector ( latlng1, latlng2 )
{

}