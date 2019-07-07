const express = require('express');
const request = require('request');

const router = express.Router();
const config=require('config');

const auth = require('../../middleware/auth');
const {check, validationResult}=require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//GET api/profile/me
//est route
//private
router.get('/me',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',[
            'name',
            'avatar'
        ]);
        if(!profile){
            return res.status(400).json({msg:"User profile not found"});
        }
        res.json(profile)

    }catch(err){
        console.err(err.message);
        res.status(500).send("Server Error")
    }
});

//post to api/profile
//create or update profile
//private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills are required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    //build profile object
    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(profileFields.skills){
        profileFields.skills = profileFields.skills.split(',').map(skill=>skill.trim());
    }

    //social object
    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;

    try{
        let profile = await Profile.findOne({user:req.user.id});

        if(profile){
            //update
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:
            profileFields},
            {new:true});

            return res.json(profile);
        }
        //create if not found
        profile=new Profile(profileFields);
        await profile.save();
        res.json(profile);


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }


})

//get api/profile
//gets all profiles
//public
router.get('/',async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',[
            'name','avatar'
        ]);
        res.json(profiles);
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//get api/profile/user/:user_id
//get profile by user ID
//public
router.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',[
            'name','avatar'
        ]);

        if(!profile)return res.status(400).json({msg:"Profile not found"});

        res.json(profile);
        
    }catch(err){
        console.error(err.message);
        if(err.kind==="ObjectId"){
            return res.status(400).json({msg:"Profile not found"});
        }
        res.status(500).send('Server Error');
    }
});

//delete api/profile
//delete proifle, user&post
//private
router.delete('/',auth,async(req,res)=>{
    try{
        //remove profile
        //todo-remove user's posts
        await Profile.findOneAndRemove({user:req.user.id});
        //remove user
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'User deleted'});
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//put api/profile/experience
//add profile experience
//private
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body;

    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try{
        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//delete api/profile/experience/:exp_id
//delete experience from profile
//private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        
        //get remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//------------------------------EDUCATION-----------------

//put api/profile/education
//add profile education
//private
router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=req.body;

    const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try{
        const profile=await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//delete api/profile/education/:edu_id
//delete education from profile
//private
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        
        //get remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get api/profile/github/:username
//get user repos from github
//public

router.get('/github/:username',(req,res)=>{
    try{
        const options={
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: "GET",
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error)console.error(error);

            if(response.statusCode!==200){
                res.status(404).json({msg:'Not github profile found'})
            }
            res.json(JSON.parse(body));
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports=router;