const express = require('express')
const router = express.Router()
const {Admin, validate}  = require('../models/admin')

// Get
router.get('/', async(req, res) =>{
    const admin = await Admin.find()
    res.send(admin)
})

router.post('/', async (req, res) =>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let admin = new Admin({
        username: req.body.username,
        password: req.body.password,
        isVerified: req.body.isVerified,
        email: req.body.email,
        created: req.body.created
    })
    admin = await admin.save()
    res.send(admin)
})

router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const admin = await Admin.findByIdAndUpdate(req.params.id,
        {
            username: req.body.username,
            password: req.body.password,
            isVerified: req.body.isVerified,
            email: req.body.email,
            created: req.body.created
        }, {new: true})
      if(!admin) return res.status(404).send('Admin with that ID not found')
      
      res.send(admin)
})

router.delete('/:id', async (req, res) => {
    const admin = await Admin.findByIdAndRemove(req.params.id)

    if(!admin) return res.status(404).send('Id Not Found')

    res.send(admin)
})

router.get('/:id', async (req, res) =>{
    const admin = await Admin.findById(req.params.id)
    if (!admin) return res.status(404).send('Cant find the ID')

    res.send(admin)
})

module.exports = router