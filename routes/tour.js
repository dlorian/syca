var mongoose = require('mongoose');

// Create a Schema for the model
var tourSchema = new mongoose.Schema({
  // General
  id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: mongoose.Types.ObjectId 
  },
  description: String,
  date: Date,
  // Weather
  temperature: Number,
  condition: String,
  wind_speed: Number,
  wind_direction: String,
  wind_strength: Number,
  wind_blasts: Number,
  // Track
  total_km: Number,
  top_speed: Number,
  avg_speed: Number,
  // Times
  time_20: Number,
  time_30: Number,
  total_time: Number
});

// Should be used as a Singleton
var Tour = mongoose.model('Tour', tourSchema);

/**
 * Returns an Singleton instance of the tour model. 
 */
exports.getTourInstance = function() {
  if(!Tour) {
    Tour = mongoose.model('Tour', tourSchema);
  }
  return Tour;
}

exports.find = function(request, response) {
  console.log('in: --> Tour.js: find()');
  // find all Tour models in the database
  
  Tour.find(function(err, tours) {
    if (err) {
      console.log('Error occured while querying database');
    }
    console.log(tours);
    // send found tours back to the client
    response.jsonp({tours:tours});
  });
  console.log('out: <-- Tour.js: find()');
};

exports.findById = function(request, response) {

  Tour.findById(request.params.id, function(err, tour) {
    if (err) {
      console.log('Enable to find document in database with Id: ' + request.params.id);
      console.log(err);
      return;
    }
    console.log('find successfull');
    console.log(tour);
    response.send(tour);
  });
};

exports.add = function(request, response) {
  console.log('in: --> Tour.js: add()');

  var tourObj = request.body.tour;
  if(tourObj) {
    console.log(tourObj);

    var tour = new Tour(tourObj);
    console.log('after tour creation');
    console.log(tour);

    tour.save(function (err) {
      if (err) {
        var errMsg = 'An error occured while adding data into database' + err;
        console.log(errMsg);
        repsonse.send({error:"errMsg"});
        return; // TODO: implement erro handling
      }
      console.log('Data saved successfully');
      response.send({tour:{id:tour.id}});
      // saved!
    });
  }
  console.log('out: <-- Tour.js: add()');
};

exports.update = function(request, response) {console.log('Not yet implemented')};

exports.delete = function(request, response) {console.log('Not yet implemented')};