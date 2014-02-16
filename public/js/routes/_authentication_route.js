EmberApp.AuthenticatedRoute = Ember.Route.extend({

    // beforeModel: function(transition) {
    //     debugger
    //     // var me = this;
    //     // var loginController = this.controllerFor('login');

    //     // return loginController.checkLoggedIn().then(function(loggedInUser) {
    //     //     if (!loggedInUser.isLoggedIn) {
    //     //         me.redirectToLogin(transition);
    //     //     }
    //     // });
    // },

    // afterModel: function() {
    //     debugger
    // },

    // redirectToLogin: function(transition) {
    //     var loginController = this.controllerFor('login');
    //     loginController.set('attemptedTransition', transition);
    //     this.transitionTo('login');
    // },

    // actions: {
    //     error: function(reason, transition) {
    //         if (reason.status === 401) {
    //             this.redirectToLogin(transition);
    //         }
    //         else {
    //             alert('Something went wrong');
    //         }
    //     }
    // }
});