const jwt = require('jsonwebtoken');
const register = require('../model/Register');

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.JWT_SCERET_KEY);
        const user = await register.findOne({_id: verifyUser._id, 'tokens.token': token});
        if(!user)
            throw new Error()
        req.token = token;
        req.user = user;
        next();
    }catch(err){
        res.render('LoginPage');
    }
}

module.exports = auth;