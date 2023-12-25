const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Your Name'],
        trim:true,
        minLength:[4,"Minimum Characters must be greater than the 4"],
        maxLength:[20,"Maximum character must be less 20 charaters"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Please enter your E-Mail"]
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:[8,"Password must contains minimum of 8 characters"]
    },
    confirmPassword:{
        type:String,
        trim:true,
        required:true,
        minLength:[8,"Password must contains minimum of 8 characters"]
    },
    age:{
        type:Number,
        required:true,
        maxLength:[2,'Enter Valid Age Credentials'],
    },
    state:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,'Enter the State Details']
    },
    address:{
        type:String,
        required:true,
    },
    isverified:{
        type:Number,
        default:0
    }
})

const userRegistration = mongoose.model('register',registerSchema);

module.exports = userRegistration;