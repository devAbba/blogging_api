const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async function (req, res, next){
    try {

        const authHeader = req.headers.authorization
        
        const token = authHeader.substring(7)
        const authorizeToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(authorizeToken.id)
        
        if (!token){
            return res.status(401).json({error: "invalid/no token provided"})
        }
        
        req.user = user;

        next();
        
    }
    
    catch (error){
        const { TokenExpiredError } = jwt
        if (error instanceof TokenExpiredError){
           return res.status(401).json({message: "Unathorized! Access token expired"})
        }
        
        res.status(401).json({message: "Unathorized! invalid token"})
    }
}