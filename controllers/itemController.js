const asyncHandler = require("express-async-handler")
const {body, validationResult} = require("express-validator")

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

exports.item_create_post = [
    body("name", "Name cannot be empty")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("category",'Cateory is required')
        .trim()
        .isLength({min:1})
        .escape(),
    body("description", ("A description of the product is required"))
        .trim()
        .isLength({min:5})
        .escape(),
    body("price")
        .notEmpty()
        .withMessage("Price cannot be empty")
        .isInt({min :1})
        .withMessage("Price cannot be less than 1"),
    body("in_stock")
        .isInt({min:0})
        .withMessage("Minimum is 0 cannot input a negative  value")
        
    ,asyncHandler(async (req,res,next) => {
        
        const errors = validationResult(req)

        const item = new Item({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            in_stock: req.body.in_stock

        })


        if(!errors.isEmpty()){

            const categories = await Category.find().sort({name:1}).exec()

            res.render("item_form",{
                title: 'Create new Item',
                item,
                categories,
                errors: errors.array()
            })

        }else{
            await item.save()
            res.redirect(item.url)

        }


})]

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

exports.item_update_post = [
    body("name", "Name cannot be empty")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("category",'Cateory is required')
        .trim()
        .isLength({min:1})
        .escape(),
    body("description", ("A description of the product is required"))
        .trim()
        .isLength({min:5})
        .escape(),
    body("price")
        .notEmpty()
        .withMessage("Price cannot be empty")
        .isInt({min :1})
        .withMessage("Price cannot be less than 1"),
    body("in_stock")
        .isInt({min:0})
        .withMessage("Minimum is 0 cannot input a negative  value")
    ,asyncHandler(async (req,res,next) => {

    const errors = validationResult(req)

    const item = new Item ({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        in_stock: req.body.in_stock,
        _id : req.params.id
    }) 

    if(!errors.isEmpty()){
        const categories = await Category.find().exec()

        res.render("item_form", {
            title: "Update Item: " + req.params.id,
            categories, 
            item,
            errors:errors.array()
        })

    }else{

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {})

        res.redirect(updatedItem.url)
    }
    

})]

exports.item_delete_get = asyncHandler(async (req,res,next) => {
    res.send("Item delete page NOT IMPLEMENTED")
})

exports.item_delete_post = asyncHandler(async (req,res,next) => {
    res.send("Item delete post NOT IMPLEMENTED")
})

