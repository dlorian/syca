var Tour   = require('../models/tour');
var logger = require('./logging').logger();

exports.find = function(queryParams, callback) {
    logger.info('Tour', 'find', 'Invocation of find().');

    // Build query according to the query parameters
    var query = Tour.find();

    // TODO: Überlegen, was passieren soll, wenn
    // Parameter vom falschen Typ ist.
    // Bsp.: offset = 'a'
    if(queryParams) {
        if(typeof queryParams.offset === 'number') {
            query.skip(queryParams.offset);
        }

        if(typeof queryParams.limit === 'number') {
            query.limit(queryParams.limit);
        }

        if(queryParams.from instanceof Date) {
            query.where('date').gte(queryParams.from);
        }

        if(queryParams.to instanceof Date) {
            query.where('date').lte(queryParams.to);
        }

        if(queryParams.value) {
            query.where('description').lte(queryParams.value);
        }
    }

    // Fire query
    query.exec(function(err, tours) {
        if(err) {
            var error = {
                type: 'Error',
                message: 'Unable to find tours.'
            };
            logger.error('Tour', 'find', 'Error occurred while finding tours.', {error: error, searchParams: queryParams});

            callback(errMsg, null);
        }
        else {
            // Find successfull
            logger.info('Tour', 'find', 'Find tour with successfull.');
            callback(null, tours);
        }
    });
};

/**
 * Find tour by id property.
 */
exports.findById = function(tourId, callback) {
    logger.info('Tour', 'findById', 'Invovation of findById().');

    /**
     * Properties _id and id are not the same.
     * Method findById cannot be used.
     * Due to this we have to find by prop id, which
     * is used by the client.
     */
    Tour.findOne({id: tourId}, function(err, tour) {
        if(err) {
            var error = {
                type: 'Error',
                message: 'Unable to find document with Id: ' + tourId
            };

            logger.error('Tour', 'findById', 'Error occurred while finding tour with id '+tourId+'.', error);

            callback(error, null);
        }
        else {
            // Find successfull
            logger.info('Tour', 'findById', 'Find tour with id '+tourId+' successfull.');
            callback(null, tour);
        }
    });
};

/**
 * Add a new tour
 */
exports.add = function(tourToAdd, callback) {
    logger.info('Tour', 'add', 'Invocation of add().');

    if(tourToAdd) {
        logger.info('Tour', 'add', 'Adding of new tour', tourToAdd);
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

                logger.error('Tour', 'add', 'Error occurred while adding tour.', error);
                callback(error, null);
            }
            else {
                // Add successfull
                logger.info('Tour', 'add', 'Adding tour successfull.');
                callback(null, tour);
            }
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to add tour.'
        };
        logger.error('Tour', 'add', 'Error occurred while adding tour.', error);

        callback(error, null);
    }
};

exports.update = function(tourId, updatedTour, callback) {
    logger.info('Tour', 'update', 'Invocation of update().');

    if(updatedTour && tourId) {
        // Find entry by id
        Tour.findOne({ id: tourId }, function(err, tour) {

            // Merge properties of updated tour into exisiting tour object
            for(var key in updatedTour) {
                if(updatedTour.hasOwnProperty(key)) {
                    tour[key] = updatedTour[key];
                }
            }

            // Update version of tour
            tour.increment();

            tour.save(function(err, tour){
                if(err) {
                    var error = {
                        type: 'Error',
                        message: 'Unable to update tour with id: ' + tourId + '.',
                        error: err
                    };
                    logger.error('Tour', 'update', 'Error occurred while updating tour with id: '+tourId+'.', error);
                    callback(error, null);
                }
                else {
                    // Update successfull
                    callback(null, tour);
                }
            });
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to update tour.'
        };
        logger.error('Tour', 'update' ,'Error occurred while updating tour '+tourId+'.', error);

        callback(error, null);
    }
};

exports.delete = function(tourId, callback) {
    logger.info('Tour', 'delete', 'Invocation of delete().');

    if(tourId) {
        Tour.remove({id: tourId}, function(err) {
            if(err) {
                var error = {
                    type: 'Error',
                    message: 'Unable to delete tour with id: ' + tourId + '.'
                };

                logger.error('Error occurred while deleting tour with id: '+tourId+'.', error);
                callback(error);
            }
            else {
                // Delete successfull
                logger.info('Tour', 'delete', 'Deleting tour with id '+tourId+' successfull.');
                callback(null);
            }
        });
    }
    else {
        var error = {
            type: 'Error',
            message: 'Unable to delete tour.'
        };
        logger.error('Tour', 'delete', 'Error occurred while deleting tour.', error);

        callback(error);
    }
};