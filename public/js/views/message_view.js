EmberApp.MessageView = Ember.View.extend({
	templateName: 'views/message_view',

	// View-Porperties
	visible: false,		// true to show message view
	success: false,		// true to show that save was successful
	errorMessages: [],	// errMsg to show if save was not successful

	isVisible: function() {
		var visible = this.get('visible');
		var errorMessages = this.get('errorMessages');

		//return (errorMessages.length !== 0 && visible);
		return visible;
	}.property('errorMessages', 'visible'),

	init: function() {
		// call super to initialize the proprties of the view
		this._super();

		var me = this, controller = this.get('controller');

		controller.on('successMessage', function() {
			me.showMessage(true); // true to show success message
		});

		controller.on('failureMessage', function(err) {
			me.showMessage(false, err.error); // false to show success message
		});
	},

	willDestroyElement: function() {
		// when the routs get changed, the deactivate hook is triggered
		// then set the state of the controller to default state
		this.setProperties({
			visible: false,
			success: false,
			errMsg: []
		});
	},

	showMessage: function(success, message) {
		this.set('visible', true);
		// if error messages have at least one error object, the success message should not be shown
		// TODO:verify this
		this.set('success', success);

		if(message) {
			var errorMessages = this.get('errorMessages');
			errorMessages.pushObject({ message: message });
		}
	},

	actions: {
		hide: function(message) {
			var me = this;
			debugger
			if(message) {
				var errorMessages = this.get('errorMessages');
				errorMessages.removeObject(message);
			}
			if(errorMessages.length === 0) {
				$('#messageView').fadeOut(200, function(){
					me.set('visible', false);
				});
			}
		},
	}
});