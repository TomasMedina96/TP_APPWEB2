//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';

//lee y trae el archivo
const fileSells = await readFile('./data/ventas.json','utf-8')
//Lo convierte en JSON.
const sellData = JSON.parse(fileSells)



const router = Router()

router.post('/sells/', (req,res)=>{
   try {

      const id_venta= req.body.id

      const result = sellData.find(e => e.id == id_venta)


      if(result){

        // Crear un nuevo objeto que solo contenga las propiedades deseadas
        const respuesta = {
            numero_venta: result.id,
            fecha_venta: result.fecha,
            total: result.total
        };

        res.status(200).json(respuesta)
      }
      else{
         res.status(400).json('Venta no encontrada')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

export default router;