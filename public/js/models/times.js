EmberApp.Times = DS.Model.extend({
	time20: DS.attr('number'),
	time30: DS.attr('number'),
	totalTime: DS.attr('number'),

	tour: DS.belongsTo('EmberApp.Tour')
});