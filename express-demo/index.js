var express = require('express')
const app = express()

// Define Routes and callback
app.get('/', (res, req) =>{
    res.send('Hello World')
})

app.listen(4000, () => console.log('Listening on port 4000 . . . .'))