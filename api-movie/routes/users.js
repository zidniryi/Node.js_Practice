const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user')
const express = require('express');
const _ = require('lodash')
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already register')

    // Post else
    user = new User(_.pick(req.body, ['name','email', 'password']))
    // For hash
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
     await user.save()
    //  Send jwt toke on header this calling from model => user
      const token = user.generateAuthToken()
    //  Using lodash
     res.header('x-auth-token',token).send(_.pick(user, ['_id','name', 'email']))
});


module.exports = router