EmberApp.ToursRoute = EmberApp.AuthenticatedRoute.extend({

	model: function () {
		var controller = this.controllerFor('tours');
        return this.store.findQuery('tour', {'isNew': false, offset: controller.offset, limit: controller.limit});
	},

	setupController: function(controller, model) {
        controller.set('model', model);
    }
});