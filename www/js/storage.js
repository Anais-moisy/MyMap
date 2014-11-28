function initStorage ()
{
	localStorage.pointStorage = JSON.stringify(
		{
			last_updated: theTime(),
			routes: []
		}
	);
}

function loadFromStorage()
{
	storageObj = JSON.parse(localStorage.pointStorage);
}

function storageExists ()
{
	if (localStorage.pointStorage.length < 1)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function theTime()
{
	var d = new Date();
	var isoDate = d.toISOString();

	return isoDate;
}

function saveRouteUpdate ()
{
	storageObj.last_updated = theTime();
	storageObj.routes [ storageObj.routes.length -1 ] = currentRoute;

	localStorage.pointStorage = JSON.stringify(storageObj);
}

function createRoute ()
{
	routeIndex = storageObj.routes.length;

	storageObj.routes.push(
		{
			points: []
		}
	);

	saveRouteUpdate();
}

function addPointToRoute( pos )
{
	storageObj.last_updated = theTime();

	var currentRoute = storageObj.routes[ routeIndex ];
	currentRoute.points.push(
		{
			lat: pos.latitude,
			lon: pos.longitude,
			time: theTime()
		}
	);

	saveRouteUpdate();
}