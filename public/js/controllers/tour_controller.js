EmberApp.TourController = Ember.ObjectController.extend({
	
});

EmberApp.TourDetailsController = Ember.ObjectController.extend({
	isDisabled: true,

	setDisabled: function(disabled) {
		this.set('isDisabled', disabled);
	},

	actions: {
		setEditable: function() {
			this.setDisabled(false);
		},

		save: function() {
			debugger
			this.get('model').changedAttributes();
			var desc = this.get('model').get('description');
			this.get('model').save().then(function(){
				console.log('save successful');
			}, function(){
				console.log('save failed');
			});	
		}
	}
});

EmberApp.TourNewController = Ember.ObjectController.extend({
	// View-Porperties
	visible: false, // true to show message view
	success: false, // true to show that save was successful
	errMsg: null,	// errMsg to show if save was not successful

	routeDeactivated: function() {
		// when the routs get changed, the deactivate hook is triggered
		// then set the state of the controller to default state
		this.set('visible', false);
		this.set('success', false);				
		this.set('errMsg', 	null);
	},

	actions: {
		add: function() {
			console.log('Add new Tour');
			var controller = this;

			var showMsg = function(wasSuccessful, errMsg) {
				controller.set('visible', true);
				controller.set('success', wasSuccessful);
				controller.set('errMsg',  errMsg);
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