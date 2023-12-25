const mongoose = require('mongoose');

const joinProgramSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please enter your name"],
        minLength:[5,"minimum length of name must be 5"],
    },
    mobile:{
        type:Number,
        trim:true,
        minLength:[10,"Please enter a valid number"],
        maxLength:[10,"Please enter a valid number"],
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    city:{
        type:String,
        trim:true,
        required:true
    },
    // state:{
    //     type:String,
    //     trim:true
    // }
})

const applicantsModel = mongoose.model('Join_Program_Applicants',joinProgramSchema);

module.exports = applicantsModel;