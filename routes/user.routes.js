//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile, writeFile} from 'fs/promises';

//lee y trae el archivo
const fileUsers = await readFile('./data/usuarios.json','utf-8')

//Lo convierte en JSON.
const userData = JSON.parse(fileUsers)

const router = Router()

//OBTENER USUARIOS POR ID
router.get('/users/:id', (req,res)=>{
   try {

      const id_usuario = parseInt(req.params.id);

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


//REGISTRAR UN NUEVO USUARIO
router.post('/newuser/', async (req,res)=>{
   try {

      const lastUserId = userData[userData.length - 1].id;

      const { nombre, apellido, email, contraseña } = req.body;

        // Verificación de que todos los campos requeridos están presentes
        if (!nombre || !apellido || !email || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, apellido, email y contraseña' });
        }


       const new_user =   {
         "id": lastUserId+1,
         "nombre": nombre,
         "apellido": apellido,
         "email": email,
         "contraseña": contraseña
       }

       userData.push(new_user);
       await writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2), 'utf-8');
       res.status(200).json("Usuario registrado con exito")
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})


//MODIFICAR EL EMAIL DE UN USUARIO CON SU ID
router.put('/email/', async (req,res)=>{
   try {

      const id_usuario = req.body.id
      const email_nuevo = req.body.email

      const result = userData.find(e => e.id == id_usuario)


      if(result){
         result.email = email_nuevo;
         await writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2), 'utf-8');
         res.status(200).json(`El email del Sr.${result.nombre + " " + result.apellido} fue modificado correctamente`)
      }
      else{
         res.status(400).json('Usuario no encontrado')
      }
 
      
   } catch (error) {
      res.status(500).json('Error en el servidor: ' + error.message);
   }

})

export default router;