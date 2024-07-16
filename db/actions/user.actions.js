import { connectDatabase } from "../connection.db.js";
import User from "../schemas/user.schema.js"

export const createUser = async({nombre, apellido,email,contraseña}) =>{
try {
    await connectDatabase()
    const res = await User.create({nombre, apellido,email,contraseña})

    return JSON.parse(JSON.stringify(res))
} catch (error) {
    console.log(error)
}

}

export const validateUser = async(email) =>{
    try {
        await connectDatabase()
        const res = await User.findOne({email: email})

        return JSON.parse(JSON.stringify(res))

    } catch (error) {
        console.log(error)
    }
    
    
}