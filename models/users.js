const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = Schema.ObjectId
const userSchema = new Schema({
    id: ObjectId,
    first_name: {
        type: String,
        
    },
    last_name: {
        type: String
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
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

userSchema.pre('save', async function (next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const User = model("Users", userSchema);

module.exports = User;