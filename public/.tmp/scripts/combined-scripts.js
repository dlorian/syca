(function() {

var EmberApp = window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true
});

/* Order and include as you please. */


})();

(function() {

EmberApp.ApplicationRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    return ['red', 'yellow', 'blue'];
  }
});


})();

(function() {

EmberApp.HomeRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    console.log('HomeRoute');
    EmberApp.Home.find();
  }
});


})();

(function() {

EmberApp.StatisticsRoute = Ember.Route.extend({

  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function () {
    console.log('StatisticsRoute');

    var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [28,48,40,19,96,27,100]
		}
	]
}

  }
});

})();

(function() {

EmberApp.TourRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function (param) {
    console.log('TourRoute');
    //console.log(param.id);
  }
});

EmberApp.TourDetailsRoute = Ember.Route.extend({
  // admittedly, this should be in IndexRoute and not in the 
  // top level ApplicationRoute; we're in transition... :-)
  model: function (param) {
    console.log('TourDetailsRoute');
    //console.log(param.id);
  }
});

EmberApp.TourNewRoute = Ember.Route.extend({

  model: function () {
    console.log('TourNewRoute');
    // create a new empty record for type tour
    return this.get("store").createRecord('tour');
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function() {
    this.render('tour/new', { into: 'application' });
  }

  
});

})();

(function() {

EmberApp.ToursRoute = Ember.Route.extend({
	model: function () {
    	// find only tours which are already saved on the backend
    	return this.store.find('tour', {'isNew': false});
	},

	setupController: function(controller, model) {
        controller.set('model', model);
  	}
});

})();

(function() {

EmberApp.HomeController = Ember.ObjectController.extend({
    
	recentToursNum : 3,

	recentTours : [
		{ 
			date: '01.08.2013',
			totalKm: '55,23',
			totalTime: '1:50:23'
		},
		{ 
			date: '02.08.2013',
			totalKm: '45,01',
			totalTime: '1:20:23'
		},
		{ 
			date: '03.08.2013',
			totalKm: '25,23',
			totalTime: '0:45:12'
		}
	],

	topTotalKm: [
		{ 
			date: '01.08.2013',
			totalKm: 72.10
		},
		{ 
			date: '02.08.2013',
			totalKm: 69.30,
		},
		{ 
			date: '03.08.2013',
			totalKm: 66.59
		}
	],

	topTime20: [
		{ 
			date: '01.08.2013',
			time: '32.10'
		},
		{ 
			date: '02.08.2013',
			time: '34.20',
		},
		{ 
			date: '03.08.2013',
			time: '34.21'
		}
	],

	topTime30: [
		{ 
			date: '01.08.2013',
			time: '52.10'
		},
		{ 
			date: '02.08.2013',
			time: '54.20',
		},
		{ 
			date: '03.08.2013',
			time: '54.21'
		}
	],

	topTopSpeed: [
		{ 
			date: '01.08.2013',
			speed: 50.12
		},
		{ 
			date: '02.08.2013',
			speed: 49.69,
		},
		{ 
			date: '03.08.2013',
			speed: 48.99
		}
	],

	topAvgSpeed: [
		{ 
			date: '01.08.2013',
			speed: 33.22
		},
		{ 
			date: '02.08.2013',
			speed: 32.39,
		},
		{ 
			date: '03.08.2013',
			speed: 32.33
		}
	],

	setRecentToursNum: function(num) {
		recentToursNum = num;
	},

	getRecentToursNum: function() {
		return recentToursNum;
	}
});

})();

(function() {

EmberApp.TourController = Ember.ObjectController.extend({
	// add: function() {
	// 	console.log('Add new tour of tour controller');
	// }
});

EmberApp.TourNewController = Ember.ObjectController.extend({
	// View-Porperties
	visible: false, 	// true to show message view
	success: false, // true to show that save was successful
	errMsg: null,	// errMsg to show if save was not successful

	actions: {
		add: function() {
			console.log('Add new Tour');
			var controller = this;

			var showMsg = function(wasSuccessful, errMsg) {
				console.log('Show message view');
				controller.set('visible', true);
				controller.set('success', wasSuccessful);
				controller.set('errMsg', errMsg);
			}

			var onSuccess = function(resp) {
				showMsg(true);
			};
			var onFail = function(resp) {
				showMsg(true, resp.error);
			};

			// do save of tour
			this.get('model').save().then(onSuccess, onFail);		
		},
		hideMsgView: function() {
			var controller = this;
			// hide the message view if button was clicked
			$('#messageView').fadeOut(400, function(){
				// mark view invisible
				controller.set('visible', false);
			});
		}
	}
	
});

EmberApp.TourEditController = Ember.ObjectController.extend({
	update: function() {
		
	}
});

EmberApp.TourDetailsController = Ember.ObjectController.extend({
	update: function() {
		
	}
});



})();

(function() {

EmberApp.ToursController = Ember.ArrayController.extend({

	first: true,

	isFirst: function() {
		if(first === true) {
			first = false;
			return true;
		}
		return false;
	},

	getTour: function(tour) {
		console.log('GetTour of ToursController');
		console.log(tour);
		tour.set('id', tour.get('_id'));
		this.transitionToRoute('tour.details', tour );
	}
});

})();

(function() {

EmberApp.WeatherController = Ember.ObjectController.extend({
	// ----------------------------
	// Used for representing the ui
	weather: {},		// Holds the weather data for the current city.
	currentCity: {},	// Holds the city which is selected and saved by the user.	
	savedCities: [],	// All cities the user has saved as his favorites.
	searchedCities: [],	// Temp array of cities. Filled with the response of 
						// search request.
	ajaxLoader: null,	// Holds the necessary loader div element 
	// ----------------------------

	// base config of the view
	config: {
		baseUri: '/api/weather',
		storageKey: 'weatherView',
		$settingsLoader: null,
		$weatherLoader: null  
	},

	// CSS-Class used for displaying the correct icon in the view.
	icon: null,

	// Mapping of icon codes to css class for displaying correct weather icon
	iconMapping: {
		i01d: "wi-day-sunny",
		i01n: "wi-night-clear",
		i02d: "wi-day-sunny-overcast",
		i02n: "wi-day-sunny-overcast",
		i03d: "wi-cloudy",
		i03n: "wi-cloudy",
		i04d: "wi-cloudy",
		i04n: "wi-cloudy",
		i09d: "wi-showers",
		i09n: "wi-night-showers",
		i10d: "wi-rain",
		i10n: "wi-rain",
		i11d: "wi-thunderstorm",
		i11n: "wi-thunderstorm",
		i13d: "wi-snow",
		i13n: "wi-snow",
		i50d: "wi-fog",
		i50n: "wi-fog"
	},

	isInitialized: false,	// Flag to mark modal window as initalized

	init: function() {
		var me = this;
		var config = this.config;

		//Initalize the loader div of the view and the modal dialog
		$(document).ready(function(){
			config.$settingsLoader = $('#weatherSettingsModal').find('#settingsLoader');
			config.$weatherLoader = $('#weatherView').find('#weatherLoader');

			config.$weatherLoader.hide();
			config.$settingsLoader.hide();

			me.set('ajaxLoader', config.$weatherLoader);

			me.loadSettings();
			me.updateWeather();
			
		}).ajaxStart(function() {
			var loader = me.get('ajaxLoader');
			loader.show();
			$('<img src="../images/ajax-loader.gif">').appendTo(loader);
		}).ajaxStop(function() {
			me.get('ajaxLoader').empty().hide();
		});
	},

	initModalDialog: function() {
		var me = this;
		this.set('ajaxLoader', this.config.$settingsLoader);
		if(!this.isInitialized) {
			$('#weatherSettingsModal').on('hide.bs.modal', function() {
				me.set('ajaxLoader', me.config.$weatherLoader);
				me.storeSettings();
			});

			// add click listener on radio buttons, for selecting a city
			$('#cityList').find('input:radio').click(function(){
				me.selectCity($(this).val());
			});

			this.isInitialized = true;
		}			
	},

	storeSettings: function() {
		if(!localStorage) {
			throw new Error('LocalStorage is not supported');
		}

		// set up settings object
		var settings = {
			city: this.get('currentCity'),
			cities: this.get('savedCities')
		};
		localStorage.setItem(this.config.storageKey, JSON.stringify(settings));
	},

	loadSettings: function() {
		if(!localStorage) {
			throw new Error('LocalStorage is not supported');
		}

		var jsonSettings = localStorage.getItem(this.config.storageKey);
		if(jsonSettings) {
			var settings =  JSON.parse(jsonSettings);
			if(settings) {
				this.set('currentCity', settings.city);
				this.set('savedCities', settings.cities);
			}
		}		
	},

	updateWeather: function() {
		var controller = this;
		var cityId = null;
		if(this.currentCity) {
			cityId = this.currentCity.id;
		}
		controller.loadFromServer(controller.config.baseUri, { id: cityId }, function(data) {
			controller.set('weather', data);
			if(data.icon) {
				// add icon prefix
				var index = 'i' + data.icon;
				controller.set('icon', controller.iconMapping[index]);
			}
		});
	},

	searchCity: function(city) {
		var controller = this;
		var uri = this.config.baseUri + '/find';
		this.get('searchedCities').clear();
		this.loadFromServer(uri, { city: city }, function(data) {
			if(data.cities) {
				data.cities.forEach(function(city, index, arr){
					arr[index].fullName = (!city.country) ? city.name : city.name + ' - ' + city.country;
				});
			}
			controller.set('searchedCities', data.cities);
		});
	},

	loadFromServer: function(uri, params, callback) {
		$.getJSON(uri, params, function(data, textStatus, jqXHR) { callback(data); });
	},

	selectCity: function(cityId) {
		if($.isNumeric(cityId)) {
			var id = parseInt(cityId);
			var savedCities = this.get('savedCities');
			var city = savedCities.findBy('id', id);
			this.set('currentCity', city);
		}	
	},

	addSavedCity: function(cityId) {
		var savedCities = this.get('savedCities');
		var searchedCities = this.get('searchedCities');
		var city = searchedCities.findBy('id', cityId);
		if(city) {
			savedCities.addObject(city);
		}		
	},

	removeSavedCity: function(cityId) {
		var savedCities = this.get('savedCities');
		var city = savedCities.findBy('id', cityId);
		if(city) {
			savedCities.removeObject(city);
		}
	},

	actions: {
		refresh: function() {
			this.updateWeather();
		},
		search: function() {
			var city = $('#searchCityTextField').val();
			this.searchCity(city);
		},
		showSettings: function() {
			this.initModalDialog();	
			// show modal dialog
			$('#weatherSettingsModal').modal();			
		},
		addCity: function(cityId) {
			this.addSavedCity(cityId);
		},
		removeCity: function(cityId) {
			this.removeSavedCity(cityId);
		}
	}
});

})();

(function() {

EmberApp.Home = DS.Model.extend({

});

})();

(function() {

EmberApp.Times = DS.Model.extend({
	time20: DS.attr('number'),
	time30: DS.attr('number'),
	totalTime: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});

})();

(function() {

EmberApp.Tour = DS.Model.extend({
	// General
	date: DS.attr('date'),
	description: DS.attr('string'),

	// Times
	time20: DS.attr('number'),
	time30: DS.attr('number'),
	totalTime: DS.attr('number'),

	// Track
	totalKm: DS.attr('number'),
	avgSpeed: DS.attr('number'),
	topSpeed: DS.attr('number'),
	
	// Weather
	condition: DS.attr('string'),
	temperature: DS.attr('number'),
	windDirection: DS.attr('string'),
	windSpeed: DS.attr('number'),
	windStrength: DS.attr('number'),
	windBlasts: DS.attr('number')
});

// TODO: in den Controller auslagern!!
EmberApp.weatherCondition = ['Sonnig', 'Bewölkt', 'Regen', 'Leichter Regen'];
EmberApp.windDirection = ['Nord','Nord-Ost', 'Ost', 'Süd-Ost', 'Süd', 'Süd-West', 'West', 'Nord-West'];

})();

(function() {

EmberApp.Track = DS.Model.extend({
	totalKm: DS.attr('number'),
	avgSpeed: DS.attr('number'),
	topSpeed: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});

})();

(function() {

EmberApp.Weather = DS.Model.extend({
	condition: DS.attr('string'),
	temperature: DS.attr('number'),
	windDirection: DS.attr('string'),
	windSpeed: DS.attr('number'),
	windStrength: DS.attr('number'),
	windBlasts: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});

})();

(function() {

EmberApp.MessageView = Ember.View.extend({
	templateName: 'views/message_view'
});

})();

(function() {

EmberApp.WeatherView = Ember.View.extend({
	templateName: 'views/weather_view',
	
	init: function() {
		// create a controller instance used for this view
		this.set('controller', EmberApp.WeatherController.create());
	}
});

})();

(function() {

EmberApp.Router.map(function () {

	this.resource('home');

	this.resource('tours', { path: 'tours'});

	this.resource('tour', { path: 'tour' }, function() {
		this.route('details', {path: '/:tour_id'}),
		this.route('new');	
	});

	this.resource('statistics', { path: 'statistics' });
  
});

})();

(function() {

EmberApp.Store = DS.Store.extend({
  revision: 13 // Defines the revision for the used DS.Store implementation
});

DS.RESTAdapter.reopen({
    namespace: 'api' // Defines the path for backend services 
});

// Custom data type especially for object ids. Normal 
// DS.attr('number') does not provide numbers at such 
// size as it is used for object ids by the backend.
// DS.RESTAdapter.registerTransform('objectId', {
//   serialize: function(value) {
//     return value
//   },
//   deserialize: function(value) {
//     return value
//   }
// });

EmberApp.ObjectIdTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },
  serialize: function(deserialized) {
    return deserialized;
  }
});


/* Not yet implemented!
DS.RESTAdapter.map('EmberApp.Tour',{
    track:{
        embedded:'always'
    }
})
*/


})();