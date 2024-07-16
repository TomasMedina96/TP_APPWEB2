import { connectDatabase } from "../connection.db.js";
import Product from "../schemas/product.schema.js"
import Category from "../schemas/category.schema.js"

export const createProd = async({name,desc,price,imagen,stock,categoryName}) =>{
try {
    await connectDatabase()

    // Buscar la categoría por nombre
    const category = await Category.findOne({ nombre: categoryName });

    if (!category) {
        throw new Error(`Categoría con nombre ${categoryName} no encontrada`);
    }

    // Crear el producto con la referencia a la categoría
    const res = await Product.create({
        name,
        desc,
        price,
        imagen,
        stock,
        category: category._id
      });
  
    const populatedProduct = await Product.findById(res._id).populate('category');
    
    return JSON.parse(JSON.stringify(populatedProduct));
} catch (error) {
    console.log(error)
}


}

export const allProduct = async() =>{
    try{
        await connectDatabase()
        const populateProduct = await Product.find().populate('category');
        
        return JSON.parse(JSON.stringify(populateProduct));
    } catch (error) {
        console.log(error)
    }
}

export const productByCategory = async(categoryName) =>{
    try{
        await connectDatabase()

        // Buscar la categoría por nombre
        const category = await Category.findOne({ _id: categoryName });

        if (!category) {
            
            throw new Error(`Categoría con nombre ${categoryName} no encontrada`);
            
        }

         // Buscar productos por categoría
        const populateProduct = await Product.find({ category: category._id }).populate('category');   

        
        return JSON.parse(JSON.stringify(populateProduct));
    } catch (error) {
        console.log(error)
    }
}