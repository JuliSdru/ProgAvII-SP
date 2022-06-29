
//archivo conexion a la bbdd
const {connect} = require('mongoose');
const {DB_URI} = require('../utils/config')



const conectarDB = async() =>{
    connect(DB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useFindAndModify:false,
    });
};

conectarDB()
    .then(result=>{
        console.log("DB connect")
    })
    .catch((err)=>{
        console.log(err);
    });