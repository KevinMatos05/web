import express from "express";
import service from "./src/services/service.js";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get("/ajustes", async (req, res) => {
    try{
        res.json(await service.getAllAjustes());
    }catch(Error){
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
   
})

app.get("/productos", async (_, res) => {
    try{
        res.json(await service.getAllProductos());
    }catch(Error){
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.' + Error})
    }
   
})

app.post('/ajustes', async (req, res) => {
    try{
       const ajuste = await service.createAjuste(req.body)
    return res.json(ajuste);
    }catch(error){
        console.log(error)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
});

app.listen(3001, () => {
    console.log("Servidor iniciado en el puerto 3001");
});
