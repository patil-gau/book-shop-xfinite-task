const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,"Please provide Book title"],
        maxlength : [40,"Book title should be less than 40 characters"]   
    },
    category : {
       type : String,
       required : [true,"Please provide Book Category"],
    },
    author : {
       type : String,
       required : [true,"Please provide Book Author"],
    },
    comments : {
        type : [String],   
    },
    ratings : {
        type : [Number],
    }
});

const Book =  mongoose.model('Book',userSchema);
module.exports = Book;

