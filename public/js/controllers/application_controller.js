EmberApp.ApplicationController = Ember.ObjectController.extend({
    needs: ['login'],

    loggedInUser: function() {
        return this.get('controllers.login.loggedInUser');
    }.property('controllers.login.loggedInUser'),

    initialized: false, // Holds state if controller is initalized.

    errorMessage: null,

    init: function() {
        var me = this,
            loginController = this.get('controllers.login');

        // Check if the user is still logged in via session cookie
        loginController.checkLoggedIn({
            success: function(loggedInUser) {
                // If the user is not logged in redirect to login page.
                if(!loggedInUser.isLoggedIn) {
                    var transition = me.get('target.router.activeTransition');
                    me.redirectToLogin(transition);
                }
                else {
                    // If the user was redirected to index page, go back
                    var attemptedTransition = loginController.get('attemptedTransition');
                    if (attemptedTransition) {
                        attemptedTransition.retry();
                        loginController.set('attemptedTransition', null);
                    }
                }

                // mark the application as initialized to show the outlet
                me.set('initialized', true);
            },
            failure: function() {
                me.set('errorMessage', 'Beim Laden der Anmeldeinformationen ist ein Fehler aufgetreten.');
            }
        });
    },

    redirectToLogin: function(transition) {
        // Save the transition for redirecting after a successfull login
        this.set('controllers.login.attemptedTransition', transition);
        this.transitionToRoute('login');
    },
});