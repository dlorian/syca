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

var sendError = function(err, res, errMsg, methodName) {
    if(!errMsg) { errMsg = 'Internal server error'; }
    if(!methodName) { methodName = 'Unknown'; }
    
    console.log('-----Error-----');
    console.log('Occured in Tour: ' + methodName);
    console.log('Error message  : ' + errMsg);
    if(err) { console.log(err); }
    console.log('---------------');

    // send Error message to the client
    res.statusCode = 500;
    res.send(errMsg);
}

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
    // Extract paramters for the find operation
    var offset = request.query.offset;
    var limit = request.query.limit;

    // Helper function for sending the response of the find operation
    var sendResponse = function(err, tours) {
        if(err) {
            var errMsg = 'Tours: Error occured while querying database!'
            sendError(response, err, errMsg, 'find');
            return;
        }
        response.jsonp({ tours: tours });
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
            var errMsf = 'Unable to find document in database with Id: ' + request.params.id;
            sendError(response, err, errMsg, 'findById');
            return;
        }
        response.jsonp({ tour: tour });
  });
};

exports.add = function(request, response) {
    console.log('in: --> Tour.js: add()');

    // Extract the Tour out of the request
    var tourObj = request.body.tour;
    if(tourObj) {
        // Create a new model instance with client data
        var tour = new Tour(tourObj);

        tour.save(function (err, tour) {
            if (err) {
                var errMsg = 'An error occured while adding data into database';
                sendError(response, err, errMsg, 'add');
                return;
            }
            // Send the added tour object to the client
            response.send({tour:tour});
        });
    }
    else {
        sendError(response, null, 'Unable to extract tour data out of the request', 'add');
    }
};

exports.update = function(request, response) {
    console.log('in: --> Tour.js: update()');

    // Extract the Tour of the request
    var tourObj = request.body.tour;
    // Create the query for findig the correct entry
    var query = {id: request.params.id}
    if(tourObj && query) {
            Tour.findOneAndUpdate(query, tourObj, function(err, tour){
            if(err) {
                var errMsg = 'Error occured while updating model';
                sendError(response, err, errMsg, 'update');
                return;
            }
            // Send the updaed tour object to the client
            response.send({tour:tour});
        });
    }
    else {
        sendError(response, null, 'Unable to extract tour data out of the request', 'update');
    }   
};

exports.delete = function(request, response) {console.log('Not yet implemented')};