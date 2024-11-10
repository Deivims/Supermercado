// Importar todas las librerias
import express from "express"
import mysql from "mysql2"
import { z}from "zod"

// app 
const app = express()
const port = 3012


app.use( express.json());

app.use (express.static("public"));

// configuracion a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "Deivi0607",
    database: "superMercado"

})


db.connect(err =>{
    if (err){
        console.error("error al conectarse a la base de datos" +err)
            return
    }
    console.info("conexion exitosa")
})

const articuloShema = z.object(
    {
        nombre: z.string().min (1),
        descripcion: z.string().optional(),
        precio: z.number ().nonnegative(),
        cantidad: z.number ().int().nonnegative,
        categoria: z.string().optional(),
        imagen: z.string ().url().optional
    }
)

app.get ('/articulo', (req, res) => {
    db.query('select * from superMercado.articulos', (err, result) =>{
            if (err) {
                return res.status(500).json({error: err.message});
            }
        
        res.json(result)
})
})


app.get ('/articulo/buscar', (req, res) => {
    const {nombre, categoria } = req.query;
    let consulta = 'select * from  superMercado.articulos where ';
    console.log(consulta);
    const params = [];

    if (nombre ){
        consulta += `nombre = "${nombre}"`;
    }
    if (categoria ){
        consulta += `categoria = "${categoria}"`;
    }


    db.query(consulta, (err, result) =>{
            if (err) {
                return res.status(500).json({error: err.message});
            }
        res.json(result)
    })
})
app.listen (port,()=>{
    console.info('servidor corriendo por el http:'+ port)
})



    




