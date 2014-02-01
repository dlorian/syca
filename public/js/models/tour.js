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
	windBlasts: DS.attr('number'),

	// required for form and model validation
	validation: {
		avgSpeed: {
			presence: true,
			pattern: '([0-9]{2}:)?[0-9]{2}:[0-9]{2}'
		}
	}
});

// TODO: in den Controller auslagern!!
EmberApp.weatherCondition = ['Sonnig', 'Bewölkt', 'Regen', 'Leichter Regen'];
EmberApp.windDirection = ['Nord','Nord-Ost', 'Ost', 'Süd-Ost', 'Süd', 'Süd-West', 'West', 'Nord-West'];