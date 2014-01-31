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
  windSpeed: Number,
  windDirection: String,
  windStrength: Number,
  windBlasts: Number,
  // Track
  totalKm: Number,
  topSpeed: Number,
  avgSpeed: Number,
  // Times
  time20: Number,
  time30: Number,
  totalTime: Number
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
  var offset = request.query.offset;
  var limit = request.query.limit;

  var sendResponse = function(err, tours) {
    if(err) {
        var errMsg = 'Tours: Error occured while querying database!'
        response.statusCode = 500;
        response.send(errMsg);
        console.log(errMsg);
    }
    else {
        response.jsonp({ tours: tours });
    }
    console.log('out: <-- Tour.js: find()'); 
  }

  if(offset && limit) {
    console.log('Find tours with offset:' + offset + ' and limit to:' + limit);
    Tour.find().skip(offset).limit(limit).exec(sendResponse);
  }
  else {
    Tour.find().exec(sendResponse);
  }  
};

exports.findById = function(request, response) {
  console.log(request.params.id);
  // Properties _id and id are not the same
  // Due to this we have to find by prop id, which is used by the client
  Tour.find({id: request.params.id}, function(err, tour) {
    if (err) {
      console.log('Enable to find document in database with Id: ' + request.params.id);
      console.log(err);
      return;
    }
    console.log('find successfull');
    console.log(tour);
    response.jsonp({ tour: tour });
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