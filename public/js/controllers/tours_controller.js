EmberApp.ToursController = Ember.ArrayController.extend({

	offset: 0,
	limit: 10,
	first: true,

	isFirst: function() {
		if(first === true) {
			first = false;
			return true;
		}
		return false;
	},

	init: function() {
		this._super();
		$(document).ready(function() {
				
			$('#toursList a').click(function(){
				debugger
				console.log('click');
			});			
		});
	},

	getTour: function(tour) {
		this.transitionToRoute('tour.details', tour);
	}
});