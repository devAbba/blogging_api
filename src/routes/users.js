const express = require('express');
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const authenticate = require('../middleware/auth');
const { CreateUserValidationMW } = require('../validators/user.validator')


const userRouter = express.Router();

userRouter.post('/signup', CreateUserValidationMW, userController.registerUser);

userRouter.post('/login', userController.loginUser);

userRouter.get('/myblogs', authenticate, blogController.userBlogs);





module.exports = userRouter