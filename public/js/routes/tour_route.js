EmberApp.TourRoute = Ember.Route.extend({
	// currently do nothing
});

EmberApp.TourDetailsRoute = Ember.Route.extend({

    model: function (param) {
	   return this.get('store').find('tour', param.tour_id);
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function() {
        this.render('tour/details', { into: 'application' });
    }
});

EmberApp.TourNewRoute = Ember.Route.extend({

    model: function () {
        // create a new empty record for type tour
        return this.get("store").createRecord('tour');
    },

    deactivate: function() {
        // set the controller state to default
        this.controllerFor('tour.new').routeDeactivated();
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function() {
        this.render('tour/new', { into: 'application' });
    }
});