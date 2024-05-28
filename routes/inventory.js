const express = require("express");
const router = express.Router()


router.get('/', (req,res) =>{
    res.send('This is the Inventory listing page')
})


// Category Routes
router.get('/category/:id/create', (req,res) =>{
    res.send('category Create ' + req.params.id + ' page NOT IMPLEMENTED')
})

router.get('/category/:id', (req,res) =>{
    res.send('categories ' + req.params.id + ' page NOT IMPLEMENTED')
})

router.get('/categories', (req,res) =>{
    res.send('categories page NOT IMPLEMENTED')
})


// Item Routes 
router.get('/item/:id', (req,res) =>{
    res.send('categories ' + req.params.id + ' page NOT IMPLEMENTED')
})

router.get('/items', (req,res) =>{
    res.send('Items page NOT IMPLEMENTED')
})


module.exports = router



