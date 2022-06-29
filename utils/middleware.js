const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config');


const handlerNotFound = (req, res) =>{
    res.status(404).json({error: "No existe esa ruta"});
};

const handlerError = (error, req, res, next) => {
    console.log(error.name);
    if(error.name === "CastError"){
        res.status(400).send({error: "Bad ID"});
    }else if(error.name === "SyntaxError"){
        res.status(400).send({error: "SyntaxError"})
    }else if(error.name === "ReferenceError") {
        res.status(400).send({error: error.name, message: error.message});
    }else if(error.name === "ValidationError"){
        res.status(400).send({error:error.name, message:error.message});
    }else if(error.name === "ErrorToken"){
        res.status(401).send({error:error.name, message:error.message});
    }else if(error.name === "JsonWebTokenError"){
        res.status(403).send({error:error.name, message:error.message});
    }
    else{
        res.status(500).send({error: error.name, message: error.message });
    }
    next();
};


const logger = (req, res, next) => {
    console.log(req.path);
    console.log(req.method);
    next();
}

const verifyToken = async (req, res, next) => {
    //te devuelve un string
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken !== 'undefined'){
        req.token = bearerToken.split(" ")[1];
        try {
            //le paso el token y el secret
            const data = await jwt.verify(req.token, SECRET, {expiresIn: "120s"})
            console.log(data);
            next();
        } catch (error) {
            next(error);
        }
    }else{
        next({name: "ErrorToken", message: "No token"})
    }

}

module.exports = {
    handlerError,
    handlerNotFound,
    logger,
    verifyToken
};