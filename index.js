require('dotenv').config();
const PORT = process.env.PORT || 5004;
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerModel = require('./models/resgisterModel');
const flash = require('connect-flash');
const session = require('express-session');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

try{
    app.listen(PORT,()=>{
        console.log('Server is running at the PORT '+PORT);
    })
}catch(err){
    console.log("Error in connecting through the server");
}

const viewsPath = path.join(__dirname+'/templates/views');
const partialsPath = path.join(__dirname+'/templates/partials');
const staticPath = path.join(__dirname,'/public');
console.log(partialsPath);
console.log(viewsPath);
console.log(staticPath);
app.set('view engine','hbs');
app.set('views',viewsPath); 
app.use(express.static(staticPath));        

hbs.registerPartials(partialsPath);
const routing = require('./routes/userRoutes');

const MongoDB_URL = process.env.MongoDB_URL;

const dbconnection = () =>{
    mongoose
        .connect(MongoDB_URL)
        .then(()=>{
            console.log("Successfully connected to the Database");
        })
        .catch((error)=>{
            console.log('Error in connection to the DataBase '+error);
        })
}

dbconnection();
    
try{
    app.use('/',routing);
}catch(error){
    console.log('Error in the routing through the index page');
}


