const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/book', {useNewUrlParser: true})
.then(() => {
    console.log('Connect onto db ....')
}).catch(err => console.log('error', err))

const ListBook = mongoose.model(
    "ListBook",
    new mongoose.Schema({
        title: String,
        author: String,
        qty: Number,
        image: String,
        date: {type: Date, default: Date.now}
    })
)
ListBook.create({title: 'One To Zero', author: 'Piether Thiel', qty:2, image: 'cover.jpg'}).then(()=>{
    ListBook.find().then(res =>{
        console.log(res)
    })
})