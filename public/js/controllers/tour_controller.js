EmberApp.TourDetailsController = Ember.ObjectController.extend(Ember.Evented, {
	// Property to set the state of the input fields
	isDisabled: true,

	isNotDisabled: function() {
		return !this.get('isDisabled');
	}.property('isDisabled'),

	isNotDirty: function() {
		return !this.get('model.isDirty');
	}.property('model.isDirty'),

	save: function() {
		var controller = this;

		var onSuccess = function() {
			controller.setDisabled(true);
			controller.trigger('successMessage');
		};

		var onFail = function(resp) {
			controller.setDisabled(true);
			controller.trigger('failureMessage', {error: resp.error});
		};

		// Try to save changes of the tour
		this.get('model').save().then(onSuccess, onFail);
	},

	actions: {
		setEditable: function() {
			this.toggleProperty('isDisabled');
		},

		save: this.save
	}
});

EmberApp.TourNewController = Ember.ObjectController.extend(Ember.Evented, {

	save: function() {
		var controller = this;

		// Success callback for saving tour
		var onSuccess = function() {
			controller.trigger('successMessage');
		};

		// Failure callback for saving tour
		var onFail = function(response) {
			if(response.responseJSON) {
				var error = response.responseJSON.error;
				if(error && error.type === 'ValidationError') {
					for(var validationError in error.errors) {
						var failureObject = {
							error: error.errors[validationError].message
						};
						controller.trigger('failureMessage', failureObject);
					}
				}
			}
			else {
				controller.trigger('failureMessage', {error: resp.error});
			}
		};

		// Try to save the new tour
		this.get('model').save().then(onSuccess, onFail);
	},

	actions: {
		add: function() { this.save(); }
	}
});