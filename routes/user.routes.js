//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile, writeFile} from 'fs/promises';
import { sign } from "../utils/middleware.js";

import { decode } from "../utils/middleware.js";
import bcrypt from 'bcryptjs'
import { createUser,validateUser } from "../db/actions/user.actions.js";

//lee y trae el archivo
const fileUsers = await readFile('./data/usuarios.json','utf-8')

//Lo convierte en JSON.
const userData = JSON.parse(fileUsers)

const router = Router()



// Endpoint para validar usuarios
router.post('/users/validation', async(req, res) => {
   try {
       const { email, pass } = req.body;

       const result = await validateUser(email)
       if(!result){
         return res.status(404).send({status:false});
       }
       console.log(result)
       const controlPass = bcrypt.compareSync(pass , result.contraseña)

       const resultado = {
         "idUsuario": result._id,
         "nombre": result.nombre,
         "apellido": result.apellido,
         "email" : result.email
       }

       if (controlPass) {
            const token = await sign(resultado)
            const decodificado = await decode(token)
            res.status(200).json({"decode":decodificado,"token":token});    
       } else {
           res.status(401).json('Usuario no encontrado');
       }
   } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
   }
});

//REGISTRAR UN NUEVO USUARIO
router.post('/newuser/', async (req,res)=>{
   try {

      const { nombre, apellido, email, contraseña } = req.body;

        // Verificación de que todos los campos requeridos están presentes
        if (!nombre || !apellido || !email || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, apellido, email y contraseña' });
        }

        const hashedPass = bcrypt.hashSync(contraseña, 8)

       const new_user =   {
         "nombre": nombre,
         "apellido": apellido,
         "email": email,
         "contraseña": hashedPass
       }

       const result = await createUser({ nombre, apellido, email, contraseña })

    
       res.status(200).json(result)  
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