const express = require('express')
const Tasks = require('./model')
const router = express.Router()


router.post('/', (req, res, next) => { 
    Tasks.create(req.body)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(next);
  });

router.get('/', (req, res, next) => {
    Tasks.getAll()
        .then((task) => {
            res.status(200).json(task)
        })
        .catch(next)
})

module.exports = router