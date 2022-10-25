const express = require('express');
const bcrypt = require('bcrypt');

const {registerUser, loginUser} = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.post('/register', registerUser)
usersRouter.post('/login', loginUser)

module.exports = usersRouter