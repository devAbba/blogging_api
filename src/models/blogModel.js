const {Schema, model} = require('mongoose');
const moment = require('moment');

const ObjectId = Schema.ObjectId;

const blogSchema = new Schema(
    {
        id: ObjectId,
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        state: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft'
        },
        read_count: {
            type: Number,
            default: 0
        },
        reading_time: {
            type: String
        },
        tags: [String],
        body: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        publishedAt: {
            type: Date,
            default: ''
        }   
    }
    
);

blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    return next();
});


blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        // delete returnedObject.id
        delete returnedObject.__v
        
      }
})

const Blog = model('Blog', blogSchema);

module.exports = Blog;