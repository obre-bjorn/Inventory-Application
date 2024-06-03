const Category = require('../models/category')
const Item = require('../models/item')

const asyncHandler = require('express-async-handler')
const {body , validationResult} = require("express-validator")



exports.categories_list = asyncHandler( async (req,res,next)=>{
  const categories = await Category.find().sort({name:1}).exec() 

    res.render("categories_list", {title: "Category List", categories})

})


exports.category_detail = asyncHandler(async (req,res,next) =>{


    const [category,itemsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}, "name summary").exec()
    ])


    if(category === null){

        const err = new Error('Category not found')
        err.status = 404

        return next(err)
    }


    res.render("category_detail", {
        category: category,
        category_items: itemsInCategory

    })

})


exports.category_create_get = asyncHandler(async (req,res,next) => {
    res.render("category_form",{title: "Create New Category"})
})

exports.category_create_post = asyncHandler(async (req,res,next) => {
    res.send("Category Post NOT IMPLEMENTED")
})






exports.category_update_get = asyncHandler(async (req,res,next) => {
    const category = await Category.findById(req.params.id).exec()
    
    if (category === null){
        const err = new Error("Category not found")
        err.status = 404
       return next(err)
    }
    res.render("category_form",{
        title: "Update Category",
        category
    })
})

exports.category_update_post = asyncHandler(async (req,res,next) => {
    res.send("Categeory update post NOT IMPLEMENTED")
})

exports.category_delete_get = asyncHandler(async (req,res,next) => {
    res.send("Categeory delete page NOT IMPLEMENTED")
})

exports.category_delete_post = asyncHandler(async (req,res,next) => {
    res.send("Categeory delete post NOT IMPLEMENTED")
})