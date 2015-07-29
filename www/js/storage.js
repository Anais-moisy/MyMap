
if ( localStorage.getItem("pointStorage") === null )
{
   localStorage.pointStorage = JSON.stringify(
		{
			last_updated: new Date().toISOString(),
			routes: []
		}
	);
}


window.PointStorage = {

PointsObj: JSON.parse(localStorage.pointStorage),

theTime: function ()
{
	var d = new Date();
	var isoDate = d.toISOString();

	return isoDate;
},

saveRouteUpdate:function ()
{
	window.PointStorage.PointsObj.last_updated = this.theTime();
	localStorage.pointStorage = JSON.stringify(window.PointStorage.PointsObj);
},

createRoute:function (named)
{
	window.routeIndex = this.PointsObj.routes.length;

	var n;

	if(typeof named === "undefined")
	{
		n = new Date().toDateString();
	}
	else
	{
		n = named;
	}

	var theObj = window.PointStorage.PointsObj;

	var route =
	{
		points: [],
		name: n,
		last_updated: this.theTime()
	};

	theObj.routes.push(route);

	this.saveRouteUpdate();

	return n;
},

addPointToRoute: function ( pos )
{
	var last = window.PointStorage.PointsObj.routes.length - 1;
	var currentRoute = window.PointStorage.PointsObj.routes[last];
	currentRoute.last_updated = this.theTime();
	currentRoute.points.push(
		{
			vals: [pos.latitude, pos.longitude],
			time: this.theTime()
		}
	);

	this.saveRouteUpdate();
},

storageToPointCloud: function ()
{

},

getPointsLength: function  ( )
{
	if( routeIndex === -1 )
	{
		return -1;
	}
	else
	{
		return window.PointStorage.PointsObj.routes[window.routeIndex].points.length -1;
	}
},

getPreviousPoint: function  ()
{
	return window.PointStorage.PointsObj.routes[window.routeIndex].points[getPointsLength() - 2];
},

getRouteAtIndex: function (index)
{
	return window.PointStorage.PointsObj.routes[index];
}

}; // end object