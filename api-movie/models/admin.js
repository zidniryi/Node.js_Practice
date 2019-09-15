const Joi = require('joi')
const mongoose = require('mongoose')

const Admin = mongoose.model('Admin', new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:100
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    email:{
        type:String,
        required: true,
        minlength:5,
    },
    created:{
        type: Date,
        default: Date.now()
    }
}))

function validateAdmin (admin){
    const schema = {
        username: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(6).required(),
        isVerified: Joi.boolean(),
        email: Joi.string().min(6).required(),
        created: Joi.date()
    }
return Joi.validate(admin, schema)
}

exports.Admin = Admin
exports.validate = validateAdmin
