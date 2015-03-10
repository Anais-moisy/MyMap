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
	if ( !localStorage.pointStorage )
	{
		return false;
	}
	else if ( localStorage.pointStorage.length < 1 )
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
	localStorage.pointStorage = JSON.stringify(storageObj);
}

function createRoute (named)
{
	routeIndex = storageObj.routes.length;

	storageObj.routes.push(
		{
			points: [],
			name: named
		}
	);

	saveRouteUpdate();
}

function addPointToRoute( pos )
{
	var currentRoute = storageObj.routes[ routeIndex ];
	currentRoute.points.push(
		{
			vals: [pos.latitude, pos.longitude],
			time: theTime()
		}
	);

	saveRouteUpdate();
}

function storageToPointCloud()
{

}

function getPointsLength ( )
{
	if( routeIndex === -1 )
	{
		return -1;
	}
	else
	{
		return storageObj.routes[routeIndex].points.length;
	}
}

function getPreviousPoint ()
{
	return storageObj.routes[routeIndex].points[getPointsLength() - 2];
}