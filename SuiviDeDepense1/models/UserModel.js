const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: true,
        required: true
    },opt:{
        type: String,
        require:true
    },
    verify_at:{
        type: Date
    }
  });

const User = mongoose.model('users', UserSchema) ;

module.exports = User;