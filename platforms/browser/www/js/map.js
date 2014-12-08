var map;
var myOverlay;
var storageObj;
var routeIndex;
var currentPaths;
var watchId;


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
	watchId = navigator.geolocation.watchPosition(geolocationSuccess,
		geolocationError, {enableHighAccuracy: true});

}

/* This fires every time we get a location */
var geolocationSuccess = function(position)
{
	console.log('position');

	if(map===null)
	{
		console.log('error - no map');
		return;
	}

	position.coords.latitude = position.coords.latitude.toFixed(5);
	position.coords.longitude = position.coords.longitude.toFixed(5);

	/* What points are currently on the map? */
	currentPaths = myOverlay.getPaths();

	/* lets see the new point */
	focusMap( position );

	/* store the new data */
	addPointToRoute( position.coords );

	/* if its the first rectangle */
	if( isFirstRect() )
	{
		currentPaths.push( generateRect( position ) );
		
		/* add new cutout to map */
		myOverlay.setPaths(currentPaths);
	}
	else
	{
		drawPath( position );
	}
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
	map.setZoom(16);
	map.setCenter( new google.maps.LatLng( (p.coords.latitude - 0.00025), p.coords.longitude ) );
}

function drawPath ( p )
{

	var previousLoc = getPreviousPoint();
	var lastDrawnLocation = null;
	var initialVector = getVector(previousLoc, p.coords);
	var numRects, remainingVector;

	remainingVector = initialVector;

	console.log('Vector to new:');
	console.log(remainingVector);


	while ( xHasRemainder(remainingVector.x) || yHasRemainder(remainingVector.y) )
	{

		console.log('Drawing rect');

		var lonOffset, latOffset;

		if( xHasRemainder(remainingVector.x) )
		{
			lonOffset = getLonOffset(remainingVector.x);
		}
		else
		{
			lonOffset = remainingVector.x;
		}

		if( yHasRemainder(remainingVector.y) )
		{
			latOffset = getLatOffset(remainingVector.y);
		}
		else
		{
			latOffset = remainingVector.y;
		}

		var newPosition;

		if(lastDrawnLocation === null)
		{
			newPosition = {
				coords: {
					latitude: (previousLoc.lat+latOffset),
					longitude: (previousLoc.lon+lonOffset)
				}
			};
		}
		else
		{
			newPosition = {
				coords: {
					latitude: (lastDrawnLocation.lat+latOffset),
					longitude: (lastDrawnLocation.lon+lonOffset)
				}
			};
		}
		

		remainingVector.x = remainingVector.x - lonOffset;
		remainingVector.y = remainingVector.y - latOffset;

		var proposedRect = generateRect(newPosition);

		// if( !hasOverlaps(proposedRect) )
		// {
		// console.log('Can draw new rect');
		// console.log(proposedRect);
			currentPaths.push(proposedRect);

			/* add new cutout to map */
			myOverlay.setPaths(currentPaths);

			lastDrawnLocation = previousLoc;
			lastDrawnLocation.lat = previousLoc.lat+latOffset;
			lastDrawnLocation.lon = previousLoc.lat+lonOffset;
		// }
		// else
		// {
		// console.log('Nothing drawable');
		// }

	}

}

function getVector ( pointA, pointB )
{
	var latDiff = Number((pointB.latitude - pointA.lat).toFixed(5));
	var lonDiff = Number((pointB.longitude - pointA.lon).toFixed(5));
	return { x: lonDiff, y: latDiff };
}


/* Make a new rect (circle later?) for our new location */
function generateRect( p )
{
	var offset = 0.0001;

	return new google.maps.MVCArray([
		new google.maps.LatLng(( parseFloat(p.coords.latitude) + offset ), ( parseFloat(p.coords.longitude) - (offset*2))),
		new google.maps.LatLng(( parseFloat(p.coords.latitude) - offset ), ( parseFloat(p.coords.longitude) - (offset*2))),
		new google.maps.LatLng(( parseFloat(p.coords.latitude) - offset ), ( parseFloat(p.coords.longitude) + (offset*2))),
		new google.maps.LatLng(( parseFloat(p.coords.latitude) + offset ), ( parseFloat(p.coords.longitude) + (offset*2)))
	]);
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

function hasOverlaps(rect)
{
	var failed = false;

	currentPaths.forEach(function(elem, num)
	{
		if(num>0)
		{
			rect.forEach( function(e, n)
			{
				if( google.maps.geometry.poly.containsLocation(e, tempPoly(elem)) )
				{
					console.log('overlap test failed');
					failed = true;
				}
			});
		} /* we don't want to check whether we're in the huge mask polygon */
		
	});


	return failed;
}

function tempPoly(r)
{
	var poly = new google.maps.Polygon();
	poly.setPath(r);
	return poly;
}

function xHasRemainder(x)
{
	if(x >= 0.0004 || x <= -0.0004)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function yHasRemainder(y){
	if(y >= 0.0002 || y <= -0.0002)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function getLatOffset(val)
{
	if(val > 0)
	{
		return 0.0002;
	}else
	{
		return -0.0002;
	}
}

function getLonOffset(val)
{
	if(val > 0)
	{
		return 0.0004;
	}else
	{
		return -0.0004;
	}
}