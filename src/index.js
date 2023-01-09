const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const blogRoute = require('./routes/blogs');
const limterConfig = require('./config/limiter');
const logger = require('./logging/logger');
const httpLogger = require('./logging/httpLogger');
require('dotenv').config();


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const limiter = rateLimit(limterConfig)

app.use(limiter);

app.use(helmet());


app.use('/users', userRoute);
app.use('/blog', blogRoute);

app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.use('*', (req, res) => {
    return res.status(404).json({message: "route not found"})
})



app.use((error, req, res, next) => {
    console.log(error)
    logger.error(error)
    const errorStatus = error.status || 500
    res.status(errorStatus).send(error.message)
    next()
})



module.exports = app;
