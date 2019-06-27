const express = require('express');
const router = express.Router();
const {check,validationResult}=require("express-validator");
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');

const User = require('../../models/User');


//@route POST api/users
//@desc register user
//access public
router.post('/',[
    check('name', "Name is required").not().isEmpty(),
    check('email',"Valid email required").isEmail(),
    check('password', "Password must be atleast 6 characters").isLength({min:6})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password}=req.body
    
    
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{
                msg:"User already exists"
            }]})
        }
        
        const avatar=gravatar.url(email,{
            s:"200",//size
            r:"pg",//rating, we have PG not MA
            d:"mm" //default image
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });
        //encrypt password usig bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password= await bcrypt.hash(password,salt);

        await user.save();


        //return jwt
        res.send('User Registered');


    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

module.exports=router;