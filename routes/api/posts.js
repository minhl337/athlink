const express = require('express');
const router = express.Router();

//GET api/posts
//test route
//access public
router.get('/',(req,res)=>{
    res.send('Post Route')
});

module.exports=router;