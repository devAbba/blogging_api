const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController')
const authenticate = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/signup', userController.registerUser);
userRouter.post('/login', userController.loginUser);


userRouter.post('/', authenticate, blogController.createDraft);
// userRouter.post('/', blogController.publish);
// userRouter.get('/', blogController.getUserPosts);
// userRouter.patch('/', blogController.updatePost);
// userRouter.delete('/', blogController.deletePost);

module.exports = userRouter