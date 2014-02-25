EmberApp.LoginController = Ember.Controller.extend(Ember.Evented, {

    initialized: false, // holds state if controller is already initalized

    loggedInUser: {
        user: null,
        isLoggedIn: false
    },

    isLoggingIn: false, // Holds state if the controller attempepts to login in a user

    errorMessage: null,

    /**
     * Check if the user is still logged via the session cookie.
     * @param {Object} config object with success and failure callback properties.
     */
    checkLoggedIn: function(config) {
        var me      = this,
            success = config.success,
            failure = config.failure;

        // if login controller is already intialized return curent loggedin user
        if(me.get('initialized') === true) {
            if (success && typeof(success) === "function") {
                success(me.get('loggedInUser'));
            }
            return;
        }

        var successCallback = function(response) {
            if(response.success === true) {
                me.set('loggedInUser', { isLoggedIn: true, user: response.user });
            }

            me.set('initialized', true);

            if (success && typeof(success) === "function") {
                success(me.get('loggedInUser'));
            }
        }

        this.getLogin(successCallback, failure);
    },

    reset: function() {
        this.setProperties({
            'username': null,
            'password': null,
            'errorMessage': null
        });
    },

    getLogin: function(success, failure) {
        Ember.$.get('/api/login').done(function(response) {
            if (success && typeof(success) === "function") {
                success(response);
            }
        }).fail(function() {
            if (failure && typeof(failure) === "function") {
                failure({errMsg: 'Error while loading.'});
            }
        });
    },

    doLogin: function() {
        var me = this;
        // Delete exisitng error message before login attempt
        me.set('errorMessage', null);
        me.set('isLoggingIn', true);

        var data = {
            username: this.get('username'),
            password: CryptoJS.SHA3(this.get('password')).toString() // hash password immediately
        }

        // Do the login request
        Ember.$.post('/api/login', data).done(function(response) {
            // login success
            if(response.success === true) {
                // save logged in User state.
                me.set('loggedInUser', { isLoggedIn: true, user: response.user });
                var attemptedTransition = me.get('attemptedTransition');
                if (attemptedTransition) {
                    attemptedTransition.retry();
                    me.set('attemptedTransition', null);
                }
                else {
                    // Redirect to 'home' by default.
                    me.transitionToRoute('home');
                }
            }
            else {
                var errText = 'Es ist ein Fehler bei der Anmeldung aufgetreten.';
                if(response.msg) {
                    errText = response.msg;
                }
                me.set('errorMessage', errText);
            }
        }).fail(function() {
            // login failure
            me.set('errorMessage', 'Es ist ein Fehler aufgetreten.');
        }).always(function() {
            // hide loader always
            me.set('isLoggingIn', false);
        })
    },

    doLogout: function() {
        var me = this;
        Ember.$.post('/api/logout').done(function(response) {
            // logout success
            me.transitionTo('login');
            me.set('loggedInUser', {isLoggedIn: false, user: null });
        }).fail(function() {
            // logout failure
        });
    },

    actions: {
        login: function() {
            this.doLogin();
        },

        logout: function() {
            this.doLogout();
        }
    }

});

EmberApp.LoginPanelController = Ember.Controller.extend({
    needs: ['login'],

    loggedInUser: function() {
        return this.get('controllers.login.loggedInUser');
    }.property('controllers.login.loggedInUser'),

    actions: {
        login: function() {
            this.transitionTo('login');
        },

        logout: function() {
            // log out current user
            this.get('controllers.login').logout();
        }
    }
});