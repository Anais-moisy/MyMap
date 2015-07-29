var MenuDisplay = {

	views:
	{
		home: "HOME",
		map: "MAP",
		add: "ADD",
		history: "HISTORY",
		info: "INFO"
	},

	currentView: "",

	miscButtons: function ()
	{
		if( this.hasClickHandler('.home-textbtn:eq(0)') )
		{
			return;
		}

		$('.home-textbtn').click(function(event) {
			if( $(this)[0].id === "mymapbtn" )
			{
				MenuDisplay.mapScreen();
				loadRoutes();
			}
			else if( $(this)[0].id === "addroutebtn" )
			{
				MenuDisplay.newRouteMenu();
			}
		});

		if( this.hasClickHandler('.start-btn') )
		{
			return;
		}

		$('.start-btn').click(function(event) {
			var route_name = $('.route_name_text').val();
			window.PointStorage.createRoute(route_name);
			MenuDisplay.mapScreen();
		});
	},

	activateMenu :function ()
	{

		if( this.hasClickHandler('.bottom-menu li:eq(0)') )
		{
			return;
		}

		$('.bottom-menu li').click(function(event) {
			var label = $(this).children('h4')[0].innerHTML;
			label = String(label).toUpperCase();

			if( label.indexOf("HOME") > -1 )
			{
				MenuDisplay.mainMenu();
			}
			else if ( label.indexOf("MAP") > -1 )
			{
				MenuDisplay.mapScreen();
			}
			else if ( label.indexOf("ROUTE") > -1 )
			{
				MenuDisplay.newRouteMenu();
			}
			else if ( label.indexOf("HISTORY") > -1 )
			{
				MenuDisplay.reviewRoutesMenu();
			}
			else if ( label.indexOf("SHARE") > -1 )
			{
				MenuDisplay.shareScreen();
			}
			else if ( label.indexOf("INFO") > -1 )
			{
				MenuDisplay.infoScreen();
			}
		});
	},

	mainMenu : function ()
	{
		if(this.currentView === this.views.home){ return; }
		this.currentView = this.views.home;

		if( $('#logo').length > 0 )
		{
			$('#logo').removeClass('main-logo-smallest');
			$('#logo').removeClass('main-logo-small');

			$('#logo').addClass('main-logo');
		}

		$('.main-interface').show();
		$('.textbtn-container').show();

		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.app-info').hide();
		$('.social-container').hide();
		$('.new-route-container').hide();
		$('.map-canvas').hide();

		clearMap();

	},

	newRouteMenu: function ()
	{
		if(this.currentView === this.views.add){ return; }
		this.currentView = this.views.add;

		if( $('#logo').length > 0 )
		{
			$('#logo').removeClass('main-logo-smallest');
			$('#logo').removeClass('main-logo');
			$('#logo').addClass('main-logo-small');
		}

		$('.textbtn-container').hide();
		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.app-info').hide();
		$('.social-container').hide();
		$('.map-canvas').hide();

		$('.main-interface').show();
		$('.new-route-container').show();

		clearMap();
	},

	reviewRoutesMenu: function ()
	{
		if(this.currentView === this.views.history){ return; }
		this.currentView = this.views.history;


		if( $('#logo').length > 0 )
		{
			$('#logo').removeClass('main-logo');
			$('#logo').removeClass('main-logo-small');

			$('#logo').addClass('main-logo-smallest');
		}

		$('.textbtn-container').hide();
		$('.new-route-container').hide();
		$('.social-container').hide();
		$('.app-info').hide();
		$('.map-canvas').hide();
		
		$('.main-interface').show();
		$('.open-selected-button').show();
		$('.route-review-container').show();

		clearMap();

		// how many routes?
		var numroutes = window.PointStorage.PointsObj.routes.length;

		// clear any shit from before
		$($('.route-review-container .review-section')[1]).empty();

		// list the routes
		for(var i=0; i<numroutes; i++)
		{
			var thisRoute = window.PointStorage.PointsObj.routes[i];

			$($('.route-review-container .review-section')[1]).append(
				"<div class='route-review-row'></div>"
			);

			var c = 3;
			while(c>0)
			{
				var column = $("<div class='route-column'></div>").appendTo($(".route-review-row:eq("+i+")"));
				var toAppend;

				switch (c)
				{
					case 3:
						// route name
						toAppend = thisRoute.name;
						break;
					case 2:
						// route date
						var date = new Date(thisRoute.last_updated);
						toAppend = date.toDateString();
						break;
					case 1:
						// select box
						toAppend = "<input name='"+thisRoute.name+"' row-index='"+i+"' type='checkbox'>";
						break;
				}

				column.append("<p>"+toAppend+"</p>");
				c--;
			}
			

		}

		if( this.hasClickHandler('.open-selected-button') )
		{
			return;
		}

		// listen on the button
		$('.open-selected-button').click(function(event)
		{
			var checkedIndexArray = [];
			var checkedInputs;

			// how many are ticked?
			if(numroutes < 1)
			{
				return;
			}
			
			checkedInputs = $(':checked');
			for(var i=0; i<checkedInputs.length; i++)
			{
				var thisIndex = $(checkedInputs[i]).attr('row-index');
				checkedIndexArray.push(thisIndex);
			}


			// show them
			MenuDisplay.mapScreen();
			loadRoutes(checkedIndexArray);
		});

		
	},

	infoScreen: function()
	{
		if(this.currentView === this.views.info){ return; }
		this.currentView = this.views.info;


		if( $('#logo').length > 0 )
		{
			$('#logo').removeClass('main-logo');
			$('#logo').removeClass('main-logo-smallest');

			$('#logo').addClass('main-logo-small');
		}


		$('.main-interface').show();
		$('.app-info').show();

		$('.social-container').hide();
		$('.textbtn-container').hide();
		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.map-canvas').hide();
		$('.new-route-container').css('display', 'none');

		clearMap();
	},

	shareScreen: function()
	{
		if( $('#logo').length > 0 )
		{
			$('#logo').removeClass('main-logo');
			$('#logo').removeClass('main-logo-smallest');

			$('#logo').addClass('main-logo-small');
		}

		$('.main-interface').show();
		$('.social-container').show();

		$('.app-info').hide();
		$('.textbtn-container').hide();
		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.new-route-container').hide();
		$('.map-canvas').hide();

		clearMap();
	},

	mapScreen: function()
	{
		if(this.currentView === this.views.map){ return; }
		this.currentView = this.views.map;

		$('.map-canvas').show();

		$('.main-interface').hide();
		$('.app-info').hide();
		$('.textbtn-container').hide();
		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.new-route-container').hide();
		$('.social-container').hide();

		initGoogleMap();
	},

	hasClickHandler: function(select)
	{
		if( findEventHandlers("click", select).length > 0 )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

};
