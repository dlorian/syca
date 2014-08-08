/**
 * Database configuration used for the different environments
 */

// URL of used database
var dbConnection = 'mongodb://localhost/';

if(process.env.OPENSHIFT_MONGODB_DB_URL) {
    dbConnection = process.env.OPENSHIFT_MONGODB_DB_URL;
}

module.exports = {
    prod: {
        // Collection for production mode
        url: (function(me) {
            return dbConnection + 'syca';
        })()
    },
    dev: {
        // Collection for development mode
        url: (function() {
            return dbConnection + 'syca'; // For testing purpose. Only syca
        })()
    },
    test: {
        // Collection for test mode
        url: (function() {
            return dbConnection + 'syca-test';
        })()
    }
};