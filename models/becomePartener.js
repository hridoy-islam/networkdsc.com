const mongoose = require('mongoose');

const partenerSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    age:{
        type:Number,
        required:[true,"Please Enter Your Age"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your E-Mail"]
    },
    mobile:{
        type:String,
        required:[true,"Please your Mobile Number"]
    },
    city:{
        required:[true,"Please Enter Your City"],
        type:String
    },
    state:{
        required:[true,"Please Enter Your State"],
        type:String
    }
})


const partener = mongoose.model('parteners',partenerSchema);

module.exports = partener;