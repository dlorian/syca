EmberApp.ToursController = Ember.ArrayController.extend({

	offset: 0,
	limit: 10,

	getTour: function(tour) {
		this.transitionToRoute('tour.details', tour);
	}
});