var should    = require('should');
var mongoose  = require('mongoose');
var Tour      = require('../models/tour');
var util      = require('util');
var moment    = require('moment');

/**
 * Testing the tour model.
 * Test all valid and invalid model data
 */
describe('TourModel', function(){

    describe('# New Tour', function() {
        it('should be object with id', function() {
            var tour = new Tour();
            tour.should.have.properties('_id', 'id');
        });

        it('should be today', function() {
            var model = new Tour({ date: new Date() });

            model.validate(function(err){
                should.not.exists(err);
            });
        });

        it('should be in the past', function() {
            var model = new Tour({ date: moment().subtract('d', 1).toDate() });

            model.validate(function(err){
                should.not.exists(err);
            });
        });

        it('should not be in the future', function() {
            var model = new Tour({ date: moment().add('d', 1).toDate() });

            model.validate(function(err){
                should.exists(err);
            });
        });
    });

    describe('# Required Fields', function() {
        it('should be one missing required field', function() {
            var model = new Tour();

            model.validate(function(err){
                should.exists(err);
            });
        });

        it('should be no missing required field', function(){
            var model = new Tour({date: new Date() });

            model.validate(function(err){
                should.not.exists(err);
            });
        });
    });

    describe('# Validate Number', function() {
        it('should be all valid numbers', function() {
            /* Cases of valid numbers used by the validation test. */
            var validNumbers = ["1", "1.1", "1.11", "11", "11.1", "11.11", "111", "111.1", "111.11"];

            var fieldsToValidate = ['temperature', 'totalKm', 'topSpeed', 'avgSpeed'];

            processFieldValidation(fieldsToValidate, validNumbers, function(allValidationErrors){
                var errorCount = allValidationErrors.length;
                errorCount.should.eql(0, util.format("There should be %s invalid fields", 0));

            });
        });

        it('should be all invalid numbers', function() {
            /* Cases of invalid numbers used by the validation test. */
            var invalidNumbers = ["a", ".", "..", "1.", ".1", ".11", ".111", "1.111", "1111", "1111.1", "1111.11", "1111.111"];

            var fieldsToValidate = ['temperature', 'totalKm', 'topSpeed', 'avgSpeed'];

            var expectedErrorCount = invalidNumbers.length * fieldsToValidate.length;

            processFieldValidation(fieldsToValidate, invalidNumbers,function(allValidationErrors){
                var errorCount = allValidationErrors.length;
                errorCount.should.eql(expectedErrorCount, util.format("There should be %s invalid fields", expectedErrorCount));

            });
        });
    });

    describe('# Validate Time', function() {
        it('should be all valid times', function() {
            /* Cases of valid numbers used by the validation test. */
            var validTimes = ["00:00:00", "00:00", "01:01:01", "01:01"];

            var fieldsToValidate = ['time20', 'time30', 'totalTime'];

            processFieldValidation(fieldsToValidate, validTimes, function(allValidationErrors){
                var errorCount = allValidationErrors.length;
                errorCount.should.eql(0, util.format("There should be %s invalid fields", 0));

            });
        });

        it('should be all invalid times', function() {
            /* Cases of invalid numbers used by the validation test. */
            var invalidTimes = [":", "::", ":00", "::00", "00:", "00::", "00::00",
                                ":00:", "::00::", ":00:00", "::00:00", ":00::00",
                                "00:00:", "00:00::", "00::00:", "aa:aa:aa", "aa:aa"];

            var fieldsToValidate = ['time20', 'time30', 'totalTime'];

            var expectedErrorCount = invalidTimes.length * fieldsToValidate.length;

            processFieldValidation(fieldsToValidate, invalidTimes, function(allValidationErrors){
                var errorCount = allValidationErrors.length;
                errorCount.should.eql(expectedErrorCount, util.format("There should be %s invalid fields", expectedErrorCount));

            });
        });
    });
});

/**
 * Helper function to process the vaildation for the given fields.
 * Processes the validtion of each value for each field.
 */
var processFieldValidation = function(fields, values, callback) {
    var allValidationErrors = [], length = fields.length;

    var processNextField = function(index) {
        // validate the current field
        processValidation(fields[index], values, function(validationErrors) {

            // Save validation errors for current field
            validationErrors.forEach(function(err){
                allValidationErrors.push(err);
            });

            // Process further validation with next field of list
            index++;
            if(index < length) {
                processNextField(index);
            }
            else {
                callback(allValidationErrors);
            }
        });
    };

    // start validation process for the first field
    processNextField(0);
};

/**
 * Helper function to process the validation of each value for the given field.
 * Runs the callback if each values has beedn validated.
 */
var processValidation = function(field, values, callback) {
    var validationErrors = [], valueCount = 0;
    values.forEach(function(value) {
        // Create a new test model
        var tour = { date: new Date() }; // date field is required
        tour[field] = value;

        // Validate the model for the given value
        var model = new Tour(tour);
        model.validate(function(err) {
            if(err) {
                validationErrors.push(err);
            }

            valueCount++;
            if(valueCount === values.length) {
                // All fields are validated. Use callback for asserting error count.
                callback(validationErrors);
            }
        });
    });
};