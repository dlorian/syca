var winston   = require('winston');
var util      = require('util');
var notifier  = require('./notify').notifier();

var env = process.env.NODE_ENV || 'development';

// Suppress Logging messages while executing tests
var suppressLogging = (env === 'test') ? true : false;

// Set up own logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            silent: suppressLogging,
            colorize: 'true'
        }),
        new winston.transports.File({
            silent: suppressLogging,
            colorize: true,
            filename: 'server.log',
            json: false
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            silent: suppressLogging,
            colorize: true,
            filename: 'exceptions.log',
            json: false
        })
    ]
});

/**
 * Returns a message text for logging. Returned text dependes on the
 * given classname, methodname and original message text.
 * Log message is returned in the format: 'classname.methodname: msg'
 */
var getLogText = function(cls, method, msg) {
    var clsMethod = getClassMethodText(cls, method);
    return util.format('%s: %s', clsMethod, msg);
};
/**
 * Concats the classname and the methodname in the format 'class.method'
 * @param  {String} cls Name of the class
 * @param  {String} method Name of the method
 * @return {String} Returns the class.method string
 */
var getClassMethodText = function(cls, method) {
    return util.format('%s.%s', cls, method);
};

var info = function(cls, method, msg, obj) {
    if(!cls) {
        throw new Error('Logging Error: Required cls arguments undefined.');
    }
    if(!method) {
        throw new Error('Logging Error: Required method argument undefined.');
    }

    // Log message. Use default logger
    if(obj) {
       logger.info(getLogText(cls, method, msg), obj);
    }
    else {
        logger.info(getLogText(cls, method, msg));
    }

    // Additionally use Notifications in development mode
    if(env == 'development') {
        var subtitle = getClassMethodText(cls, method);
        notifier.notifyInfo(subtitle, msg);
    }
};

var error = function(cls, method, msg, errObj) {
    if(!cls) {
        throw new Error('Logging Error: Required cls arguments undefined.');
    }
    if(!method) {
        throw new Error('Logging Error: Required method argument undefined.');
    }

    // Log message. Use default logger
    if(errObj) {
        logger.error(getLogText(cls, method, msg), errObj);
    }
    else {
        logger.error(getLogText(cls, method, msg));
    }

    // Additionally use Notifications in development mode
    if(env == 'development') {
        var subtitle = getClassMethodText(cls, method);
        notifier.notifyError(subtitle, msg);
    }
};

exports.logger = function() {
    return {
        error: error,
        info: info
    };
};

// exports.setLogLevel = function() {
//     consosle.log(winston.config.syslog.levels);
//     logger.setLevels(winston.config.syslog.levels);

// };