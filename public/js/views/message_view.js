EmberApp.MessageView = Ember.View.extend({
	templateName: 'views/message_view',

	// View-Porperties
	visible: false, // true to show message view
	success: false, // true to show that save was successful
	errMsg: null,	// errMsg to show if save was not successful

	init: function() {
		// call super to initialize the proprties of the view
		this._super(); 

		var me = this;
		var controller = this.get('controller');

		controller.on('saveSuccessfull', function() {
			me.showMsg(true)
		});

		controller.on('saveFailed', function(err) {
			me.showMsg(true, err.error)
		});
	},
	
	willDestroyElement: function() {
		// when the routs get changed, the deactivate hook is triggered
		// then set the state of the controller to default state
		this.set('visible', false);
		this.set('success', false);				
		this.set('errMsg', 	null);
	},

	showMsg: function(success, errMsg) {
		this.set('visible', true);
		this.set('success', success);
		if(errMsg) { this.set('errMsg', errMsg); }
	},

	actions: {
		hideMsg: function() {
			var me = this;
			$('#messageView').fadeOut(400, function(){
				me.set('visible', false);
			});
		},
	}
});