var Tour   = require('../models/tour');
var logger = require('./logging').logger();

exports.find = function(queryParams, callback) {
    logger.info('Tour.js: call find()');

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
            logger.error('Error occurred while finding tours.', {error: error, searchParams: queryParams});

            callback(errMsg, null);
        }
        else {
            // Find successfull
            logger.info('Find tour with successfull.');
            callback(null, tours);
        }
    });
};

/**
 * Find tour by id property.
 */
exports.findById = function(tourId, callback) {
    logger.info('Tour.js: call findById()');

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
            logger.error('Error occurred while finding tour with id %s.', tourId, error);

            callback(error, null);
        }
        else {
            // Find successfull
            logger.info('Find tour with id %s successfull.', tourId);
            callback(null, tour);
        }
    });
};

/**
 * Add a new tour
 */
exports.add = function(tourToAdd, callback) {
    logger.info('Tour.js: call add()');

    if(tourToAdd) {
        logger.log('info', 'Adding of tour.', tourToAdd);
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
                        // Extract all occurred validation errors
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
                        message: 'An error occurred while adding data into database.'
                    };
                }

                logger.error('Error occurred while adding tour.', error);
                callback(error, null);
            }
            else {
                // Add successfull
                logger.info('Adding tour successfull.');
                callback(null, tour);
            }
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to add tour.'
        };
        logger.error('Error occurred while adding tour.', error);

        callback(error, null);
    }
};

exports.update = function(tourId, updatedTour, response) {
    logger.info('Tour.js: call update()');

    if(updatedTour && tourId) {
        // Find entry by id
        Tour.findOneAndUpdate({ id: tourId }, updatedTour, function(err, tour) {
            if(err) {
                var error = {
                    type: 'Error',
                    message: 'Unable to update tour with id: ' + tourId + '.'
                };
                logger.error('Error occurred while updating tour with id: %s.', tourId, error);
                callback(error, null);
            }
            else {
                // Update successfull
                callback(null, tour);
            }
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to update tour.'
        };
        logger.error('Error occurred while updating tour.', error);

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

                logger.error('Error occurred while deleting tour with id: %s.', tourId, error);
                callback(error);
            }
            else {
                // Delete successfull
                logger.info('Deleting tour with id %s successfull.', tourId);
                callback(null);
            }
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to delete tour.'
        };
        logger.error('Error occurred while deleting tour.', error);

        callback(error);
    }
};