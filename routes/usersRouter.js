const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req,res,next) =>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
});

usersRouter.get('/:id', (req, res) =>{

    const id = req.params.id;
    User.findById(id)
    .then(user=>{
        if(user){
            res.json(user);
        }
        res.status(404).end();
    })
    .catch(err =>{
        res.status(400).send({error: "id invalido"});
    })

});


usersRouter.post('/', async (req, res, next) =>{
    try {
        const {username, password} = req.body;
        const saltRounds = 10;
        if(password.length !== 6){
            return next({name:"validationError", message:"No tiene 6 caracteres"})
        }
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            passwordHash
        });

        const userSaved = await user.save();
        res.status(201).json(userSaved);
    } catch (error) {
        next(error);
    }
})


module.exports = usersRouter;
