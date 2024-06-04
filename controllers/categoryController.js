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

exports.category_create_post = [
    body('name', "Category name cannot be empty and must have more than a letter")
        .trim()
        .isLength({min:2})
        .escape(),
    asyncHandler(async (req,res,next) => {
        
        const errors = validationResult(req)


        const category = new Category({
            name: req.body.name
        })

        if(!errors.isEmpty()){

            res.render("category_form",{
                category,
                errors: errors.array()
            })


        }else{

            await category.save()
            res.redirect(category.url)


        }


})]






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

exports.category_update_post = [
    body("name")
        .notEmpty()
        .withMessage("Cannot be empty")
        .isLength({min:2})
        .withMessage("Must have more than 1 letters"),
    asyncHandler(async (req,res,next) => {

        const errors = validationResult(req)

        const category = new Category({
            name : req.body.name,
            _id: req.params.id
        })

        if(!errors.isEmpty()){

            res.render("category_form", {
                title: "Update Category",
                category,
                errors: errors.array()
            })

        }else{

            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {})
            res.redirect(updatedCategory.url)

        }

        
})]

exports.category_delete_get = asyncHandler(async (req,res,next) => {
    res.send("Categeory delete page NOT IMPLEMENTED")
})

exports.category_delete_post = asyncHandler(async (req,res,next) => {
    res.send("Categeory delete post NOT IMPLEMENTED")
})