const express = require('express');

const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {
    res.status(200).send("welcome to my blog posts")
})

module.exports = blogRouter