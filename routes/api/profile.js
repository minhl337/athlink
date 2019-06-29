const express = require('express');
const router = express.Router();

//GET api/profile
//est route
//access public
router.get('/',(req,res)=>{
    res.send('Profile Route')
});

module.exports=router;