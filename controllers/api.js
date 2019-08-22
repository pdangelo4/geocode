const db = require('../models');
const router = require('express').Router();

//#1
//pull all o fthe fovarite cities and pass them
router.get('/favorites', (req ,res) => {
    //res.send('STUB - favorites page');
    db.place.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

//#2
//pull all o fthe fovarite cities and pass them
router.get('/favorites/:id', (req ,res) => {
    //res.send('STUB - favorites page');
    db.place.findOne({
        where: {id: req.params.id}
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

// render the search results page
//3)
router.post('/favorites', (req, res) => {
    res.send(req.body)
    db.place.create(req.body)
    .then(() => {
        res.json(result)
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})


//4)
router.delete('/favorites/:id', (req, res) => {
    db.place.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.send('{ Deleted }')
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

//5)
router.put('/favorites/:id', (req, res) => {
    res.send(req.body)
    db.place.update({
        where: {id: req.params.id}
    })
    .then(() => {
        res.json(result)
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

module.exports = router;