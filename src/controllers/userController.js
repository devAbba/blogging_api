const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);

        await user.save()

        delete user.password;

        res.status(201).json({
            message: "user profile created successfully", 
            user: user
        })
        
    }
    catch (error){
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({
                status: false,
                message: "user already exists"
            })    
        } 
        else {
            res.status(500).json({
                message: "there was a problem creating user profile"
            });
        }  
    }
    
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
        const userMatch = user === null ? false : await bcrypt.compare(password, user.password)
        
        if (!(user && userMatch)) {
            return res.status(401).json({
                error: "invalid username or password"
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
    
        
        
        return res.status(200).json({message: "Login successful", token });
          
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            message: "there was a problem authenticating user"
        })
    }
}


