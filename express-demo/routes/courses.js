const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')


const courses = [
    {id: 1, name: 'node 1'},
    {id: 2, name: 'node 2'},
    {id: 3, name: 'node 3'},
    {id: 4, name: 'node 4'},

]

router.get('/', (req, res) =>{
    res.send(courses)
  })
  
  // define params
  router.get('/:id', (req, res) =>{
      // If course not founds
      const course = courses.find( c => c.id === parseInt(req.params.id))
      if(!course) res.status(404).send('Course not founds')
      res.send(course)
  })
  
  // To post
  router.post('/', (req, res) => {
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
  router.put('/:id', (req, res) =>{
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
  router.delete('/:id', (req, res) =>{
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

  module.exports = router