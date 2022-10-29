const Blog = require('../models/blogModel');
const User = require('../models/userModel');

exports.getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.find({state: 'published'})
        res.status(200).json(blogPosts)
    }
    catch (error){
        console.log(error);
        res.status().json({message: "there was an error getting blog posts"})
    }
    
}

exports.getPost = async (req, res) => {
    try {
        const { postId } = req.params
        
        const post = await Blog.find({id: postId, state: 'published'})

        if (!post || post === null){
            return res.status(404).json({status: false, post: null})
        }
        
        return res.json({status: true, post})
    }
    catch (error){
        console.log(error);
        res.status(500).json({message: "there was an error getting specified blog post"})
    }
    
}

exports.createDraft = async (req, res) => {
    try {
        const blogPost = req.body
        const user = req.user
        const reading_time = blogPost.body.split(' ').length / 200 +' ' + 'mins'
        
        
        const draft = new Blog({
            blogPost,
            reading_time,
            timestamp: Date.now(),
            author: user
        })

        const savedDraft = await draft.save();
        const userInDB = await User.findById(user._id);
        userInDB.posts = userInDB.posts.concat(savedDraft._id);
        await userInDB.save();
        
        return res.json({status: true, draft});
    }
    catch (error){
        console.log(error)
        res.status(400).json({message: "error creating draft"})
    }
}

