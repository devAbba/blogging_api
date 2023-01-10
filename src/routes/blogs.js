const express = require('express');
const blogController = require('../controllers/blogController');
const authenticate = require('../middleware/auth');
const authenticateUser = require('../middleware/userAuth');
const { CreateBlogValidationMW, UpdateBlogValidationMW } = require('../validators/blog.validator');

const blogRouter = express.Router();

blogRouter.get('/', blogController.getBlogPosts)

blogRouter.get('/:blogId', blogController.getPost);

blogRouter.get('/a/userblogs', authenticate, blogController.userBlogs);

blogRouter.post('/save-draft',CreateBlogValidationMW, authenticate, blogController.createDraft);

blogRouter.patch('/p/:blogId',UpdateBlogValidationMW, authenticate, authenticateUser, blogController.publish);

blogRouter.patch('/u/:blogId', UpdateBlogValidationMW, authenticate, authenticateUser, blogController.updateBlog);

blogRouter.delete('/d/:blogId', authenticate, authenticateUser, blogController.deleteBlog);

module.exports = blogRouter;