EmberApp.LoginRoute = EmberApp.AuthenticatedRoute.extend({

    setupController: function(controller) {
        controller.reset();
    }
});
