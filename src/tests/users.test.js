const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../models/userModel')
const app = require('../index');

describe('User: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/users/signup')
        .set('content-type', 'application/json')
        .send({ 
            first_name: 'Madara',
            last_name: 'Uchiha',
            email: 'tobi@uchihaclan.io',
            password: 'susano'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('first_name', 'Madara')
        expect(response.body.user).toHaveProperty('last_name', 'Uchiha')
        expect(response.body.user).toHaveProperty('email', 'tobi@uchihaclan.io')
        expect(response.body.user).not.toHaveProperty('password')        
    })


    it('should login a user', async () => {
        // create user in db
        const user = await UserModel.create({ 
            first_name: 'Madara',
            last_name: 'Uchiha',
            email: 'tobi@uchihaclan.io',
            password: 'susano'
        });

        // login user
        const response = await request(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@uchihaclan.io', 
            password: 'susano'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})