
const personasRouter = require('express').Router();
const Persona = require('../models/Persona');
const { verifyToken } = require('../utils/middleware');

//le mandamos una ruta especifica para traer todas las personas
// app.get('/api/personas', (req, res) =>{
//     res.json(getPersonas());
// });

//personasRouter.use(verifyToken);

personasRouter.get('/',verifyToken,(req, res) =>{
    Persona.find({})
    .then(personas=>{
        res.json(personas);
    })
});

// app.get('/api/personas/:id', (req, res) =>{

//     //obtengo el parametro id
//     //parse para que venga de tipo number
//     //const id = parseInt(req.params.id);
//     const id = req.params.id;
//     const persona = getPersona(id);

//     persona?res.json(persona).end():res.status(404).end();

// });

personasRouter.get('/:id', (req, res) =>{

    const id = req.params.id;
    Persona.findById(id)
    .then(persona=>{
        if(persona){
            res.json(persona);
        }
        res.status(404).end();
    })
    .catch(err =>{
        res.status(400).send({error: "id invalido"});
    })

});


// app.delete('/api/personas/:id', (req, res) =>{

//     //obtengo el parametro id
//     //parse para que venga de tipo number
//     //const id = parseInt(req.params.id);
//     const id = req.params.id;

//     deletePersona(id)
//     ? res.status(204).json({ok:true, message: "Persona eliminada"}).end()
//     : res.status(200).json({ok:false, error: "No existe persona con ese id"});

// });

personasRouter.delete('/:id', (req, res) =>{

    const id = req.params.id;
    Persona.findByIdAndRemove(id)
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

// app.post('/api/personas/', (req, res) =>{
//     const body = req.body;
//     const nuevaPersona =  createPersona(body);
//     nuevaPersona?res.status(201).json(nuevaPersona).end():res.status(400).end();
// });

personasRouter.post('/', (req, res, next) =>{
    const {nombre, edad} = req.body;
    if(nombre && edad){

        const newPersona = new Persona
        ({
            nombre,
            edad
        });
        newPersona.save()
        .then(persona =>{
            res.json(persona);
        })
        .catch(err =>{
            next(err);
        })
    }
    else{
        res.status(400).send({error: "Parametros invalidos"});
    }
});

// app.put('/api/personas/', (req, res) =>{

//     const body = req.body;
//     updatePersona(body)
//     ? res.status(200).json({ok:true, message: "Persona act"}).end()
//     : res.status(200).json({ok:false, error: "No existe persona con ese id"});

// });

personasRouter.put('/:id', (req, res) =>{

    const id = req.params.id;
    const {nombre, edad} = req.body;
    const infoPersona = {nombre, edad};
    const infPersona = {};
    if(nombre){
        infPersona.nombre = nombre;
    }
    if(edad){
        infPersona.edad = edad;
    }

    Persona.findByIdAndUpdate(id, infoPersona, {new:true})
    .then(persona =>{
        if(persona){
            res.json(persona)
        }
        res.status(400).end();
    })
    .catch((err)=>{
        next(err);
    })
});



module.exports = {
    personasRouter
}
