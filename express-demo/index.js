const debug = require('debug')('app:startup')
const config = require('config')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const app = express()
// parse json

// console.log(`Node is now: ${process.env.NODE_ENV}`)
// console.log(`app ${app.get('env')}`)




/**
 * res = is response send to users
 * req = is request from users
 */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)


console.log('App Name' + config.get('name'))
console.log('Host Name' + config.get('mail.host'))
if(app.get('env' === 'development')){
    app.use(morgan('tiny'))
   debug('Connect Server') 
}



// Accesing configuration


/**
 * Create custom middleware
 */
 app.use(logger)


 app.use((req, res, next) =>{
    console.log('Authentication ...')
    next()
})


// Define Routes and callback
app.get('/', (req, res) => {
    res.send('Hello COk')
})


const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port} . . . `))