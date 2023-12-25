const mongoose = require('mongoose');

const paperlessDSC = new mongoose.Schema({
    name:{
        type:String,
        minLength:[5,"Name must contain minimum 5 characters"],
        trim:true
    },
    mobile:{
        type:Number,
        maxLength:[10,"Number is Invalid"],
        minLength:[10,"Number is Invalid"]
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        trim:true
    },
    takingInfo:{
        type:String,
        required:true,
        trim:true
    }  
})


const paperlessDSCmodel = mongoose.model('DSC_Model',paperlessDSC);
module.exports = paperlessDSCmodel