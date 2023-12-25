const express = require('express');
const routes = express.Router();
const userControllers = require('../controllers/userControllers');
const middle = require('../middlewares/middleware');
const session = require('express-session');

routes.use(session({
    secret:process.env.session_secret,
    resave:false,
    cookie:{secure:false},
    saveUninitialized:true
}))



routes.get('/',userControllers.index);
routes.post('/',userControllers.sendMailToAdmin);
routes.get('/products',userControllers.products);

routes.get('/partener',middle.isLogin,userControllers.partener);
routes.post('/partener',userControllers.becomePartener);


routes.get('/pricing',userControllers.pricing);
routes.get('/login',middle.isLogout,userControllers.login);

routes.post('/login',middle.isLogout,userControllers.loginTheUser);

routes.get('/register',middle.isLogout,userControllers.registration);

routes.post('/register',userControllers.registerUser);
routes.get('/verify',middle.isLogout,userControllers.verifyMail);

routes.get('/forgotPassword',middle.isLogout,userControllers.forgotPassword);
routes.post('/forgotPassword',userControllers.updatePassword);

routes.get('/logout',middle.isLogin,userControllers.logout);

routes.get('/esignatures',userControllers.esignatures);

routes.get('/enotary',userControllers.enotary);
routes.get('/simplifies',userControllers.framework);

routes.get('/payments',userControllers.payments);

routes.get('/apply-PaperLessDSC',userControllers.paperLessDSC);
routes.post('/apply-PaperLessDSC',userControllers.paperLessDSC__applicants);

routes.get('/reset',middle.isLogout,userControllers.reset);
module.exports = routes;



