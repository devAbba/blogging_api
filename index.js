const express = require('express');
const connectDB = require('./database/db');
require('dotenv').config();
const userRoute = require('./routes/users')
const blogRoute = require('./routes/blogs')
const blogController = require('./controllers/blogController');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRoute);
app.use('/blogs', blogRoute);

app.get('/', blogController.getBlogPosts);


app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

app.use(function (error, req, res, next){
    console.log(error)
    res.status(error.status || 500)
    res.json({error: error.message})
})

connectDB();
