
const climasRouter = require('express').Router();
const Clima = require('../models/Clima');
const { verifyToken } = require('../utils/middleware');


//climasRouter.use(verifyToken);

climasRouter.get('/',(req, res) =>{
    Clima.find({})
    .then(climas=>{
        res.json(climas);
    })
});



climasRouter.get('/:id', (req, res) =>{

    const id = req.params.id;
    Clima.findById(id)
    .then(clima=>{
        if(clima){
            res.json(clima);
        }
        res.status(404).end();
    })
    .catch(err =>{
        res.status(400).send({error: "id invalido"});
    })

});



climasRouter.delete('/:id', (req, res) =>{

    const id = req.params.id;
    Clima.findByIdAndRemove(id)
    .then((result) =>{
        if(result){
            res.status(204).end();
        }
        res.status(404).end();
    })
    .catch(err => {
        res.status(400).end();
    })

});




climasRouter.post('/', (req, res, next) =>{
    const {pais, ciudad, temperatura, viento, tipo, esamericasur} = req.body;
    if(pais && ciudad && temperatura && viento && tipo && esamericasur){

        const newClima = new Clima
        ({
            pais,
            ciudad,
            temperatura,
            viento,
            tipo,
            esamericasur
        });
        newClima.save()
        .then(clima =>{
            res.json(clima);
        })
        .catch(err =>{
            next(err);
        })
    }
    else{
        res.status(400).send({error: "Parametros invalidos"});
    }
});



climasRouter.put('/:id', (req, res) =>{

    const id = req.params.id;
    const {pais, ciudad, temperatura, viento, tipo, esamericasur} = req.body;
    const infoClima = {pais, ciudad, temperatura, viento, tipo, esamericasur};
    const infClima = {};
    if(pais){
        infClima.pais = pais;
    }
    if(ciudad){
        infClima.ciudad = ciudad;
    }
    if(temperatura){
        infClima.temperatura = temperatura;
    }
    if(viento){
        infClima.viento = viento;
    }
    if(tipo){
        infClima.tipo = tipo;
    }
    if(esamericasur){
        infClima.esamericasur = esamericasur;
    }

    Clima.findByIdAndUpdate(id, infoClima, {new:true})
    .then(clima =>{
        if(clima){
            res.json(clima)
        }
        res.status(400).end();
    })
    .catch((err)=>{
        next(err);
    })
});



module.exports = {
    climasRouter
}
