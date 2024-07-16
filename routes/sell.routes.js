//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile , writeFile} from 'fs/promises';
import { verify } from "../utils/middleware.js";

import { createSell } from "../db/actions/sell.actions.js";

//lee y trae el archivo
const fileSells = await readFile('./data/ventas.json','utf-8')
//Lo convierte en JSON.
const sellData = JSON.parse(fileSells)



const router = Router()

//CARGAR UNA NUEVA VENTA EN VENTAS.JSON
router.post('/newSell/', async (req,res) =>{

   try {
      const id_usuario = req.body.id_usuario
      const fecha = req.body.fecha
      const total = req.body.total
      const email = req.body.email
      const productos = req.body.productos
      const token = req.body.token
      const verificado = await verify(token)


       if(verificado){
        const newSell= await createSell({id_usuario,fecha,total,email,productos})

         res.status(200).json(true)

       }
       else{
          res.status(200).json(false);
       }

      
   } catch (error) {
      res.status(400).json(error);
   }

    

})


//OBTENER TODAS LAS VENTAS
router.post('/sells/', (req,res)=>{
   try {

      const id_venta= req.body.id

      const result = sellData.find(e => e.id == id_venta)


      if(result){

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


//ELIMINAR UNA VENTA
router.delete('/deletesell/:id', async (req,res)=>{
   try {

      const id_venta = parseInt(req.params.id)

        // Encontrar el índice del elemento a eliminar
        const index = sellData.findIndex(e => e.id === id_venta);

        if (index !== -1) {
            // Elimina el elemento del array
            sellData.splice(index, 1);

            // Guardar los datos actualizados en el archivo
            await writeFile('./data/ventas.json', JSON.stringify(sellData, null, 2), 'utf-8');

            res.status(200).json({ message: "Venta eliminada con éxito" });
        } else {
            res.status(400).json('Venta no encontrada');
        }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})



//OBTENER VENTAS POR ID
router.get('/sells/:id', (req,res)=>{
   try {

      const id_venta = parseInt(req.params.id);

      const result = sellData.find(e => e.id == id_venta)


      if(result){
         res.status(200).json(result)
      }
      else{
         res.status(400).json('Venta no encontrada')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

export default router;