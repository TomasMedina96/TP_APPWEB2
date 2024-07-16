import { connectDatabase } from "../connection.db.js";
import Category from "../schemas/category.schema.js"

export const createCategory = async({nombre}) =>{
try {
    await connectDatabase()
    const res = await Category.create({nombre})

    return JSON.parse(JSON.stringify(res))
} catch (error) {
    console.log(error)
}


}


export const allCategory = async() =>{
    try {
        await connectDatabase()
        const res = await Category.find()
    
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
    
    
    }