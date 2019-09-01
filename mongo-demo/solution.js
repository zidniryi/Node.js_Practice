const mongoose = require('mongoose');


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/mongo-exercises', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
})

const courseSchme = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number

})

const Course = mongoose.model('Course', courseSchme)

async function getCourses(){ 
return await Course
.find({isPublished: true, tags: 'backend'})
// Simple way to sorting if you wan desc just use -
.sort('name')
.select('name author')
}

async function run (){
const courses = await getCourses()
console.log(courses)
}

run()