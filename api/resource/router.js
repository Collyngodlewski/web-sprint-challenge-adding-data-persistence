const express = require('express')
const Resources = require('./model')
const router = express.Router()



router.post('/', async (req, res, next) => {
    try {
        const newResources = await Resources.create(req.body)
        res.status(201).json(newResources)
    } catch (err) {
        next(err)
    }
})

router.get('/', (req, res, next) => {
    Resources.getAll()
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})


module.exports = router
