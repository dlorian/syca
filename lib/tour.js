var Tour = require('../models/tour');

exports.find = function(queryParams, callback) {
    console.log('Tour.js: call find()');

    // Build query according to the query parameters
    var query = Tour.find();

    if(queryParams.offset) {
        query.skip(queryParams.offset);
    }

    if(queryParams.limit) {
        query.limit(queryParams.limit);
    }

    if(queryParams.from) {
        query.where('date').gte(queryParams.from);
    }

    if(queryParams.to) {
        query.where('date').lte(queryParams.to);
    }

    if(queryParams.value) {
        query.where('description').lte(queryParams.value);
    }

    // Fire query
    query.exec(function(err, tours){
        if(err) {
            var error = {
                type: 'Error',
                message: 'Unable to find tours.'
            };
            callback(errMsg, null);
        }

        callback(null, tours);
    });
};

/**
 * Find tour by id property.
 */
exports.findById = function(tourId, callback) {
    console.log('Tour.js: call findById()');

    /**
     * Properties _id and id are not the same.
     * Due to this we have to find by prop id, which
     * is used by the client.
     */
    Tour.find({id: tourId}, function(err, tour) {
        if(err) {
            var error = {
                type: 'Error',
                message: 'Unable to find document with Id: ' + tourId
            };
            callback(error, null);
        }

        callback(null, tour);
    });
};

/**
 * Add a new tour
 */
exports.add = function(tourToAdd, callback) {
    console.log('Tour.js: call add()');

    if(tourToAdd) {
        // Create a new model instance with client data,
        // Tour will be validated while saving by mongoose.
        var tour = new Tour(tourToAdd);

        tour.save(function (err, tour) {
            if (err) {
                var error;
                if(err.name === 'ValidationError') {
                    // Init a default error message object
                    error = {
                        type: err.name,
                        message: err.message
                    };

                    // The errors object contains the fields where a validation error occured.
                    if(err.errors) {
                        error.errors = {};
                        // Extract all occured validation errors
                        for(var validationError in err.errors) {
                            error.errors[validationError] = {
                                message: err.errors[validationError].message,
                                name:    err.errors[validationError].name,
                                value:   err.errors[validationError].value
                            };
                        }
                    }
                }
                else {
                    // Set up a default error message
                    error = {
                        type: 'Error',
                        message: 'An error occured while adding data into database.'
                    };
                }
                callback(error, null);
            }
            callback(null, tour);

        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to add tour.'
        };
        callback(error, null);
    }
};

exports.update = function(tourId, updatedTour, response) {
    console.log('Tour.js: call update()');

    if(updatedTour && tourId) {
        // Find entry by id
        Tour.findOneAndUpdate({ id: tourId }, updatedTour, function(err, tour) {
            if(err) {
                var error = {
                    type: 'Error',
                    message: 'Unable to update tour with id: ' + tourId + '.'
                };
                callback(error, null);
            }

            callback(null, tour);
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to update tour.'
        };
        callback(error, null);
    }
};

exports.delete = function(tourId, callback) {

    if(tourId) {
        Tour.remove({id: tourId}, function(err) {
            if(err) {
                var error = {
                    type: 'Error',
                    message: 'Unable to delete tour with id: ' + tourId + '.'
                };
                callback(error);
            }

            callback(null);
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to delete tour.'
        };
        callback(error);
    }
};