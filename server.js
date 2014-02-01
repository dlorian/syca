var express = require('express');
var mongoose = require('mongoose');
var tours = require('./routes/tour');
var home = require('./routes/home');
var weather = require('./routes/weather');
var path = require ('path');

var getDbConnection = function() {
	mongoose.connect('mongodb://localhost/nody');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback() {
		console.log('Database connection established.');
		runExrepssServer();
	});
}

var runExrepssServer = function() {
	// create an instansce of express
	var app = express();
	/*
	 * Configuration for the express instance
	 */
	app.configure(function() {
		app.set('port', process.env.PORT || 8080);
		app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
		app.use(express.bodyParser());
		app.set('views', __dirname + '/views');
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(app.router);
	});

	app.get('/api/tours', tours.find);
	app.get('/api/tours/:id', tours.findById);
	app.post('/api/tours', tours.add);
	app.put('/api/tours/:id', tours.update);
	//app.delete('/api/tours/:id', tours.delete); not yet implemented

	app.get('/homes', home.find);

	app.get('/api/weather', weather.getWeatherDataById);
	app.get('/api/weather/find?:city', weather.getCityByText);

	app.listen(app.get('port'));
	console.log('Listening on port '+ app.get('port') + '...');
}


exports.start = function(database) {
	getDbConnection();
}