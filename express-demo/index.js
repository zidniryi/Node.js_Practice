const Joi = require('@hapi/joi')
const express = require('express')
const app = express()
// parse json
/**
 * res = is response send to users
 * req = is request from users
 */
app.use(express.json())

/**
 * Create custom middleware
 */
 app.use((req, res, next) =>{
     console.log('Logging ...')
     next()
 })

 app.use((req, res, next) =>{
    console.log('Authentication ...')
    next()
})

const courses = [
    {id: 1, name: 'node 1'},
    {id: 2, name: 'node 2'},
    {id: 3, name: 'node 3'},
    {id: 4, name: 'node 4'},

]

// Define Routes and callback
app.get('/', (req, res) => {
    res.send('Helo World')
})

app.get('/api/courses', (req, res) =>{
  res.send(courses)
})

// define params
app.get('/api/courses/:id', (req, res) =>{
    // If course not founds
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course not founds')
    res.send(course)
})

// To post
app.post('/api/courses', (req, res) => {
    // Define schema
    // Hanling invalid input
    const { error } = validateInput(req.body)
    // Validation
      if(error) return res.status(400).send(result.error.details[0].message)

    const course = {
        // Adding + 1 if req success
        id: courses.length + 1,
        name: req.body.name
    }
    // push an array to object
    courses.push(course)
// Send course to the clients
    res.send(course)
})

// Put Method
app.put('/api/courses/:id', (req, res) =>{
    // If Not found
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course not founds')

    // Hanling invalid input
     const { error } = validateInput(req.body)
    // Validation
      if(error) return res.status(400).send(error.details[0].message)
      
      course.name = req.body.name
      res.send(course)
})

// Delete
app.delete('/api/courses/:id', (req, res) =>{
    // If not found
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course not founds')

    // Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    // If work
    res.send(course)

})

function validateInput(course) {
    // If bad request
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port} . . . `))