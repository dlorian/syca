
var User = require('./models/user');

var tours = require('./lib/tour');
var home = require('./lib/home');
var weather = require('./lib/weather');

module.exports = function(app, passport) {

    // get the logged in user
    app.get('/api/login', function(req, res, next) {
        console.log('GET#login');

        console.log('Check if user is authenticated');
        if(req.isAuthenticated()) {
            console.log('User is authenticated: %s', req.user.username);
            return res.send({ success: true, msg: req.user.username })

        }
        console.log('User is NOT authenticated');
        return res.send({ success: false, msg: 'Not logged in.' });
    });

    // login routes
    app.post('/api/login', function(req, res, next) {
        console.log('POST#login');

        passport.authenticate('local', function(err, user, info) {
            if (err) {
                console.log('Error occured while log in user %s.', user.username);
                return next(err);
            }

            if (!user) {
                console.log('Log in of user %s NOT successfull', user.username);
                return res.send({success: false, msg: 'Login fehlgeschlagen.'});
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
    });

    app.post('/api/logout', function(req, res) {
      req.logout();
      res.send({success: true, msg: 'Logout erfolgreich.'});
    });

    // tour routes
    app.get('/api/tours',     isLoggedIn, tours.find);
    app.get('/api/tours/:id', isLoggedIn, tours.findById);
    app.post('/api/tours',    isLoggedIn, tours.add);
    app.put('/api/tours/:id', isLoggedIn, tours.update);
    //app.delete('/api/tours/:id', tours.delete); not yet implemented

    //app.get('/homes', home.find);

    // weather routes
    app.get('/api/weather', weather.getWeatherDataById);
    app.get('/api/weather/find?:city', weather.getCityByText);
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't send http error message
    return res.send("401 unauthorized", 401);
}