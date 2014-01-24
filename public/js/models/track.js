EmberApp.Track = DS.Model.extend({
	totalKm: DS.attr('number'),
	avgSpeed: DS.attr('number'),
	topSpeed: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});