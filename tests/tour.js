var mongoose    = require('mongoose');

// Load my database configurations
var configDB    = require('../config/database.js');

// Servie to test
var TourService = require('../lib/tour');
var TourModel   = require('../models/tour');

mongoose.connect(configDB.test.url);

// Set up the db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log('Database connection established');

});

// Set up test object
var testTour;

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

exports.add = {
    setUp: function (callback) {
        // Create a fresh test object
        testTour = initTestTour();

        // Clean up collection before testing
        db.collections.tours.drop(function(err) {
            callback();
        });


    },
    addValidTour: function (test) {

        test.expect(4 + Object.keys(testTour).length);

        TourService.add(testTour, function(err, tour) {
            test.ifError(err);

            // Make sure that a id was set to the added tour.
            test.ok(tour.id, "Expected id property is not set");

            // Verify that the added object is equal to the expected object
            for(var prop in testTour) {
                test.equal(tour[prop], testTour[prop], 'Property ' + prop + ' is not as expected');
            }

            // Count all entries in collection
            TourModel.count({}, function(err, count) {
                test.ifError(err);

                test.equal(count, 1, 'There should only be one entry in the collection.');

                // Finish test
                test.done();
            });
        });
    },
    addInvalidTour_WithoutDate: function(test) {

        delete testTour.date;

        test.expect(2);

        TourService.add(testTour, function(err, tour) {

            test.ok(err, 'ValidationError expected');

            test.equal(err.type, 'ValidationError', 'There should be a validation error.');

            test.done();
        });
    }
    // addInvalidTour_B: function(test) {


    //     test.expect(2);

    //     TourService.add(tourToAdd, function(err, tour) {

    //         test.ok(err, 'ValidationError expected');

    //         test.equal(err.type, 'ValidationError', 'There should be a validation error.');

    //         test.done();
    //     });

    // }
};

// exports.testFindById = function(test) {

// };

// exports.testAdd = function(test) {

// };

// exports.testUpdate = function(test) {

// };