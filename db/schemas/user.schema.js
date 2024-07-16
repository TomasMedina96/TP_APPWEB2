import mongoose from "mongoose";

const {Schema,models, model} = mongoose;

const userSchema = new Schema({
    nombre:{type: String, required:true},
    apellido:{type: String, required:true},
    email:{type: String, required:true},
    contraseña:{type: String, required:true}
})

const User = models.user || model('user', userSchema)

export default User;