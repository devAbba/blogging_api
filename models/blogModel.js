const {Schema, model} = require('mongoose');
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    id: ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: Date,
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    read_count: {
        type: Number
    },
    reading_time: {
        type: String
    },
    blog_post: [{
        title: String,
        description: String,
        tags: String,
        body: String
    }]
});

const Blog = model('Blogs', blogSchema);

module.exports = Blog;