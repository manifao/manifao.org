const winston = require('winston');

module.exports = winston.createLogger({
  format: winston.format.combine(winston.format.json(), winston.format.errors({stack: true})),
  transports: [ new winston.transports.Console() ]
});
