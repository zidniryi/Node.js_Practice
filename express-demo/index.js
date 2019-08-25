var express = require('express')
const app = express()
// parse json
/**
 * res = is response send to users
 * req = is request from users
 */
app.use(express.json())

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
    const course = courses.find( c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('Course not founds')
    res.send(course)
})

// To post
app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.send('Invalid Input ')
        return
    }
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
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port} . . . `))