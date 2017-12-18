var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});

logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');


// Log to a File
     fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var logDir = 'log';
    var tsFormat = () => (new Date()).toLocaleTimeString();
    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

var logger = new (winston.Logger)({
  transports: [

    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

new (require('winston-daily-rotate-file'))({
  filename: `${logDir}/-results.log`,
  timestamp: tsFormat,
  datePattern: 'yyyy-MM-dd',
  prepend: true,
  level: env === 'development' ? 'verbose' : 'info'
})



// Colorizing Messages
var logger = new (winston.Logger)({
  transports: [
    // Colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});

logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');


// Timestamp
var tsFormat = () => (new Date()).toLocaleTimeString();

var logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});
logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');


    var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            level: env === 'development' ? 'verbose' : 'info',
        }),


// Rotate File Each Day
 new (require('winston-daily-rotate-file'))({
                name: 'logFile',
                filename: `${logDir}/-results.log`,
                prepend: true,
                level: env === 'development' ? 'verbose' : 'info'
            })
        ]
        });
        log = function(message, level){
            level = level || 'info';
            logger.log(level, message);
        };
        exports.log = log;
    