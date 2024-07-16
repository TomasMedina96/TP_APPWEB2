import mongoose from "mongoose";

const {Schema,models,model, ObjectId} = mongoose;

const ProductSchema = new Schema({
    name:{type: String, required:true},
    desc: {type: String, required:true},
    price: {type: Number, required:true},
    imagen: {type: String, required:true},
    stock: {type: Boolean, required:true},
    category: {type: ObjectId, required:true, ref:"category"}

})

const Product = models.product || model('product', ProductSchema)

export default Product;