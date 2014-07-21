var mongoose    = require('mongoose');
var util        = require('util');
var moment      = require('moment');

// Load my database configurations
var configDB    = require('../config/database.js');
var TourService = require('../lib/tour');       // Service of the current test
var Tour        = require('../models/tour');    // Model object used by the service

/**
 *  Helper function for creating a test object.
 */
var testTour = {
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

// Prepare test objects
var testTours = [
    { date: new Date() },
    { date: moment().subtract('d', 7).toDate() },
    { date: moment().subtract('d', 5).toDate() },
    { date: moment().subtract('d', 2).toDate() },
    { date: moment().subtract('d', 1).toDate() },
];

// Database object and collection name for the current test.
var db = null, collectionOfTest = 'tours';

/**
 * Test of the tour service.
 */
describe('TourService', function() {

    before(function(done){

        // Set up datbase connection used for the test
        mongoose.connect(configDB.test.url);

        // Set up the db connection
        db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', function() {
            done();
        });
    });

    before(function(done) {
        clearDatabase(done);
    });

    describe('#find()', function() {
        // Test data
        var queryParams = {};

        before(function(done){
            // Add test tours to db
            addTestTours(testTours, done);
        });

        // Reset query parameters before each test
        beforeEach(function() {
            queryParams = {};
        });

        it('should return all tours by find with no query parameters', function(done) {
            // Test find with no query params
            doFindAndAssert({}, testTours.length, done);
        });

        it('should return 1 tours by find with given limit 1', function(done) {
            queryParams.limit = 1;

            doFindAndAssert(queryParams, queryParams.limit, done);
        });

        it('should return 4 tours by find with given limit 4', function(done) {
            queryParams.limit = 4;

            doFindAndAssert(queryParams, queryParams.limit, done);
        });

        it('should return all tours by find with greater limit', function(done) {
            queryParams.limit = testTours.length + 1;

            doFindAndAssert(queryParams, testTours.length, done);
        });

        it('should return all tours by find with invalid limit', function(done) {
            queryParams.limit = 'a';

            doFindAndAssert({ limit: 'a' }, testTours.length, done);
        });

        it('should return 3 tours by find with given offset', function(done) {
            queryParams.offset = 2;

            var expectedCount = testTours.length - queryParams.offset;

            doFindAndAssert(queryParams, expectedCount, done);
        });

        it('should return 1 tour by find with given offset and given limit', function(done) {
            // Set offset in max entries, so there should be no tours
            queryParams.offset = 2;
            queryParams.limit  = 1;

            doFindAndAssert(queryParams, queryParams.limit, done);
        });

        it('should return 0 tours by find with offset to big', function(done) {
            // Set offset in max entries, so there should be no tours
            queryParams.offset = testTours.length;

            doFindAndAssert(queryParams, 0, done);
        });

        it('should return all tours by find with invalid offset', function(done) {

            doFindAndAssert({ offset: 'a' }, testTours.length, done);
        });

        it('should return 3 tours by find with from date', function(done) {
            queryParams.from = moment().subtract('d', 3).toDate() ;

            doFindAndAssert(queryParams, 3, done);
        });

        it('should return all tours by find with invalid from date', function(done) {

            doFindAndAssert({ from: 'a' }, testTours.length, done);
        });

        it('should return 0 tours by find with from date in the future', function(done) {
            queryParams.from = moment().add('d', 1).toDate() ;

            doFindAndAssert(queryParams, 0, done);
        });

        it('should return 2 tours by find with to date', function(done) {
            queryParams.to   = moment().subtract('d', 2).toDate() ;

            doFindAndAssert(queryParams, 3, done);
        });

        it('should return all tours by find with invalid to date', function(done) {

            doFindAndAssert({ to: 'a' }, testTours.length, done);
        });

        it('should return 2 tours by find with from and to date', function(done) {
            queryParams.from = moment().subtract('d', 3).toDate() ;
            queryParams.to   = moment().subtract('d', 1).toDate() ;

            TourService.find(queryParams, function(err, tours) {
                if(err) done(err);

                tours.should.have.length(2);
                done();
            });
        });

    });

    describe('#findById()', function(done) {

        before(function(done) {
            var tour = new Tour(testTour);

            tour.save(function(err, tour) {
                if(err) done(err);

                testTour.id = tour.id;
                done();
            });
        });

        it('should return 1 tour for given id', function(done) {
            TourService.findById(testTour.id, function(err, tour) {
                if(err) done(err);

                (tour).should.be.an.Object.and.should.not.be.empty;

                compareAndAssertTour(testTour, tour, done);
            });
        });

        it('should return 0 tour for given invalid id', function(done) {
            TourService.findById('id', function(err, tour) {

                (tour === null).should.be.true;

                (err).should.be.an.Object.and.should.not.be.empty;

                done();
            });
        });
    });

    describe('#add()', function() {

        before(function(done){
            clearDatabase(done);
        });

        it('should return 1 by adding one tour', function(done) {
            delete testTour.id;
            var tour = new Tour(testTour);

            tour.save(function(err, tour) {
                if(err) done(err);

                (tour).should.be.an.Object.and.should.not.be.empty;

                compareAndAssertTour(testTour, tour, function() {
                    Tour.count(function(err, count){
                        count.should.equal(1, "Should only be one item in the collection");
                        done();
                    });
                });
            });
        });

        it('should return 2 by adding one tour', function(done) {
            delete testTour.id;
            var tour = new Tour(testTour);

            tour.save(function(err, tour) {
                if(err) done(err);

                (tour).should.be.an.Object.and.should.not.be.empty;

                compareAndAssertTour(testTour, tour, function() {
                    Tour.count(function(err, count){
                        count.should.equal(2, "Should be two items in the collection");

                        done();
                    });
                });
            });
        });
    });

    describe('#update()', function() {

        beforeEach(function(done){
            var tour = new Tour(testTour);

            clearDatabase(function() {
                tour.save(function(err, tour) {
                    if(err) done(err);

                    testTour.id  = tour.id;
                    testTour.__v = tour.__v;

                    done();
                });
            });
        });

        it('should update tour successfully', function(done) {
            testTour.date = moment().subtract(3, 'd').toDate();
            testTour.description = 'Updated Test Object';
            testTour.condition = 'Wolkig';

            //console.log(testTour);

            TourService.update(testTour.id, testTour, function(err, tour) {
                if(err) done(err);

                //console.log(tour);

                compareAndAssertTour(testTour, tour, function() {

                    tour.__v.should.be.a.Number;
                    tour.__v.should.equal(testTour.__v + 1);

                    done();
                });
            });
        });

        it('should not updated tour woth invalid properties', function(done) {
            // Prepare test date with invalid properties
            testTour.date = moment().add(3, 'd').toDate();
            testTour.time20 = 'a';
            testTour.time30 = 'a';
            testTour.totalTime = 'a';
            testTour.totalKm = 'a';
            testTour.temperature = 'a';
            testTour.topSpeed = 'a';
            testTour.avgSpeed = 'a';

            TourService.update(testTour.id, testTour, function(err, tour) {

                (tour === null).should.be.true;

                (err).should.be.an.Object.and.should.not.be.empty;

                var error = err.error;

                error.name.should.equal('ValidationError');

                // There should be an ValidationError for each property
                Object.keys(error.errors).should.have.length(8);

                TourService.findById(testTour.id, function(err, tour) {
                    if(err) done(err);

                    // Make sure that tour was not updated.
                    tour.__v.should.equal(0);

                    done();
                });
            });
        });
    });

    describe('#delete()', function() {

        beforeEach(function(done){
            // First clear db
            clearDatabase(function() {
                // Afterwards create new entries
                addTestTours(testTours, done);
            });
        });

        it('should delete one tour in database', function(done) {
            TourService.delete(testTours[0].id, function(err) {
                if(err) done(err);

                Tour.count(function(err, count) {
                    if(err) done(err);

                    count.should.be.equal(testTours.length - 1);

                    done();
                });
            });
        });

        it('should delete with invalid id', function(done) {
            TourService.delete('id', function(err) {

                (err).should.be.an.Object.and.should.not.be.empty;

                Tour.count(function(err, count) {
                    if(err) done(err);

                    count.should.be.equal(testTours.length+1);

                    done();
                });
            });
        });
    });
});

var clearDatabase = function(done) {
    // Remove all existing tours in the tours collection
    Tour.remove({}, function(err) {
        if(err) done(err);

        Tour.count(function(err, count){
            if(err) done(err);

            count.should.eql(0, "Should be no item in tours collection.");
            done();
        });
    });
};

var doFindAndAssert = function(queryParams, expectedCount, callback) {

    TourService.find(queryParams, function(err, tours) {
        if(err) callback(err);

        tours.should.have.length(expectedCount);

        callback();
    });
};

var compareAndAssertTour = function (tourToSave, savedTour, callback) {
    (tourToSave).should.be.an.Object;
    (tourToSave).should.not.be.an.Array;

    (savedTour).should.be.an.Object;
    (savedTour).should.not.be.an.Array;

    (tourToSave).should.not.be.empty;
    (savedTour).should.not.be.empty;

    savedTour.should.have.properties(Object.keys(tourToSave));

    for(var key in tourToSave) {
        if(key !== '__v') { // Don't copy version of items
            savedTour[key].should.eql(tourToSave[key]);
        }
    }
    callback();
};

var addTestTours = function(tours, callback) {

    var saveTour = function(tourConfig, next) {
        var tour = new Tour(tourConfig);
        tour.save(function(err, tour) {
            if(err) {
                console.log(err);
                callback(err);
            }
            // Set the id for reference
            tourConfig.id = tour.id;

            // Continue with next tour
            next();
        });
    };

    var index = 0;

    if(!Array.isArray(tours)) {
        tours = [tours];
    }

    // Add tours recursively
    (function saveTours() {
        if(index < tours.length) {
            saveTour(tours[index], saveTours);
            index++;
        }
        else {
            Tour.count(function(err, count){
                if(err) done(err);

                // Make sure that all tours exists in DB
                count.should.equal(tours.length);

                callback();
            });
        }
    })();
};