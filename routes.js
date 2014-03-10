
var User    = require('./models/user');
var tour    = require('./lib/tour');
var home    = require('./lib/home');
var weather = require('./lib/weather');

/**
 * Helper function for sending an error message.
 */
var sendError = function(response, error) {
    if(!error) {
        // If no further message is given use a default message
        error = 'Internal server error';
    }

    console.log('# ---- Error ---- #');
    console.log(error);
    console.log('# --------------- #');

    // Send Error message to the client
    response.statusCode = 500;
    response.send({ error: error });
};

module.exports = function(app, passport) {

    // Set up Login route
    app.route('/login')

        .get(function(req, res, next) {     // Get the logged in user
            console.log('GET#login');
            console.log('Check if user is authenticated');

            if(req.isAuthenticated()) {
                console.log('User is authenticated: %s', req.user.username);

                setTimeout(function(){
                    return res.json({ success: true, user: req.user.username });
                    //return res.send("401 unauthorized", 500);
                }, 1);
            }
            else {
                console.log('User is NOT authenticated');
                return res.send({ success: false, msg: 'Not logged in.' });
            }
        })

        .post(function(req, res, next) {
            console.log('POST#login');

            setTimeout(function() {
                passport.authenticate('local', function(err, user, info) {
                    if (err) {
                        console.log('Error occured while log in user %s.', user.username);
                        return next(err);
                    }

                    if (!user) {
                        console.log('Log in of user %s NOT successfull', user.username);
                        return res.send({ success: false, msg: 'Benutzername oder Passwort ist falsch.' });
                    }

                    // log in user
                    console.log('Try to log in user %s.', user.username);
                    req.logIn(user, function(err) {
                        if (err) {
                            console.log('Error occured while loggin in user: %s.', user.username);
                            return next(err);
                        }
                        console.log('Login of user %s was successfull.', user.username);
                        return res.send({ success: true, msg: 'Login erfolgreich.', user: user.username });
                    });
                })(req, res, next); // add net for error handling
            }, 1);
        })
    ;

    // Set up logout route
    app.route('/logout')
        .post(function(req, res) {
            req.logout();
            res.send({ success: true, msg: 'Logout erfolgreich.' });
        })
    ;

    app.all('/api/*', isLoggedIn);

    // Set up tours routes
    app
        .get('/api/tours', function(request, response) {
            var queryParams = request.query;

            tour.find(queryParams, function(err, tours) {
                if(err) {
                    sendError(response, err);
                    return;
                }

                setTimeout(function() { // For testing purpose only
                    response.json({ tours: tours });
                }, 3000);
            });
        })
        .get('/api/tours:id', function(request, response) {

            tour.findById(request.params.id, function(err, tour){
                if (err) {
                    sendError(response, err);
                    return;
                }
                response.json({ tour: tour });
            });
        })
        .post('/api/tours', function(request, response) {

            tour.add(request.body.tour, function(err, tour) {
                if(err) {
                    sendError(response, err);
                    return;
                }

                response.json({ tour: tour });
            });
        })
        .put('/api/tours:id', function(request, response) {
            var tourId      =  request.params.id,
                updatedTour = request.body.tour
            ;

            tour.update(tourId, updatedTour, function(err, tour) {
                if(err) {
                    sendError(response, err);
                    return;
                }

                response.json({ tour: tour });
            });
        })
        .delete('/api/tours/:id', function(request, response) {

            tour.delete(request.params.id, function(err) {
                if(err) {
                    sendError(response, err);
                    return;
                }

                response.json({ success: true });
            });
        })
    ;

    //app.get('/homes', home.find);

    // Set up weather routes
    app.route('/api/weather')
        .get(weather.getWeatherDataById)
        .get('find?:city', weather.getCityByText)
    ;
};

//Middleware to verify that a user is logged in
function isLoggedIn(request, response, next) {

    // if user is authenticated in the session, carry on
    if (request.isAuthenticated()) {
        return next();
    }

    // if they aren't send http error message
    return response.send("401 unauthorized", 401);
}
