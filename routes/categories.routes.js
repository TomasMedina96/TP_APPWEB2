//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';

//lee y trae el archivo
const fileCategories = await readFile('./data/categorias.json','utf-8')
//Lo convierte en JSON.
const categoriesData = JSON.parse(fileCategories)

const router = Router()

router.get('/all/', (req,res) =>{
try {
    const result = categoriesData.map(e => e)

    res.status(200).json(result)
} catch (error) {
    res.status(500).json('Error en el servidor: ' + error.message);
}

}
)

export default router;