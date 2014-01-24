EmberApp.WeatherView = Ember.View.extend({
	templateName: 'views/weather_view',
	
	init: function() {
		// create a controller instance used for this view
		this.set('controller', EmberApp.WeatherController.create());
	}
});