const mongoose = require('mongoose');

const {model, Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        require: true
    },
    passwordHash:{
        type: String,
        required: true,

    },
});

userSchema.set('toJSON', {
    transform:(document, userToJSON) =>{
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.__v;
        delete userToJSON.passwordHash;

    },
});
const User = model('User', userSchema);

module.exports = User;