const {Schema, model} = require('mongoose');
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    id: ObjectId,
    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: {

    },
    author: {
        ref: 'User'
    },
    timestamp: {

    },
    state: {
        type: String,
        enum: ['unpublished', 'published'],
        default: 'unpublished'
    },
    read_count: {
        type: Number
    },
    reading_time: {
        type: String
    },
    body: {
        type: String
    }
});

const Blog = model('Blogs', blogSchema);

module.exports = Blog;