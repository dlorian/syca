var winston = require('winston');

// Set up own logger
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: 'true'
        }),
        new winston.transports.File({
            colorize: 'true',
            filename: 'server.log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

exports.logger = function(){
    return logger;
};