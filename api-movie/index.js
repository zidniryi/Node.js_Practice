require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')
const error = require('./middleware/error')
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
require('./startup/routes')(app)
// Hanlde uncaught
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex)
//   process.exit(1)
// })

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

// const p = Promise.reject(new Error('Error Misereble hi'))
// p.then(() => console.log('Done'))

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err, { level: 'info' }));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));