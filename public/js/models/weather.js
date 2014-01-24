EmberApp.Weather = DS.Model.extend({
	condition: DS.attr('string'),
	temperature: DS.attr('number'),
	windDirection: DS.attr('string'),
	windSpeed: DS.attr('number'),
	windStrength: DS.attr('number'),
	windBlasts: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});