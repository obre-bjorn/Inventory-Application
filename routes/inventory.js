const express = require("express");
const router = express.Router()

const category = require('../controllers/categoryController')
const item = require("../controllers/itemController")

router.get('/', item.index)


// Category Routes

router.get('/category/create', category.category_create_get)

router.post('/category/create',(req,res) =>{
    res.send("category created")
})

router.get('/category/:id/update',category.category_update_get)
router.post('/category/:id/update',(req,res)=>{
    res.send('category updated')
})

router.get('/category/:id/delete',(req,res)=>{
    res.send('category delete form')
})
router.post('/category/:id/delete',(req,res)=>{
    res.send('category deleted')
})

router.get('/category/:id', category.category_detail)
router.get('/categories', category.categories_list)



// Item Routes 
router.get('/item/create',item.item_create_get)

router.post('/item/create',(req,res) =>{
    res.send("item created")
})

router.get('/item/:id/update',item.item_update_get)
router.post('/item/:id/update',(req,res)=>{
    res.send('item create form')
})

router.get('/item/:id/delete',(req,res)=>{
    res.send('category delete form')
})
router.post('/item/:id/delete',(req,res)=>{
    res.send('item deleted')
})

router.get('/item/:id', item.item_detail)

router.get('/items', item.items_list)


module.exports = router



