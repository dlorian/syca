EmberApp.TourController = Ember.ObjectController.extend({
	// add: function() {
	// 	console.log('Add new tour of tour controller');
	// }
});

EmberApp.TourNewController = Ember.ObjectController.extend({
	// View-Porperties
	visible: false, 	// true to show message view
	success: false, // true to show that save was successful
	errMsg: null,	// errMsg to show if save was not successful

	actions: {
		add: function() {
			console.log('Add new Tour');
			var controller = this;

			var showMsg = function(wasSuccessful, errMsg) {
				console.log('Show message view');
				controller.set('visible', true);
				controller.set('success', wasSuccessful);
				controller.set('errMsg', errMsg);
			}

			var onSuccess = function(resp) {
				showMsg(true);
			};
			var onFail = function(resp) {
				showMsg(true, resp.error);
			};

			// do save of tour
			this.get('model').save().then(onSuccess, onFail);		
		},
		hideMsgView: function() {
			var controller = this;
			// hide the message view if button was clicked
			$('#messageView').fadeOut(400, function(){
				// mark view invisible
				controller.set('visible', false);
			});
		}
	}
	
});

EmberApp.TourEditController = Ember.ObjectController.extend({
	update: function() {
		
	}
});

EmberApp.TourDetailsController = Ember.ObjectController.extend({
	update: function() {
		
	}
});

