var Tour = require('../models/tour');

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


exports.find = function(request, response) {
    console.log('in: --> Tour.js: find()');
    // Extract paramters for the find operation
    var config = request.query;

    var query = Tour.find();

    if(config.offset) {
        query.skip(config.offset);
    }

    if(config.limit) {
        query.limit(config.limit);
    }

    if(config.from) {
        query.where('date').gte(config.from);
    }

    if(config.to) {
        query.where('date').lte(config.to);
    }

    if(config.value) {
        query.where('description').lte(config.value);
    }

    // after building the query, execute db request
    query.exec(function(err, tours) {
        if(err) {
            var errMsg = 'Tours: Error occured while querying database!'
            sendError(response, err, errMsg, 'find');
            return;
        }
        // Only for testing purposes. TODO: Remove
        setTimeout(function(){
            response.jsonp({ tours: tours });
        }, 5000);
    });
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