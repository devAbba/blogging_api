const Blog = require('../models/blogModel');

module.exports = async function (req, res, next){
    try {
        const { blogId } = req.params

        const blog = await Blog.findById(blogId)

        if (!blog){
            return res.status(404).json({
                status: false,
                message: "blog not found"
            })
        }
        
        const stringIds = [blog.author, req.user._id].map(item => item.toHexString())


        if (stringIds[0] !== stringIds[1]){
            return res.status(422).json({message: "invalid operation"})
        }
        else if (stringIds[0] === stringIds[1]){
            next()
        }
        
        
    }
    catch (error){
        next(error)
    }
}