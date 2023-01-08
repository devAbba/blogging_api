const Joi = require('@hapi/joi');

UserCreateSchema = Joi.object({
    first_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    last_name: Joi.string()
        .max(255)
        .required()
        .trim(),
    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(50)
        .required()
    
})

async function CreateUserValidationMW (req, res, next){
    const userPayLoad = req.body

    try {
        await UserCreateSchema.validateAsync(userPayLoad)
        next()
    }
    catch (error){
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}


module.exports = { CreateUserValidationMW }