import { connectDatabase } from "../connection.db.js";
import Product from "../schemas/product.schema.js"
import User from "../schemas/user.schema.js"
import Sell from "../schemas/sell.schema.js"


export const createSell = async({id_usuario,fecha,total,email,productos}) =>{
try {
    await connectDatabase()

    console.log(productos)

    // Crear el producto con la referencia a la categoría
    const res = await Sell.create({
        id_usuario,
        fecha,
        total,
        email,
        productos
    });
    
    return JSON.parse(JSON.stringify(res));
} catch (error) {
    console.log(error)
}

}

