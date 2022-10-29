const express = require('express');
const blogController = require('../controllers/blogController')

const blogRouter = express.Router();

blogRouter.get('/:postId', blogController.getPost);

module.exports = blogRouter;