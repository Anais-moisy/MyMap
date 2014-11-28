var map;
var myPath;


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


	// Construct the polygon.
	myPath = new google.maps.Polygon(
		{
			paths: [overlayEurope],
			strokeColor: '#e9e5dc',
			strokeOpacity: 0.8,
			strokeWeight: 0,
			fillColor: '#e9e5dc',
			fillOpacity: 0.90
		}
	);


	myPath.setMap(map);

	// var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

	var watchId = navigator.geolocation.watchPosition(geolocationSuccess,
		geolocationError, {});

}

/* This happens every time we get a location */
var geolocationSuccess = function(position)
{
	/* What points are currently on the map? */
	var currentPaths = myPath.getPaths();

	/* Calculate a square to cut from our new position */
	var overlayTransparent = createOverlayBox(position);

	/* Do we have a cutout from Europe yet? */
	if (currentPaths.getLength() < 2)
	{
		currentPaths.setAt(1, getConvexHullPoints(overlayTransparent.getArray()));
	}
	/* Add to the existing cutout */
	else
	{
		var cutOut = currentPaths.getAt(1);

		for (var i = 0; i < overlayTransparent.getLength(); i++)
		{
			cutOut.push(overlayTransparent.getAt(i));
		}

		/* Calculate the external perimeter of the new cutout */
		currentPaths.setAt(1, getConvexHullPoints(cutOut.getArray()));
	}

	myPath.setPaths(currentPaths);
};

// onError Callback receives a PositionError object
//
function geolocationError(error)
{
	alert('code: ' + error.code + '\n' +
		'message: ' + error.message + '\n');
}


/*
 *
 * Convex hull algorithm thanks to eriestuff.blogspot.com
 *
 */

function getConvexHullPoints(points)
{
	//find first baseline
	var maxX, minX;
	var maxPt, minPt;

	for (var idx in points)
	{
		// transform point to [lat,lng] array from GLatLng
		var pt = [points[idx].lat(), points[idx].lng()];
		if (pt[0] > maxX || !maxX)
		{
			maxPt = pt;
			maxX = pt[0];
		}
		if (pt[0] < minX || !minX)
		{
			minPt = pt;
			minX = pt[0];
		}
	}
	// transform point back into a GLatLng
	minPt = new google.maps.LatLng(minPt[0], minPt[1]);
	maxPt = new google.maps.LatLng(maxPt[0], maxPt[1]);

	// get all baselines
	var allBaseLines = [];
	var ch = [].concat(buildConvexHull([minPt, maxPt], points), buildConvexHull([maxPt, minPt], points));
	// turn baseline array into points array
	points = [];

	for (var i in ch)
	{
		points.push(ch[i][0]);
		points.push(ch[i][1]);
	}

	console.log(points);

	return new google.maps.MVCArray(points);

	// private functions
	function buildConvexHull(baseLine, points)
	{
		allBaseLines.push(baseLine);
		var convexHullBaseLines = [];
		var t = findMostDistantPointFromBaseLine(baseLine, points);
		if (t.maxPoint && t.maxPoint.lat)
		{
			convexHullBaseLines = convexHullBaseLines.concat(buildConvexHull([baseLine[0], t.maxPoint], t.newPoints));
			convexHullBaseLines = convexHullBaseLines.concat(buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints));
			return convexHullBaseLines;
		}
		else
		{
			return [baseLine];
		}
	}

	function findMostDistantPointFromBaseLine(baseLine, points)
	{
		var maxD = 0;
		var maxPt = [];
		var newPoints = [];
		for (var idx in points) {
			var pt = points[idx];
			var d = getDistant(pt, baseLine);
			if (d > 0) {
				newPoints.push(pt);
			} else {
				continue;
			}
			if (d > maxD) {
				maxD = d;
				maxPt = pt;
			}
		}
		return {
			maxPoint: maxPt,
			newPoints: newPoints
		};
	}

	function getDistant(cpt, bl)
	{
		// transform GLatLng into array
		cpt = [cpt.lat(), cpt.lng()];
		bl = [
			[bl[0].lat(), bl[0].lng()],
			[bl[1].lat(), bl[1].lng()]
		];
		// get distance from point to baseline
		Vy = bl[1][0] - bl[0][0];
		Vx = bl[0][1] - bl[1][1];
		// return distance (dotproduct or crossproduct?)
		return (Vx * (cpt[0] - bl[0][0]) + Vy * (cpt[1] - bl[0][1]));
	}
}

function createOverlayBox(p)
{
	return new google.maps.MVCArray([
		new google.maps.LatLng((+p.coords.latitude + 0.0001), (+p.coords.longitude - 0.0002)),
		new google.maps.LatLng((+p.coords.latitude - 0.0001), (+p.coords.longitude - 0.0002)),
		new google.maps.LatLng((+p.coords.latitude - 0.0001), (+p.coords.longitude + 0.0002)),
		new google.maps.LatLng((+p.coords.latitude + 0.0001), (+p.coords.longitude + 0.0002))
	]);
}