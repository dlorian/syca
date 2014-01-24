EmberApp.ToursRoute = Ember.Route.extend({
	model: function () {
    	// find only tours which are already saved on the backend
    	return this.store.find('tour', {'isNew': false});
	},

	setupController: function(controller, model) {
        controller.set('model', model);
  	}
});