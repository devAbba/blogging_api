const Blog = require('../models/blogModel');
const User = require('../models/userModel');


exports.createDraft = async (req, res) => {
    try {
        const {
            title,
            desciption,
            tags,
            body
        } = req.body

        const reading_time = body.split(' ').length / 200 +' ' + 'mins'
        const userId = req.user._id

        const blog = new Blog({
            title,
            desciption,
            tags,
            body,
            reading_time,
            author: userId
            
        })

        const savedDraft = await blog.save();

        const userInDB = await User.findById(userId);
        userInDB.blogs = userInDB.blogs.concat(savedDraft._id);

        await userInDB.save();
        
        return res.status(201).json({status: true, blog});
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

exports.publish = async (req, res) => {
    try {
        const {blogId} = req.params

        const draft = await Blog.findById(blogId)

        draft.state = 'published';
        draft.publishedAt = Date.now()

        await draft.save()

        return res.json({status: true, blog: draft})
    }
    catch (error){
        console.log(error)
        res.json({status: false, message: "there was an error publishing blog"})
    }
}

exports.userBlogs = async (req, res) => {
    try {
        const id = req.user._id
        
        const userBlogs = await Blog.find({author: id})

        return res.json({status: true, blogs: userBlogs})
    }
    catch (error){
        console.log(error)
        return res.status(400).json({message: "could not complete request"})
    }
      
}

exports.getBlogPosts = async (req, res) => {

    try {

        const { 
            author,
            title,
            tags,
            page = 1, 
            limit = 20,
            order = 'desc',
            order_by = 'publishedAt',

        } = req.query;

        const findQuery = {}

        if (author) {

            const [firstName, lastName] = author.split(' ')
            
            const authorMatches = await User.find({first_name: firstName});
            
            const authorMatch = authorMatches.filter((author) => author["last_name"] === lastName);
            
            findQuery.author = authorMatch[0]._id
           
        }

        if (title){
            const titlePattern = new RegExp(title, 'i')
            findQuery.title = titlePattern
        }

        if (tags){
            const tagsPattern = new RegExp(tags, 'i')
            findQuery.tags = tagsPattern
        }

        const sortQuery = {};
        const sortAttributes = order_by.split(',')

        for (attribute of sortAttributes){
            if (order === 'asc' && order_by){
                sortQuery[attribute] = 1
            }

            if (order === 'desc' && order_by){
                sortQuery[attribute] = -1
            }
            
        }

        const blogs = await Blog.find({findQuery, state: 'published'})
        .populate('author', {first_name: 1, last_name: 1})
        .sort(sortQuery)
        .limit(limit * 1)
        .skip((page -1) * limit)

        const count = blogs.length;
        
        return res.status(200).json({
            status: true, 
            blogs: blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    }
    catch (error){
        console.log(error);
        res.json({status: false, message: "there was an error getting blog posts"});
    }
    
}

exports.getPost = async (req, res) => {
    try {
        
        const { blogId } = req.params

        const blog = await Blog.findById({_id: blogId}, '-createdAt').populate('author', {first_name: 1, last_name: 1})
        
        if (!blog){
            return res.status(404).json({status: false, message: "blog does not exist"});
        }
        
        blog.state === 'published' ? blog.read_count++ : false

        await blog.save()

        return res.json({status: true, blog})
  
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: "there was an error getting specified blog post"});
    }
    
}

exports.updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        
        const {title, description, tags, body} = req.body;

        const blog = await Blog.findById(blogId)

        if (!blog){
            return res.status(404).json({
                status: false,
                message: "blog does not found"
            })
        }

        if (title){
            blog.title = title
        }

        if (description){
            blog.description = description
        }

        if (tags){
            blog.tags = tags
        }
        if (body){
            blog.body = body
        }
        
        await blog.save()
        return res.json({status: true, blog})
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: "something went wrong"});
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.deleteOne({_id: blogId})

        return res.json({status: true, blog})
    }
    catch (error){
        console.log(error)
        res.status(400).json({message: "there was a problem performing operation"})
    }
}
