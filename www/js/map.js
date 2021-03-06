var map;
var myOverlay;
var storageObj;
var routeIndex;
var currentPaths;
var watchId;

var pointCloud = [];

var timeExpired = true;

// var testCloud = [[59.30023, -3.23230], [59.20023, -3.23230],[59.38023, -3.23830],[59.32223, -3.28830],[59.30123, -3.23444],[59.40023, -3.13230],[59.37823, -3.0990]];


// var lshape = [
//	[51,0],
//	[49,0],
//	[49,1.5],
//	[49.2,1.5],
//	[49.2,0.2],
//	[51,0.2]
// ];

function initGoogleMap()
{
	/* JSON */

	if( !storageExists() )
    {
        initStorage();
    }

    loadFromStorage();
    createRoute();

    /* MAP */

    setInterval(function(){ timeExpired = true; console.log('tick'); }, 2000);

    // console.log('cloud to hull');
    // console.log( hull(testCloud, 15) );

	var mapOptions =
	{
		center:
		{
			lat: 55.948588,
			lng: -3.200620
		},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true
	};

	map = new google.maps.Map( document.getElementById('map-canvas'), mapOptions);

	var overlayEurope = new google.maps.MVCArray(
		[
			new google.maps.LatLng(34.404477, -35.029347),
			new google.maps.LatLng(34.404477, 35.029347),
			new google.maps.LatLng(72.484310, 43.466847),
			new google.maps.LatLng(72.484310, -43.466847)
		]
	);



	var placeHolderArray = new google.maps.MVCArray([]);


	/* Construct the polygon. */
	myOverlay = new google.maps.Polygon(
		{
			paths: [overlayEurope, placeHolderArray],
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
	watchId = navigator.geolocation.watchPosition(geolocationSuccess,
		geolocationError, {enableHighAccuracy: true});

}

/* This fires every time we get a location */
var geolocationSuccess = function(position)
{

	if(!timeExpired)
	{
		console.log('too soon');
		return;
	}

	timeExpired = false;

	console.log('position');

	if(map===null)
	{
		console.log('error - no map');
		return;
	}

	position.coords.latitude = position.coords.latitude.toFixed(5);
	position.coords.longitude = position.coords.longitude.toFixed(5);

	/* lets see the new point */
	focusMap( position );

	/* store the new data */
	addPointToRoute( position.coords );

	/* 
		create the additional geometry for the hull
		meaning we can draw even with only one point
		(4 vertices)
	*/
	createRect(position);

	// console.log(pointCloud);
	// console.log(hull(pointCloud, 15));
	// console.log(convertToMVCArray(hull(pointCloud, 15)));


	/* Get the current path obj */
	var paths = myOverlay.getPaths();

	/* Generate hull */
	var calculatedHull = hull(pointCloud, 0.001);

	/* Put new hull on the map */
	paths.setAt(2, convertToMVCArray(calculatedHull) );
	myOverlay.setPaths(paths);

};

/* Handle errors with gps */
function geolocationError(error)
{
	alert('code: ' + error.code + '\n' +
		'message: ' + error.message + '\n');
}

function isFirstRect ()
{
	if(	getPointsLength() <= 1 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function focusMap ( p )
{
	map.setZoom(17);
	map.setCenter( new google.maps.LatLng( (p.coords.latitude - 0.00025), p.coords.longitude ) );
}


function clearMap ()
{
	routeIndex = -1;

	myOverlay = null;
	map = null;
	navigator.geolocation.clearWatch(watchId);
	$('#map-canvas').empty();

	// save the json
}

function convertToMVCArray( pairs )
{
	var mvc = new google.maps.MVCArray();

	for( var i=0; i<pairs.length; i++ )
	{
		/* Grab the lat [0] and lon[1] */
		var latlng = new google.maps.LatLng(pairs[i][0], pairs[i][1]);
		mvc.push(latlng);
	}

	return mvc;
}

function createRect(p)
{
	var offsetY = 0.0001;
	var offsetX = 0.0002;


	/* Add to our big array of points to be made into a hull. */
	pointCloud.push([(p.coords.latitude + offsetY), (p.coords.longitude - offsetX)]); // NW
	pointCloud.push([(p.coords.latitude), (p.coords.longitude - offsetX)]); // W *
	pointCloud.push([(p.coords.latitude - offsetY), (p.coords.longitude - offsetX)]); // SW
	pointCloud.push([(p.coords.latitude - offsetY), (p.coords.longitude)]); // S
	pointCloud.push([(p.coords.latitude - offsetY), (p.coords.longitude + offsetX)]); // SE
	pointCloud.push([(p.coords.latitude), (p.coords.longitude + offsetX)]); // E *
	pointCloud.push([(p.coords.latitude + offsetY), (p.coords.longitude + offsetX)]); // NE
	pointCloud.push([(p.coords.latitude + offsetY), (p.coords.longitude)]); // N
	

	// markerForPoint(new google.maps.LatLng(p.coords.latitude, p.coords.longitude));

}

function markerForPoint(ll)
{
	new google.maps.Marker({
		position: ll,
		map: map,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: 'red',
			fillOpacity: 0.4,
			scale: 4.5,
			strokeColor: 'white',
			strokeWeight: 1
		}
	});


}

function randomInRange(min, max) {
	return Math.random() * (max-min) + min;
}



