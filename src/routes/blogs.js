const express = require('express');
const blogController = require('../controllers/blogController');
const authenticate = require('../middleware/auth');
authenticateUser = require('../middleware/userAuth')

const blogRouter = express.Router();

blogRouter.get('/', blogController.getBlogPosts)

blogRouter.get('/:blogId', blogController.getPost);

blogRouter.post('/save-draft', authenticate, blogController.createDraft);

blogRouter.patch('/publish/:blogId', authenticate, authenticateUser, blogController.publish);

blogRouter.patch('/:blogId', authenticate, authenticateUser, blogController.updateBlog);

blogRouter.delete('/:blogId', authenticate, authenticateUser, blogController.deleteBlog);

module.exports = blogRouter;