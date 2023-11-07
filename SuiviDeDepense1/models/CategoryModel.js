const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    budget:{
        type:Number
    },
    user_id:{
        type:String
    }
  });

const Category = mongoose.model('categories', CategorySchema ) ;

module.exports = Category;