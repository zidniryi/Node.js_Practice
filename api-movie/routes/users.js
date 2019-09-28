const {User, validate} = require('../models/user')
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    // Check if user exist
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already register')

    // Post else
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
     await user.save()
     res.send(user)
});


module.exports = router