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
    author: 'zidniryi ridwan',
    tags: ['Node', 'Express', 'MongoDB'],
    isPublished: true
    })
    const result = await course.save()
    console.log(result)
}
// Query Get
async function getData(){
    try{
     const course = await Course
    //  .find({isPublished: true})
    // .find()
    // .or([{author: 'zidniryi123', isPublished: true}])
    // .find({price: {$gt: 10}})
    // .find({price: {$in: [10, 20, 50]}})
    .find({author: /.*arif*./}) 
    .sort({name:1})
    //  .select({name: 1, tags: 1})
    .count()
     console.log(course)
    }
    catch{
        console.log(course)
    }
}
/**
 * Note
 * eq = equal
 * ne = not equal
 * gt = greater than
 * gte = greater than or equal
 * lt = less than
 * lte = les than or equal
 * in
 * nin = not in
 */
getData()
// createCourse()