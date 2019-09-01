const mongoose = require('mongoose');


// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/courses', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
// Create schema. Schema is the model of our database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

// This we create form model a Class
const Course = mongoose.model('Course', courseSchema)
// Query insert
async function createCourse(){
    // This an Object
const course = new Course ({
    name: 'Learn React Native',
    author: 'zidniryi',
    tags: ['Node', 'Express', 'MongoDB'],
    isPublished: true
    })
    const result = await course.save()
    console.log(result)
}
// Query Get
async function getData(){
    try{
     const course = await Course.find({author: 'zidniryi', isPublished: true})
     .sort({name:1})
     .select({name: 1, tags: 1})
     console.log(course)
    }
    catch{
        console.log(course)
    }
}

getData()