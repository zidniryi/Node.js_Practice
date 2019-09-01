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
    // Sort data by price desc, then in parameter to both front end and backend, select 3 data
return await Course
.find({isPublished: true,})
// Filter data greater than 15 or have name 'by'
.or([
    {price : {$gte: 15}},
    {name: /.*by.*/i}
])

// Simple way to sorting if you wan desc just use -
.sort('-price')
.select('name author price')
}

async function run (){
const courses = await getCourses()
console.log(courses)
}

run()