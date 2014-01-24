var mongoose = require('mongoose'),
    tour = require('./tour');

// Create a Schema for the model
var homeSchema = new mongoose.Schema({
  recentTours: [],
  topTotalKm: [],
  topAvfSpeed: [],
  topTopSpeed: [],
  topTime20: [],
  topTime30: []
});

var Home = mongoose.model('Home', homeSchema);
var Tour = tour.getTourInstance();

exports.find = function(request, response) {
  console.log('home.js: method find executed');
};

var query = function(callback) {
  Tour
  .find()
  .limit(3)
  .sort('-totalKm')
  .select('date track.totalKm')
  .exec(callback);
}