const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerUser (req, res){
    try {
        const userData = req.body;
        const user = await User.create(userData);
        res.status(201);
        res.send({
            message: "user profile created successfully", 
            user: user.first_name + " " + user.last_name
        });
    }
    catch (error){
        console.log(error)
        res.status(400)
        res.send("there was a problem creating user profile")
    }
    
}

async function loginUser (req, res){
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
        const userMatch = user === null ? false : await user.isValidPassword(password)

        if (!(user && userMatch)) {
            return res.status(401).json({
            error: 'invalid username or password'
            })
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.SECRET,
            {
                expiresIn: 60 * 60
            }
        )
    
        res.status(200).send({token, user: user.first_name + " " + user.last_name})
          
    }
    catch (error){
        console.log(error)
    }
}

module.exports = {registerUser, loginUser}