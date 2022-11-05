const express = require('express');
const blogController = require('../controllers/blogController');
const authenticate = require('../middleware/auth');
authenticateUser = require('../middleware/userAuth')
const { CreateBlogValidationMW, UpdateBlogValidationMW } = require('../validators/blog.validator')

const blogRouter = express.Router();

blogRouter.get('/', blogController.getBlogPosts)

blogRouter.get('/:blogId', blogController.getPost);

blogRouter.post('/save-draft',CreateBlogValidationMW, authenticate, blogController.createDraft);

blogRouter.patch('/publish/:blogId',UpdateBlogValidationMW, authenticate, authenticateUser, blogController.publish);

blogRouter.patch('/:blogId', UpdateBlogValidationMW, authenticate, authenticateUser, blogController.updateBlog);

blogRouter.delete('/:blogId', authenticate, authenticateUser, blogController.deleteBlog);

module.exports = blogRouter;