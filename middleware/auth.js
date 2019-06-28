const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    //get token from header coming back
    const token = req.header('x-auth-token');

    //check if token

    if(!token){
        return res.status(401).json({msg:'Not authorized, no token'});
    }

    //verify token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'Token is not valid'})
    }
}