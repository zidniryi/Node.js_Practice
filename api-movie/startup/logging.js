const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
    // Handle with winston
    winston.handleExceptions(
        new winston.transports.File({ filename: 'exceptionError.log' })
    )

    // Handle promise reject
    process.on('unhandledRejection', (ex) => {
        // winston.error(ex.message, ex)
        // process.exit(1)
        throw (ex)
    })

    // winston.add(winston.transports.File, { filename: 'logfile.log' })
    winston.add(winston.transports.File, { filename: 'logging.log' })
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' })
}