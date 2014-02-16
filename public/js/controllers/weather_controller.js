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

	selectedCity: function() {
		var cityId = this.get('currentCity.id');
		$.each(this.savedCities, function(index, city) {
			city.selected = (city.id === cityId) ? true : false;
		});

	}.observes('savedCities', 'currentCity'),

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
			$('<img src="../images/ajax-loader-16.gif">').appendTo(loader);
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

	/**
	 * Update the weather data for the city which is set to the currentCity property
	 */
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
		$.getJSON(uri, params, function(data, textStatus) { callback(data, textStatus); });
	},

	selectCity: function(cityId) {
		var me = this;
		if($.isNumeric(cityId)) {
			var city = me.get('savedCities').findBy('id', parseInt(cityId));

			// save selected city
			this.set('currentCity', city);

			// Update the weather view when window is closed.
			// Not updated immediately to minimze request.
			$('#weatherSettingsModal').one('hide.bs.modal', function() {
				me.updateWeather();
			});
		}
	},

	addSavedCity: function(cityId) {
		var savedCities = this.get('savedCities');
		var city = this.get('searchedCities').findBy('id', cityId);
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