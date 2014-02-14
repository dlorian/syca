var express = require('express');
var path = require ('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var getDbConnection = function() {
	// set up the db connection

	var configDB = require('./config/database.js');

	mongoose.connect(configDB.url);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback() {
		console.log('Database connection established.');
		runExpressServer();
	});
}

var runExpressServer = function() {
	// create an instansce of express
	var app = express();

	// Configuration for the express instance
	app.configure(function() {

		// set up express application
		app.set('port', process.env.PORT || 8080);
		app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
		app.use(express.bodyParser());
		app.use(express.methodOverride());

		// required for passport
		// cookie parser has to be before session
		// is required for sessions
		app.use(express.cookieParser('A0K!nr6Wo)ZZ4.Xp!ddAOp8&tw!vn4Erpqnvr4982!')); // use signed cookies
		app.use(express.session({
			cookie : {
				maxAge: 3600000 * 24 // 1h * 24h
			},
			secret: 'A0K!nr6Wo)ZZ4.Xp!ddAOp8&tw!vn4Erpqnvr4982!'
		}));
		app.use(passport.initialize());
		app.use(passport.session()); // persistent login sessions
		app.use(app.router);

		app.use(express.static(path.join(__dirname, 'public')));
	});

	// init error handling
	app.configure('development', function(){
    	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
    	app.use(express.errorHandler());
	});

	// passport config
	var User = require('./models/user');
	// create a test user for log in.
	// first remove the exisitng user and create a new one
	User.remove({username: 'test'}, function (err) {
		if (err) {
			console.log('Error while removing');
			return handleError(err);
		}
	});
	var hashedClientPW = '1e2e9fc2002b002d75198b7503210c05a1baac4560916a3c6d93bcce3a50d7f00fd395bf1647b9abb8d1afcc9c76c289b0c9383ba386a956da4b38934417789e';
 	User.register(new User({ username : 'test'}), hashedClientPW, function(err, account) {
        if (err) {
            console.log(err);
        }
        else {
        	console.log('Test-user registered.');
        }
    });

 	// Load the config for passport
	require('./config/passport')(passport);

	// routes
	require('./routes')(app, passport);

	// launch application
	app.listen(app.get('port'), function() {
		console.log(("Express server listening on port " + app.get('port')));
	});
}


exports.start = function(database) {
	getDbConnection();
}