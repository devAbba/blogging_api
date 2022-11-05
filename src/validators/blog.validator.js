const Joi = require('joi');

const BlogCreateSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(5)
        .max(500)
        .optional()
        .trim(),
    tags: Joi.string()
        .min(5)
        .max(500)
        .optional()
        .trim(),
    body: Joi.string()
        .min(10)
        .trim()
        .required(),
    state: Joi.string()
        .valid('draft')
        .valid('published')
        .optional(),
    createdAt: Joi.date()
        .default(Date.now),
    updatedAt: Joi.date()
        .default(Date.now),    
    publishedAt: Joi.date()
        .default('')
    
})


const BlogUpdateSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .optional(),
    description: Joi.string()
        .min(5)
        .max(500)
        .optional()
        .trim(),
    tags: Joi.string()
        .min(5)
        .max(500)
        .optional()
        .trim(),
    body: Joi.string()
        .min(10)
        .trim()
        .optional(),
    state: Joi.string()
        .valid('published')
        .optional()
         
})

async function CreateBlogValidationMW (req, res, next){
    const blogPayLoad = req.body

    try {
        await BlogCreateSchema.validateAsync(blogPayLoad)
        next()
    }
    catch (error){
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateBlogValidationMW (req, res, next){
    const blogPayLoad = req.body

    try {
        await BlogUpdateSchema.validateAsync(blogPayLoad)
        next()
    }
    catch (error){
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = { 
    CreateBlogValidationMW, 
    UpdateBlogValidationMW 
}