const express = require("express");
const router = express.Router()

const category = require('../controllers/categoryController')
const item = require("../controllers/itemController")


router.get('/', item.index)


// Category Routes

router.get('/category/create', category.category_create_get)
router.post('/category/create',category.category_create_post)

router.get('/category/:id/update',category.category_update_get)
router.post('/category/:id/update',category.category_update_post)

router.get('/category/:id/delete',category.category_delete_get)
router.post('/category/:id/delete',category.category_delete_post)

router.get('/category/:id', category.category_detail)
router.get('/categories', category.categories_list)



// Item Routes 
router.get('/item/create',item.item_create_get)
router.post('/item/create',item.item_create_post)

router.get('/item/:id/update',item.item_update_get)
router.post('/item/:id/update',item.item_update_post)

router.get('/item/:id/delete',item.item_delete_get)
router.post('/item/:id/delete',item.item_delete_post)


router.get('/item/:id', item.item_detail)

router.get('/items', item.items_list)


module.exports = router



