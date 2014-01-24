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