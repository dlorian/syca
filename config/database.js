/**
 * Database configuration used for the different environments
 */

// URL of used database
var database = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';

module.exports = {
    prod: {
        // Collection for production mode
        url: (function(me) {
            return database + 'syca-production';
        })()
    },
    dev: {
        // Collection for development mode
        url: (function() {
            return database + 'syca-dev';
        })()
    },
    test: {
        // Collection for test mode
        url: (function() {
            return database + 'syca-test';
        })()
    }
};