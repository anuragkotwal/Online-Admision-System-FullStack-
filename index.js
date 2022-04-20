const express = require('express');
const router = express.Router();
const auth = require('./Backend/middleware/auth');
const register = require('./Backend/model/Register');
require('./Backend/DB/mongoose');
const {sendWelcomeEmail,OtpEmail,confirmationMail} = require('./Backend/Emails/SendMail');
const session = require('express-session');
const otpGenerator = require('otp-generator');
let otp = otpGenerator.generate(6,{upperCase: false, specialChars: false,alphabets: false});
const appform = require('./Backend/model/ApplicationForm'); 
const cookieParser = require('cookie-parser');
let userLogin;

router.use(express.static(__dirname + '/public')); 
router.use(cookieParser());
router.use(session({
    secret: 'admission',
    cookie: {maxAge: 1800000},
    resave: false,
    saveUninitialized: false,
}));
router.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next();
})

router.get('/',(req, res) => {
    res.render('LoginPage',);
})

//login
router.post('/login',async (req, res) => {
    try{
        userLogin = await register.findByCredentials(req.body.email,req.body.password);
        const token = await userLogin.generateAuthToken();
        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        })
        OtpEmail(userLogin.email,otp);
        res.redirect('/verification');
    }catch(err) {
        res.status(401);
        req.session.message = {
            type: 'danger',
            intro: err.message,
        }
        res.redirect('/')
    }
})

//logout
router.post('/logout',auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.redirect('/');
    }catch(e){
        res.status(500).send()
    }
})

router.get('/register',(req,res)=>{
    res.render('RegisterPage');
})

//register
router.post('/registertoDB', async (req, res) => {
    const user = new register({
        Firstname: req.body.first_name,
        Lastname: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        if(user.password.toLowerCase().includes(user.Firstname.toLowerCase()) || user.password.toLowerCase().includes(user.Lastname.toLowerCase())){
            req.session.message = {
                type: 'danger',
                intro: 'Password cannot contain firstname or lastname',
                message: 'Please try again.',
            }
            res.redirect('/register')
        }else{
            await user.save();
            sendWelcomeEmail(user.email,user.Firstname,user.Lastname);
            await user.generateAuthToken();
            res.status(201);
            req.session.message = {
                type: 'success',
                intro: 'You are now registered! ',
                message: 'Please log in.',
            }
            res.redirect('/register')
        }
    }catch(err){
        res.status(401);
        if(err){
            if(err.keyPattern){
                req.session.message = {
                    type: 'danger',
                    intro: 'Email already registered!!',
                    message: 'Please try again.',
                }
                res.redirect('/register')
            }else if(err.errors){
                console.log(err.errors);
                req.session.message = {
                type: 'danger',
                    intro: err.errors.password.properties.message,
                    message: 'Please try again.',
                }
                res.redirect('/register')
            }
        } 
    }     
}) 

router.get('/verification',auth,(req, res) => {
        res.render('Verification');   
})

//verification
router.post('/verification',auth,(req, res) => {
        if(req.body.otp === otp){
            res.redirect('/dashboard');
        }
        else {
                req.session.message = {
                type: 'danger',
                intro: 'OTP Invaild',
                message: '',
            }
            res.redirect('/verification');
        }
})

//resend OTP
router.post('/resend',auth,(req, res) => {
    otp = otpGenerator.generate(6,{upperCase: false, specialChars: false,alphabets: false});
    OtpEmail(req.user.email,otp);
    req.session.message = {
        type: 'success',
        intro: 'OTP Sended!',
        message: '',
    }
    res.redirect('/verification');
})

router.get('/admissionform',auth,async (req, res) => {
    if(req.user.isSubmitted === true){
        req.session.message = {
        type: 'danger',
        intro: 'Sorry, but you already filled the form',
        } 
        res.redirect('/dashboard')
    }else{
            res.render('AdmissionForm');
    }
})

//applicationForm
router.post('/admissionform',auth,async (req, res) => {
    const userApp = new appform({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Fathername: req.body.Fathername,
        Mothername: req.body.Mothername,
        email: req.body.email,
        mobileno: req.body.mobileno,
        Gender: req.body.Gender,
        DOB: req.body.DOB,
        AadharNo: req.body.AadharNo,
        class10per: req.body.class10per,
        class12per: req.body.class12per,
        class10marksheet: req.body.class10marksheet,
        class12marksheet: req.body.class12marksheet,
        course: req.body.course,
        branch: req.body.branch,
    });
    try{
        await userApp.save();
        if(req.user.isSubmitted === false){
            userLogin.isSubmitted = true;
            await userLogin.save();
        }
        confirmationMail(userApp.email,userApp.Firstname,userApp.Lastname);
        res.render('ConfirmationPage');
    }catch(err){
        res.status(401);
        if(err){
            if(err.keyPattern.email){
                req.session.message = {
                    type: 'danger',
                    intro: 'Email is already exsits.',
                    message: ' Please try again.',
                }
                res.redirect('/admissionform')
            }else if(err.keyPattern.mobileno){
                req.session.message = {
                    type: 'danger',
                    intro: 'Phone number is already exsits.',
                    message: ' Please try again.',
                }
                res.redirect('/admissionform')
            }else if(err.keyPattern.AadharNo){
                req.session.message = {
                    type: 'danger',
                    intro: 'Aadhar number must be unique.',
                    message: ' Please try again.',
                }
                res.redirect('/admissionform')
            }
        }
    }
})

router.get('/dashboard',auth,async (req, res) => {
            res.render('Dashboard');
})


router.get('/confirm',auth,async (req, res) => {
    res.render('ConfirmationPage');
})

module.exports = router;