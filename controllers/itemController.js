const asyncHandler = require("express-async-handler")

const Category = require('../models/category')
const Item = require('../models/item')



exports.index = asyncHandler (async (req,res,next) =>{
    const [category_count,items_count] = await Promise.all([
        Category.countDocuments({}).exec(),
        Item.countDocuments({}).exec()
    ])

    res.render('index',{
        title: "Simple Inventory App",
        items_count: items_count,
        category_count: category_count
    })

})


exports.items_list = asyncHandler( async (req,res,next)=>{
    
    const items = await Item.find().sort({name: 1}).exec()

    res.render("items_list",{
        title: 'Items List',
        items
    })
})


exports.item_detail = asyncHandler(async (req,res,next) =>{
    const item = await Item.findById(req.params.id).populate('category').exec()

    res.render('item_detail',{item})
})


exports.item_create_get = asyncHandler(async (req,res,next) => {
    const categories = await Category.find({}).sort({name:1}).exec() 
    res.render("item_form",{
        title: "Create new item",
        categories
    })

})

exports.item_create_post = asyncHandler(async (req,res,next) => {
    res.send("Item Post NOT IMPLEMENTED")
})

exports.item_update_get = asyncHandler(async (req,res,next) => {
    const [item, categories] = await Promise.all([
        Item.findById(req.params.id).exec(),
        Category.find().sort({name:1}).exec()
    ])

    if(item === null){
        const err = new Error ("Item not Found")
        err.status = 404
        return next(err)
    }

    res.render("item_form",{
        title: "Update Item: " + req.params.id,
        item,
        categories
    })
})

exports.item_update_post = asyncHandler(async (req,res,next) => {
    res.send("Item update post NOT IMPLEMENTED")
})

exports.item_delete_get = asyncHandler(async (req,res,next) => {
    res.send("Item delete page NOT IMPLEMENTED")
})

exports.item_delete_post = asyncHandler(async (req,res,next) => {
    res.send("Item delete post NOT IMPLEMENTED")
})

