

require('./db/mongo');

const express = require('express');
const {PORT} = require('./utils/config');
const cors = require('cors');

const {handlerNotFound, handlerError, logger} = require('./utils/middleware');


const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const { climasRouter } = require('./routes/climasRouter');


const app = express();

//body middleware
app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/clima', climasRouter);


//si no tenes ninguna de las anteriores rutas
app.use(handlerNotFound);
app.use(handlerError);

app.listen(3000, ()=>{
    console.log(`Servidor:${PORT}`)
})