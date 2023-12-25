const isLogin = (req,res,next) =>{
    try {
        if(req.session.user_id){}
        else{
            res.redirect('/');
        }
        next();
    } catch (error) {
        console.log("Error :- ",error);
    }
}


const isLogout = (req,res,next) =>{
    try {
        if(req.session.user_id){
            res.redirect('/payments');
        }
        else{}
        next();
    } catch (error) {
        console.log("Error :- ",error);
    }
}

module.exports = {
    isLogin,
    isLogout
}