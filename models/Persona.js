const mongoose = require('mongoose');

const {model, Schema} = mongoose;

const personaSchema = new Schema({
    nombre:{
        type: String,
        require: true
    },
    edad:{
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
});

personaSchema.set('toJSON', {
    transform:(document, personaToJSON) =>{
        personaToJSON.id = personaToJSON._id.toString();
        delete personaToJSON._id;
        delete personaToJSON.__v;

    },
});
const Persona = model('Persona', personaSchema);

module.exports = Persona;