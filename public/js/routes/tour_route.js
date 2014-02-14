EmberApp.TourRoute = EmberApp.AuthenticatedRoute.extend({
	// currently do nothing
});

EmberApp.TourDetailsRoute = EmberApp.AuthenticatedRoute.extend({

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

EmberApp.TourNewRoute = EmberApp.AuthenticatedRoute.extend({

    model: function () {
        return this.get("store").createRecord('tour');
    },

    setupController: function(controller, model) {
        controller.set('model', model);
    },

    renderTemplate: function() {
        this.render('tour/new', { into: 'application' });
    }
});