var mongoose    = require('mongoose');
var util        = require('util');

// Load my database configurations
var configDB    = require('../config/database.js');
var TourService = require('../lib/tour');       // Service of the current test
var TourModel   = require('../models/tour');    // Model object used by the service

// Set up datbase connection used for the test
mongoose.connect(configDB.test.url);

// Set up the db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log('Database connection established');

});

// Set up test object
var testTour;

/**
 *  Helper function for creating a new tour test object.
 */
var initTestTour = function() {
    return {
        description: 'Tour Test Object',
        date: new Date(),
        // Weather
        condition: 'Sonnig',
        windDirection: 'Nord-Ost',
        temperature: '22.2',
        windSpeed: '2',
        windStrength: '13',
        windBlasts: '23',
        // Track
        totalKm: '44.4',
        topSpeed: '40.1',
        avgSpeed: '30.1',
        // Times
        time20: '00:40:12',
        time30: '01:04:11',
        totalTime: '02:01:11'
    };
};

/**
 *  Helper function to verify a validation error created by the tour service.
 *
 *  @param expectedFields List of fields that are expected to be invalid.,
 *  @param err Error returned from the tour service.
 *  @param test Current test object used for assertions.
 *  @param callback Callback function which is called after checking errors.
 */
var verifyValidationError = function(expectedFields, err, test, callback) {
    /** E.g. of a Validation Error Object created by the tour service
     *  err: {
     *    type: 'ValidationError',
     *    errors: {
     *      'fieldName': {
     *        name: ''
     *        message: ''
     *        value: ''
     *      },
     *      'fieldName': {
     *        ***
     *      }
     *    }
     *  }
     */
    var actualFields  = Object.keys(err.errors), // get the fields with validation errors
        actualCount   = actualFields.length,
        expectedCount = expectedFields.length;

    // Verify that the type of error is a ValidationError
    test.equal(err.type, 'ValidationError', 'Expected that error is a type of ValidationError');

    // Verfiy that the actual count of validaiton errors matches the expected fields
    test.equal(actualCount, expectedCount, util.format('%d ValidationError(s) expected, but there are actually %d.', expectedCount, actualCount));

    // Verify that all expected fields are contained in the validation errors object
    expectedFields.forEach(function(element) {
        // Check if expected field exists
        var index = actualFields.indexOf(element);
        test.ok((index !== -1), util.format('No validation error for field \'%s\' as expected.', element));

        // Remove element if it exists
        if(index !== -1) {
            actualFields.splice(index, 1); // remove 1 element form index
        }
    });

    // Verify that all expected errors were matched and removed.
    test.equal(actualFields.length, 0, 'There more validtions errors than expected: ' + actualFields);

    if(callback && typeof callback === 'function') {
        callback();
    }
};

/**
 * Test group for adding a new tour.
 */
exports.add = {
    setUp: function (callback) {
        // create a new test instance
        testTour = initTestTour();

        // cleanup collection
        db.collections.tours.drop(function(err) {
            callback();
        });
    },
    addTour: function (test) {

        test.expect(4 + Object.keys(testTour).length);

        TourService.add(testTour, function(err, tour) {
            test.ifError(err);

            // make sure that an id was set to the added tour
            test.ok(tour.id, "Expected id property is not set.");

            // verify that the added tour is equal to the expected test object
            for(var prop in testTour) {
                test.equal(tour[prop], testTour[prop], 'Property ' + prop + ' is not as expected');
            }

            TourModel.count({}, function(err, count) {
                test.ifError(err);

                test.equal(count, 1, util.format('%d Tour(s) expected in the collection, but there are actually %d.', 1, count));

                test.done();
            });
        });
    },
    addEmptyTour: function(test) {

        test.expect(3);

        TourService.add({}, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            TourModel.count({}, function(err, count) {
                test.ifError(err);

                test.equal(count, 0, util.format('%d Tour(s) expected in the collection, but there are actually %d.', 0, count));

                test.done();
            });
        });
    },
    addTourWithoutDate: function(test) {
        // Set up test data
        delete testTour.date;

        test.expect(5);

        TourService.add(testTour, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            verifyValidationError(['date'], err, test, function(){
                test.done();
            });
        });
    },
    addTourWithInvalidTimes: function(test) {
        // Set up test data
        testTour.time20    = 'aa';
        testTour.time30    = 'aa';
        testTour.totalTime = 'aa';

        TourService.add(testTour, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            verifyValidationError(['time20', 'time30', 'totalTime'], err, test, function() {
                test.done();
            });
        });
    },
    addTourWithInvalidTrack: function(test) {
        // Set up test data
        testTour.totalKm  = 'aa';
        testTour.topSpeed = 'aa';
        testTour.avgSpeed = 'aa';

        TourService.add(testTour, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            verifyValidationError(['totalKm', 'topSpeed', 'avgSpeed'], err, test, function() {
                test.done();
            });
        });
    },
    addTourWithInvalidWeather: function(test) {
        // Set up test data
        testTour.temperature  = 'aa';

        TourService.add(testTour, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            verifyValidationError(['temperature'], err, test, function() {
                test.done();
            });
        });
    }
};

// exports.testFindById = function(test) {

// };

// exports.testAdd = function(test) {

// };

// exports.testUpdate = function(test) {

// };