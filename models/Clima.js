const mongoose = require('mongoose');

const {model, Schema} = mongoose;

const climaSchema = new Schema({
    pais:{
        type: String,
        require: true,
    },
    ciudad:{
        type: String,
        required: true,
    },
    temperatura: {
        type:Number,
        required:true,
    },
    viento:{
        type:Number,
        required:true,
    },
    tipo:{
        type:String,
        required:true,
    },
    esamericasur:{
        type:Boolean,
        require:true
    }
});

climaSchema.set('toJSON', {
    transform:(document, climaToJSON) =>{
        climaToJSON.id = climaToJSON._id.toString();
        delete climaToJSON._id;
        delete climaToJSON.__v;

    },
});
const Clima = model('Clima', climaSchema);

module.exports = Clima;