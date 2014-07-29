var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var errorHandler   = require('errorhandler');
var path           = require('path');
var mongoose       = require('mongoose');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

// Load my database configurations
var configDB       = require('./config/database.js');

// Require user model for setting up test user.
var User = require('./models/user');

// Create an express instance
var app = express();
var env = process.env.NODE_ENV || 'development';

var getDbConnection = function() {

	// Init database connection
	if('production' === env) {
		mongoose.connect(configDB.prod.url);
	}
	else {
		// use development database collectio by defaault
		mongoose.connect(configDB.dev.url);
	}

	// Set up the db connection
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback() {
		console.log('Database connection established.');
		runExpressServer();
	});
};

var runExpressServer = function() {

	var serverPort     = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
	var serverIpAdress = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';

	// Set up express application
	app.set('port', serverPort);
	app.use(morgan('dev')); // 'default', 'short', 'tiny', 'dev'
	app.use(bodyParser());
	app.use(methodOverride());

	// Required for passport
	// Cookie parser has to be before session. Is required for sessions.
	app.use(cookieParser('A0K!nr6Wo)ZZ4.Xp!ddAOp8&tw!vn4Erpqnvr4982!'));	// Use signed cookies
	app.use(session({
		cookie : {
			maxAge: 3600000 * 24 // 1h in ms * 24
		},
		secret: 'A0K!nr6Wo)ZZ4.Xp!ddAOp8&tw!vn4Erpqnvr4982!'
	}));

	app.use(passport.initialize());
	app.use(passport.session());	// Use persistent login sessions

	app.use(express.static(path.join(__dirname, 'public')));

	// Init error handling regarding environment mode
	if ('development' === env) {
		app.use(errorHandler({ dumpExceptions: true, showStack: true }));
	}
	else if('production' === env) {
		app.use(errorHandler());
	}

	// NOTE: For testing purpose only!
	console.log('Setting up test user');
	// Create a test user for log in. First remove the existisng user and create a new one
	User.remove({username: 'test'}, function (err) {
		if (err) {
			console.log('Error while removing test user.');
			return handleError(err);
		}
		registerUser(); // register test user again
	});

	// Helper function to register a new test user after existing user has been removed
	function registerUser() {
		var hashedClientPW = '1e2e9fc2002b002d75198b7503210c05a1baac4560916a3c6d93bcce3a50d7f00fd395bf1647b9abb8d1afcc9c76c289b0c9383ba386a956da4b38934417789e';
		User.register(new User({ username : 'test'}), hashedClientPW, function(err, account) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Test-user registered.');
			}
		});
	}

	// Load the config for passport
	require('./config/passport')(passport);

	// Simple logger for requests
	app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);
		next();
	});


    // Load the routes
	require('./routes')(app, passport);

	// Server initialised
	console.log('Server initialised. Now ready for use.');

	// launch application
	app.listen(app.get('port'), function() {
		console.log(("Express server is listening on host " + serverIpAdress + " with port " + app.get('port')));
	});
};


exports.start = function(database) {
	getDbConnection();
};