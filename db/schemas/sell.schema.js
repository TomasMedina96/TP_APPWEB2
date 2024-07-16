import mongoose from "mongoose";

const {Schema,models,model, ObjectId} = mongoose;

const SellSchema = new Schema({
    id_usuario: {type: ObjectId, required:true, ref:"user"},
    fecha: {type: String, required:true},
    total: {type: Number, required:true},
    email: {type: String, required:true},
    productos: [{
        producto: {type: ObjectId, required:true, ref:"product"},
        cantidad: {type: Number, required:true},
        _id: false // Deshabilita la generación de _id para subdocumentos
    }
    ]

})

const Sell = models.sell || model('sell', SellSchema)

export default Sell;

