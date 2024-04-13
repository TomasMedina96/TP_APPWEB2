//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';

//lee y trae el archivo
const fileUsers = await readFile('./data/usuarios.json','utf-8')

//Lo convierte en JSON.
const userData = JSON.parse(fileUsers)

const router = Router()

router.post('/users/', (req,res)=>{
   try {

      const id_usuario = req.body.id

      const result = userData.find(e => e.id == id_usuario)


      if(result){
         res.status(200).json(result)
      }
      else{
         res.status(400).json('Usuario no encontrado')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

export default router;