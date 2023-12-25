const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const registerModel = require('../models/resgisterModel');
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const middleware = require('../middlewares/middleware');
const applicantsModel = require('../models/joinProgramModel');
const parteners = require('../models/becomePartener');
const dscModel = require('../models/paperlessDSC'); 

const hashPassword = (password) =>{
    return bcrypt.hash(password,10);
}

const sendVerifyMail = (email,name,user_id) =>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.userEmail,
                pass:process.env.appPassword
            }
        })

        const options = ({
            from:process.env.userEmail,
            to:email,
            subject:"NetworkSDC Registration",
            html:`<h1>Welcome to the NetworkSDC </h1>
                <p>Click Here to Register your mail</p>
                <i>Largest Provider of True Digital Signatures <br>In Whole INDIA </i>
                <h4>Hii ${name} </h4>
                <p> Please Click here To register into the <h2>NetwokDSC</h2> <a href="http://localhost:5002/verify?id=${user_id}">Verify</a></p>` 
        })
        transporter.sendMail(options,(error,info)=>{
            if(error){
                console.log('Email is not sent');
            }
            else{
                console.log('Email Sent SuccessFully'+info.response);
            }
        })
    }
    catch(error){
        console.log('Error in Sending the Mail :- '+error);
    }
}


const loginSMS__gmail = async (email,name) =>{
    try {
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.userEmail,
                pass:process.env.appPassword
            }
        })

        const options = ({
            from:process.env.userEmail,
            to:email,
            subject:" Login to NetworkDSC",
            html:`<h2>Hello ${name},</h2>
                  <p>You're logged in the NetworkDSC</p>
                  <p>Thanks for login our Site</p>`
        })
        transporter.sendMail(options,(error,info)=>{
            if(error){
                console.log("Error in logging the mail :- "+error);
            }else{
                console.log('Login mail is Sent to the receiver '+info.response);
            }
        })
    } catch (error) {
        console.log("Error in sending the login Email :- "+error);
    }
}


const applicantsMail = async (email,name,mobile,city) =>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.userEmail,
                pass:process.env.appPassword
            }
        })

        const options = ({
            from:email,
            to:process.env.userEmail,
            subject:'got a new applicant for NetworkDSC',
            html:`
                <h1>Congratulations you got a new applicant , Details of applicants is given below </h1>
                <p><h3>Name of your Applicant :- <b>${name}</b><br></h3></p>
                <p><h3 Email :- ><b>${email}</b><br></h3></p>
                <p><h3>Contact :- <b>${mobile}</b><br></h3></p>
                <p><h3>City :- <b>${city}</b><br></h3></p>`
        })

        transporter.sendMail(options,(error,info)=>{
            if(error){
                console.log("Error in sending the proposal to the Admin for the ");
            }
            else{
                console.log('Message sent successfully to admin for proposal :- '+info.response);
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

// verfication mail for updating the password
const verificationMail = async (user_id,email) =>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.userEmail,
                pass:process.env.appPassword
            }
        })

        const options = ({
            from:process.env.userEmail,
            to:email,
            subject:'got a new applicant for NetworkDSC',
            html:`
                <h1>Request for resset the password in NetworkDSC :- </h1>
                <p><h3 Email :- ><b>${email}</b><br></h3></p>
                <p>Please click here to reset the password -----</p>
                <a href="http://localhost:5002/reset?id=${user_id}">Reset the Password</a>`
        })

        transporter.sendMail(options,(error,info)=>{
            if(error){
                console.log("Error in sending the proposal to the Admin for the ");
            }
            else{
                console.log('Message sent successfully to admin for proposal :- '+info.response);
            }
        })
    }
    catch(error){
        console.log(error);
    }
}


// verification mail ending for updating the password
const sendingMailofPartener = async (name,age,email,mobile,city,state) =>{
    const transporter = await nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.userEmail,
            pass:process.env.appPassword
        }
    })

    const options = ({
        from:email,
        to:process.env.userEmail,
        subject:'A new Partener',
        html:`<h1>A new partener wants to join your team</h1>
                <b>Name :- ${name}</b>
                <b>Age :- ${age}</b>
                <b>Email :- ${email}</b>
                <b>Contact :- ${mobile}</b>
                <b>City :- ${city}</b>
                <b>State :- ${state}</b>`
    })

    transporter.sendMail(options,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log('mail is sent',info.response);
        }
    })
}

const sendingDscMailToAdmin= async (name,mobile,email,age,takingInfo) =>{
    try{
        const transporter = await nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.userEmail,
                pass:process.env.appPassword
            }
        })
        const options = await ({
                from:email,
                to:process.env.userEmail,
                subject:'Apply for paperlessDSC',
                html:`Application For The PaperLessDSC
                    <h3>Name :- ${name}</h3>
                    <h3>Contact :- ${mobile}</h3>
                    <h3>E-Mail :- ${email}</h3>
                    <h3>Age :- ${age}</h3>
                    <h3>For :- ${takingInfo}</h3>`
        })
        transporter.sendMail(options,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Message Sent for applying the DSC",info.response);
            }
        })
    }catch(error){
        console.log('Error in sending the Mail :- ',error);
    }
}


const index = async (req,res) =>{
    await res.status(200).render('index');
} 

const sendMailToAdmin = async (req,res) =>{
    try {
        if(emailValidator.validate(req.body.email)){
            const applicants = new applicantsModel({
                name:req.body.username,
                mobile:req.body.mobile,
                email:req.body.email,
                city:req.body.city,
                // state:req.body.state1
            })

            const saveInTheApplicantsInDatabase = await applicants.save();
            if(saveInTheApplicantsInDatabase){
                console.log("saved user");
                applicantsMail(req.body.email,req.body.username,req.body.mobile,req.body.city);
                res.status(200).send("We'll get to you in 1 or 2 days");
            }else{
                res.send("applicants don't save in the database");
            }
        }else{
            console.log("Email is not validated");
        }
        // applicants(req.body.email,req.body.username);
    } catch (error) {
        console.log("Error in saving the application in the database");
        console.log(req.body.username,req.body.mobile,req.body.email,req.body.city);
    }
}

const products = async (req,res) =>{
    await res.render('products');
}
const partener = async (req,res) =>{
    await res.status(200).render('becomePartener');
}

const becomePartener = async (req,res) =>{
    try {
        if(emailValidator.validate(req.body.email)){
            const newPartener = new parteners({
                name:req.body.name,
                age:req.body.age,
                email:req.body.email,
                mobile:req.body.mobile,
                city:req.body.city,
                state:req.body.state
            })
            if((req.body.mobile).length === 10){
                const partenerDetails = await newPartener.save();
                sendingMailofPartener(req.body.name,req.body.age,req.body.email,req.body.mobile,req.body.city,req.body.state);
                res.status(200).redirect('/');
            }
            else{
                console.log("Invalid credentials");
            }
        }
    } catch (error) {
        res.send('Try again');
        console.log('Partener Mail is not Sending due to :- ',error);
    }
}

const pricing = async (req,res) =>{
    await res.status(200).render('index');
}

const login = async (req,res) =>{
    await res.status(200).render('login');
}

const registration = async (req,res) =>{
    await res.status(200).render('register');
}

const loginTheUser = async (req,res) =>{
    try {
        // console.log("start");
        const emailInput = req.body.email;
        const passwordInput = req.body.password;
        const loginDetails = await registerModel.findOne({email:emailInput});
        // console.log("We're trying to Login");
        // console.log(emailInput);
        // console.log(passwordInput);
        if(loginDetails){
            console.log('Actual password :- '+loginDetails.password);
            console.log('Entered Password :- '+passwordInput);
            const passwordMatch = await bcrypt.compare(passwordInput,loginDetails.password);
            // const passwordMatch = await bcrypt.compare(loginDetails.password,passwordInput);
            console.log("True/False :- "+passwordMatch);
            if(passwordMatch){
                if(loginDetails.isverified===0){
                    // console.log('hiiiiiiii');
                    res.send('Verify your Mail to Login your Account');
                    sendVerifyMail(emailInput,loginDetails.name,loginDetails._id);
                    // res.render('login',{message:'Please verify your mail'});

                }else{

                    // login session starts

                    req.session.user_id= loginDetails._id;
                    
                    await res.redirect('/pricing');
                    loginSMS__gmail(emailInput,loginDetails.name);
                }
            }
            else{
                console.log('else login failed');
                res.send("Invalid credentials");
            }
        }else{
            res.send('User not exists');
        }
    } catch (error) {
        console.log('error in login the user');
        res.redirect('/');
    }
}

const logout = async (req,res) =>{
    try {
        req.session.destroy();
        res.redirect('/');
        console.log('session is destroyed');
    } catch (error) {
        console.log(error);
    }
}

const verifyMail = async (req,res) =>{
    try {
        const updateinfo = await registerModel.updateOne({_id:req.query.id},{$set:{isverified:1}});
        if(updateinfo){
            console.log('id : '+req.query._id);
            console.log('Email is verified :- '+updateinfo);
            // res.status(200).send('Email is verified OOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!');
            res.status(200).redirect('/login');
        }
        else{
            console.log('Document is not updated');
        }
    } catch (error) {
        console.log("error in verifying the Mail :- "+error);
    }
}   
const registerUser = async (req,res) =>{
    try {
        if(emailValidator.validate(req.body.email)){
            if(req.body.password === req.body.confirmPassword){
                const registerUser = new registerModel({
                    name:req.body.username,
                    email:req.body.email,
                    password:await hashPassword(req.body.password),
                    confirmPassword:await hashPassword(req.body.confirmPassword),
                    age:req.body.age,
                    state:req.body.state,
                    address:req.body.address
                })
                const saveDetails = await registerUser.save();
                sendVerifyMail(req.body.email,req.body.username,saveDetails._id);
                res.redirect('/login');
            }
        }
        
    } catch (error) {
        console.log('UserName :- '+req.body.username);
        console.log(error);
    }
}

const forgotPassword = async (req,res) =>{
    await res.status(200).render('forgotPass')
}
// update Password controller

const updatePassword = async (req,res) =>{
    try {
        const inputMail = req.body.email;
        const emailExistorNot = await registerModel.findOne({email:inputMail});
        if(emailExistorNot){
            const userId = emailExistorNot._id;
            console.log('Logging in'+emailExistorNot.email);
            console.log(`userId :-${emailExistorNot._id} -------  ${userId}`);
            verificationMail(userId,emailExistorNot.email);

        }
        else{
            console.log('forget Password');
        }
    } catch (error) {
        console.log(error);
    }
}

const esignatures = async (req,res) =>{
    await res.status(200).render('esignaturesMore');
}
const enotary = async (req,res) =>{
    await res.status(200).render('enotary');
}

const framework = async (req,res) =>{
    await res.status(200).render('framework');
} 


const paperLessDSC = async (req,res) =>{
    try {
        await res.status(200).render('paperlessDSC');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const paperLessDSC__applicants = async (req,res) =>{
    try{
        if(emailValidator.validate(req.body.email)){
            const DSC = new dscModel({
                name:req.body.name,
                mobile:req.body.mobile,
                email:req.body.email,
                age:req.body.age,
                takingInfo:req.body.takingInfo
            })

            const DSC_details = await DSC.save();
            if(DSC_details){
                sendingDscMailToAdmin(req.body.name,req.body.mobile,req.body.email,req.body.age,req.body.takingInfo);
                res.status(200).redirect('/');
            }
        }else{
            console.log("Invalid credentials");
        }
    }catch(error){
        console.log(error);
    }
}


const payments = async (req,res) =>{
    try {
        await res.status(200).render('payments');
    } catch (error) {
        await res.status(400).redirect('/');
    }
}

const reset = async (req,res) =>{
    try {
        // const hashPassword = await hashPassword(req.body.password);
        console.log("Hii Bro This is reset side");
        console.log(req.body.password);

        const updatePassword = await registerModel.updateOne({_id:req.query.id},{$set:[{password:hashPassword},{confirmPassword:hashPassword}]});
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    index,
    sendMailToAdmin,
    products,
    partener,
    becomePartener,
    pricing,
    login,
    loginTheUser,
    logout,
    registration,
    registerUser,
    verifyMail,
    forgotPassword,
    esignatures,
    enotary,
    framework,
    paperLessDSC,
    paperLessDSC__applicants,
    payments,


    reset,

    updatePassword
}