var express = require('express')
const app = express()

// Define Routes and callback
app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.get('/api/courses', (req, res) =>{
    res.send([1,2,3])
})

// define params
app.get('/api/courses/:id', (req, res) =>{
    res.send(req.params.id)
})
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port} . . . `))