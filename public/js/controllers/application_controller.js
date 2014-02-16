EmberApp.ApplicationController = Ember.ObjectController.extend({
    needs: ['login'],

    loggedInUser: function() {
        return this.get('controllers.login.loggedInUser');
    }.property('controllers.login.loggedInUser'),

    initialized: false,


    init: function() {
        debugger
        var me = this;
        var transition = this.get('target.router.activeTransition');
        var loginController = this.get('controllers.login').checkLoggedIn().then(
            function(loggedInUser) {
                // success
                if(!loggedInUser.isLoggedIn) {
                   me.redirectToLogin(transition);
                }
                me.set('initialized', true);
            },
            function() {
                // failure
            });
    },

    redirectToLogin: function(transition) {
        var loginController = this.controllerFor('login');
        loginController.set('attemptedTransition', transition);
        this.transitionTo('login');
    },
});