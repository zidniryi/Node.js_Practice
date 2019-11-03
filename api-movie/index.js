const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()

// Hanlde uncaught
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex)
//   process.exit(1)
// })

// const p = Promise.reject(new Error('Error Misereble hi'))
// p.then(() => console.log('Done'))

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));