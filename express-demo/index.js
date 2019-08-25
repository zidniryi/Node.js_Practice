var express = require('express')
const app = express()

// Define Routes and callback
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/courses', (req, res) =>{
    res.send([1,2,3])
})

app.listen(4000, () => console.log('Listening on port 4000 . . . .'))