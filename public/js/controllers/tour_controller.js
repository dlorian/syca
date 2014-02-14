
EmberApp.TourController = Ember.ObjectController.extend(Ember.Evented, {
	// do nothing
});

EmberApp.TourFormController = Ember.ObjectController.extend(Ember.Evented, {
	// do nothing
});

EmberApp.TourDetailsController = Ember.ObjectController.extend(Ember.Evented, {
	// Property to set the state of the input fields
	isDisabled: true,

	isNotDisabled: function() {
		return !this.get('isDisabled');
	}.property('isDisabled'),

	isNotDirty: function() {
		return !this.get('model.isDirty');
	}.property('model.isDirty'),

	setDisabled: function(disabled) {
		this.set('isDisabled', disabled);
	},

	save: function() {
		var controller = this;

		var onSuccess = function() {
			controller.setDisabled(true);
			controller.trigger('saveSuccessfull');
		};

		var onFail = function(resp) {
			controller.setDisabled(true);
			controller.trigger('saveFailed', {error: resp.error});
		};

		this.get('model').save().then(onSuccess, onFail);
	},

	actions: {
		setEditable: function() {
			this.setDisabled(false);
		},

		save: this.save
	}
});

EmberApp.TourNewController = Ember.ObjectController.extend(Ember.Evented, {

	save: function() {
		var controller = this;

		var onSuccess = function() {
			controller.trigger('saveSuccessfull');
		};

		var onFail = function(resp) {
			controller.trigger('saveFailed', {error: resp.error});
		};

		this.get('model').save().then(onSuccess, onFail);
	},

	actions: {
		add: function() { this.save(); }
	}
});