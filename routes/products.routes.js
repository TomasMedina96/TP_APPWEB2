//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';
import { createProd,productByCategory,allProduct } from "../db/actions/product.actions.js";

//lee y trae el archivo
const fileProducts = await readFile('./data/productos.json','utf-8')
//Lo convierte en JSON.
const productsData = JSON.parse(fileProducts)

const router = Router()

//Lista de todos los productos
router.get('/getProducts/', async (req,res)=>{
    try {

       const result = await allProduct()
       if(result){

         res.status(200).json(result)
       }
       else{
          res.status(400).json('No hay productos en venta')
       }
  
       
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 
 })


 //Lista de productos por categoria
router.post('/getProductsByCategory/', async (req,res)=>{
   try {
      const categoria = req.body.nombre
   
      const result = await productByCategory(categoria)

      if(result){

        res.status(200).json(result)
      }
      else{
         res.status(400).json({status:false})
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

router.post('/newproduct/', async (req,res) =>{
try {
   const {nombre,desc,precio,imagen,en_stock,categoryName} = req.body

   const result = await createProd({name:nombre,desc,price:precio,imagen,stock:en_stock,categoryName})

   res.status(200).json(result)
   
} catch (error) {
   console.log(error)
   res.status(400).json()
}
})


export default router;