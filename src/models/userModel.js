const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = Schema.ObjectId

const userSchema = new Schema({
    id: ObjectId,
    first_name: {
        type: String,
        required: true   
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

userSchema.pre('save', async function (next){
    const user = this;

    if (!user.isModified('password')){
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next();
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.id
        delete returnedObject.__v
        delete returnedObject.password
      }
})

const User = model("Users", userSchema);

module.exports = User;