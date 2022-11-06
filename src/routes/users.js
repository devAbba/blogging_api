const express = require('express');
const { CreateUserValidationMW } = require('../validators/user.validator');
const userController = require('../controllers/userController');


const userRouter = express.Router();

userRouter.post('/signup', CreateUserValidationMW, userController.registerUser);

userRouter.post('/login', userController.loginUser);







module.exports = userRouter