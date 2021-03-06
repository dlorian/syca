window.EmberApp = Ember.Application.create({
	LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true,

    // Definition of the used date format by the application
    dateFormat: 'DD.MM.YYYY'
});

/* Order and include as you please. */
require('routes/*');
require('controllers/*');
require('models/*');
require('views/*');
require('router');
require('store');
require('util');

// Import validator class via main.js.
// main.js describes the import of validators
require('validators/main');