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
    name: 'Learn Swift',
    author: 'zidniryi ridwan',
    tags: ['Node', 'Express', 'MongoDB'],
    isPublished: true
    })
    const result = await course.save()
    console.log(result)
}
// Query Get
async function getData(){
    const pageNumber = 2
    const pageSize = 2
    try{
     const course = await Course
    //  .find({isPublished: true})
    // .find()
    // .or([{author: 'zidniryi123', isPublished: true}])
    // .find({price: {$gt: 10}})
    // .find({price: {$in: [10, 20, 50]}})
    .find({isPublished: true}) 
    .sort({name:1})
    //  .select({name: 1, tags: 1})
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    // .count()
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
// getData()
// createCourse()

/**
 * Update query
 */

// async function updateDataCourse(id) {
//     // first query
//     // findByID
//     // const course = await Course.findById(id)
//     // if (!course) return

//     // course.author = 'Other Person'
//     // // Modify properties
//     // // Save update
//     // const result = await course.save()
//     // return console.log(result)

//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Ryi',
//             isPublished: false
//         }
//     }, {new: true})
//     console.log(course)
// }

//  updateDataCourse('5a68fdc3615eda645bc6bdec')

async function deleteCourse(isPublished){
    const course = await Course.findOneAndRemove(isPublished)
    console.log(course)

}

// deleteCourse(true)
getData()