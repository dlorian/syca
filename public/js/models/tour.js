EmberApp.Tour = DS.Model.extend({
	// General
	date: DS.attr('date', {
		defaultValue: function() { 
			return moment().format("DD.MM.YYYY"); 
		}
	}),
	description: DS.attr('string'),

	// Times
	time20: DS.attr('time'),
	time30: DS.attr('time'),
	totalTime: DS.attr('time'),

	// Track
	totalKm: DS.attr('string'),
	avgSpeed: DS.attr('string'),
	topSpeed: DS.attr('string'),
	
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
			pattern: '^([0-9]{2}\:)?[0-9]{2}\:[0-9]{2}$'
		}
	}
});

// TODO: in den Controller auslagern!!
EmberApp.weatherCondition = ['Sonnig', 'Bewölkt', 'Regen', 'Leichter Regen'];
EmberApp.windDirection = ['Nord','Nord-Ost', 'Ost', 'Süd-Ost', 'Süd', 'Süd-West', 'West', 'Nord-West'];