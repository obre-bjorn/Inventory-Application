const express = require("express");
const router = express.Router()


router.get('/', (req,res) =>{
    res.send('This is the Inventory listing page')
})


// Category Routes

router.get('/category/create', (req,res) =>{
    res.send('category Create page NOT IMPLEMENTED')
})

router.post('/category/create',(req,res) =>{
    res.send("category created")
})

router.get('/category/:id/update',(req,res)=>{
    res.send('category update form')
})
router.post('/category/:id/update',(req,res)=>{
    res.send('category updated')
})

router.get('/category/:id/delete',(req,res)=>{
    res.send('category delete form')
})
router.post('/category/:id/delete',(req,res)=>{
    res.send('category deleted')
})

router.get('/category/:id', (req,res) =>{
    res.send('categories ' + req.params.id + ' page NOT IMPLEMENTED')
})

router.get('/categories', (req,res) =>{
    res.send('categories page NOT IMPLEMENTED')
})



// Item Routes 
router.get('/item/create',(req,res)=>{
    res.send('Item create form')
})

router.post('/item/create',(req,res) =>{
    res.send("item created")
})

router.get('/item/:id/update',(req,res)=>{
    res.send('category update form')
})
router.post('/item/:id/update',(req,res)=>{
    res.send('item create form')
})

router.get('/item/:id/delete',(req,res)=>{
    res.send('category delete form')
})
router.post('/item/:id/delete',(req,res)=>{
    res.send('item deleted')
})

router.get('/item/:id', (req,res) =>{
    res.send('categories ' + req.params.id + ' page NOT IMPLEMENTED')
})

router.get('/items', (req,res) =>{
    res.send('Items page NOT IMPLEMENTED')
})


module.exports = router



