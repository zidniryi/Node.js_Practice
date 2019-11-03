const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

// Hanlde uncaught
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex)
//   process.exit(1)
// })

// const p = Promise.reject(new Error('Error Misereble hi'))
// p.then(() => console.log('Done'))



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));