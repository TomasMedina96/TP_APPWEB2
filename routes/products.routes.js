//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';

//lee y trae el archivo
const fileProducts = await readFile('./data/productos.json','utf-8')
//Lo convierte en JSON.
const productsData = JSON.parse(fileProducts)

const router = Router()

//Lista de todos los productos
router.get('/getProducts/', (req,res)=>{
    try {
       const result = productsData.map(e =>e)
 
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
router.post('/getProductsByCategory/', (req,res)=>{
   try {
      const categoria = req.body.id

      const result = productsData.filter(e => e.categoria_id == categoria);

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



 export default router;