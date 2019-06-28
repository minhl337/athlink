const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult}=require('express-validator')

const User = require('../../models/User')


//@route GET api/auth
//@desc test route
//access public
router.get('/',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/auth
//@desc Authenticate user and get token
//access public
router.post('/',[
    check('email',"Please enter an Email").isEmail(),
    check('password', "Please Enter a Password").exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body
    
    
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{
                msg:"Login Failed"
            }]})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({errors:[{
                msg:"Login Failed"
            }]})
        }

        //return jwt
        const payload={
            user:{
                id:user.id
            }
        }
        //expiresIn change to 3600 = one hour
        jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            res.json({token})
        });


    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


module.exports=router;