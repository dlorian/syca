
EmberApp.TourController = Ember.ObjectController.extend({
	
});

EmberApp.TourDetailsController = Ember.ObjectController.extend(Ember.Evented, {
	// Property to set the state of the input fields
	isDisabled: true,

	setDisabled: function(disabled) {
		this.set('isDisabled', disabled);
	},

	actions: {
		setEditable: function() {
			this.setDisabled(false);
		},

		save: function() {
			var controller = this;

			var onSuccess = function(resp) {
				controller.setDisabled(true);
				controller.trigger('saveSuccessfull');
			};

			var onFail = function(resp) {
				controller.setDisabled(true);
				controller.trigger('saveFailed', {error: resp.error});
			};

			this.get('model').save().then(onSuccess, onFail);
		}
	}
});

EmberApp.TourNewController = Ember.ObjectController.extend(Ember.Evented, {

	actions: {
		add: function() {
			var controller = this;

			var onSuccess = function(resp) {
				controller.trigger('saveSuccessfull');
			};

			var onFail = function(resp) {
				controller.trigger('saveFailed', {error: resp.error});
			};
 
			this.get('model').save().then(onSuccess, onFail);		
		}
	}	
});