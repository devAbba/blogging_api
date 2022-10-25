const express = require('express');
const connectDB = require('./database/db');
require('dotenv').config();
const usersRoute = require('./routes/users')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', usersRoute);

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

app.use(function (error, req, res, next){
    console.log(error)
    res.status(error.status || 500)
    res.json({error: error.message})
})

connectDB();
