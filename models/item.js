const mongoose = require("mongoose")

const Schema = mongoose.Schema


const ItemSchema = new Schema({
    name: {type: String, required: true},
    description:{type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    price: {type:Number, required: true},
    in_stock: {type:Number}
})


ItemSchema.virtual("url").get(function (){
    return `/inventory/item/${this._id}`
})



module.exports = mongoose.model("Item",ItemSchema)