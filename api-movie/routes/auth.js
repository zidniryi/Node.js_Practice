const config = require('config')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/user')
const express = require('express');
const _ = require('lodash')
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or passsword')

    // Validate password from the client using method Compare
   const validPassword = await bcrypt.compare(req.body.password, user.password)
   if(!validPassword) return res.status(400).send('Invalid email or password')
   //  Encapsulation in mongoose
   const token = user.generateAuthToken()
   //  Create token 
    res.send(token)
});


function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
  
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router