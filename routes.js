
var User    = require('./models/user');
var tours   = require('./lib/tour');
var home    = require('./lib/home');
var weather = require('./lib/weather');

module.exports = function(app, passport) {

    // Set up Login route
    app.route('/api/login')

        .get(function(req, res, next) {     // Get the logged in user
            console.log('GET#login');
            console.log('Check if user is authenticated');

            if(req.isAuthenticated()) {
                console.log('User is authenticated: %s', req.user.username);

                setTimeout(function(){
                    return res.send({ success: true, user: req.user.username });
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
                        return res.send({success: false, msg: 'Benutzername oder Passwort ist falsch.'});
                    }

                    // log in user
                    console.log('Try to log in user %s.', user.username);
                    req.logIn(user, function(err) {
                        if (err) {
                            console.log('Error occured while loggin in user: %s.', user.username);
                            return next(err);
                        }
                        console.log('Login of user %s was successfull.', user.username);
                        return res.send({success: true, msg: 'Login erfolgreich.', user: user.username});
                    });
                })(req, res, next); // add net for error handling
            }, 1);
        })
    ;

    // Set up logout route
    app.route('/api/logout')
        .post(function(req, res) {
            req.logout();
            res.send({success: true, msg: 'Logout erfolgreich.'});
        })
    ;

    // Set up tours routes
    app
        .get('/api/tours', isLoggedIn, tours.find)
        .get('/api/tours:id', isLoggedIn, tours.findById)
        .post('/api/tours', isLoggedIn, tours.add)
        .put('/api/tours:id', isLoggedIn, tours.update)
        //.delete('/api/tours/:id', tours.delete); not yet implemented
    ;

    //app.get('/homes', home.find);

    // Set up weather routes
    app.route('/api/weather')
        .get(weather.getWeatherDataById)
        .get('find?:city', weather.getCityByText)
    ;
};

//Middleware to verify that a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't send http error message
    return res.send("401 unauthorized", 401);
}
