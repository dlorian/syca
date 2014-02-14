EmberApp.LoginController = Ember.Controller.extend(Ember.Evented, {

    loggedInUser: null,
    errorMessage: null,

    init: function() {
        var me = this;
        this._super();
        // On start up, check if the user is logged via the session
        debugger
        Ember.$.get('/api/login').done(function(response){
            if(response.success === true) {
                me.set('loggedInUser', { loggedIn: true, user: response.user });
            }
        }).fail(function() {
            debugger
        });
    },

    reset: function() {
        this.setProperties({
            'username': null,
            'password': null,
            'errorMessage': null
        });
    },

    login: function() {
        var me = this;
        var hashedPassword = CryptoJS.SHA3(this.get('password'));
        // Prepare login data
        var data = {
            username: this.get('username'),
            password: hashedPassword.toString()

        }

        // Do the login request
        Ember.$.post('/api/login', data).done(function(response) {
            if(response.success === true) {
                // save logged in User state.
                me.set('loggedInUser', { loggedIn: true, user: response.user });

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
                me.set('errorMessage', 'Ein Unglück ist passiert');
            }
        }).fail(function(){
            me.set('errorMessage', 'Es ist ein Fehler aufgetreten.');
        });
    },

    logout: function() {
        Ember.$.post('/api/logout', data).then(function(response){
             debugger
        });
    },

    actions: {
        login: function() {
            this.login();
        },

        logout: function() {
            this.logout();
        }
    }

});