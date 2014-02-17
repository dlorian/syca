EmberApp.AuthenticatedRoute = Ember.Route.extend({

    beforeModel: function(transition) {
        // transition to index or login is allowed wtihout logging in
        if(transition.targetName === 'index' || transition.targetName === 'login') {
            return;
        }

        // Verify that the user is logged in.
        // If not, redirect to index for checking authentication state.
        var loginController = this.controllerFor('login')
        if(!loginController.get('loggedInUser.isLoggedIn')) {
            this.redirectToIndex(transition);
        }
    },

    redirectToIndex: function(transition) {
        var loginController = this.controllerFor('login');
        loginController.set('attemptedTransition', transition);
        this.transitionTo('index');
    }
});