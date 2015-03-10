var MenuDisplay = {

	miscButtons: function ()
	{
		$('.home-textbtn').bind('tap', function(event) {
			if( $(this)[0].id === "mymapbtn" )
			{
				MenuDisplay.mapScreen();
			}
			else if( $(this)[0].id === "addroutebtn" )
			{
				MenuDisplay.newRouteMenu();
			}
		});
	},

	activateMenu :function ()
	{
		$('.bottom-menu li').bind('tap', function(event) {
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

		var div = $(".route-review-container div:nth-child(2)");
		var count = div.children().length;

		console.log('Number of routes displayed: '+count);

		clearMap();
	},

	infoScreen: function()
	{
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
		$('.map-canvas').show();

		$('.main-interface').hide();
		$('.app-info').hide();
		$('.textbtn-container').hide();
		$('.open-selected-button').hide();
		$('.route-review-container').hide();
		$('.new-route-container').hide();
		$('.social-container').hide();

		initGoogleMap();
	}

};
