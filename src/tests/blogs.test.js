const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel')


describe('Blog Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await UserModel.create({ 
            first_name: 'Madara',
            last_name: 'Uchiha',
            email: 'tobi@uchihaclan.io',
            password: 'susano'
        });

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@uchihaclan.io', 
            password: 'susano'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return blogs', async () => {
        // create a blog draft in database
        await BlogModel.create({
            "title": "How things are going",
            "description": "A true life story",
            "tags": "autobiography",
            "body": "The days are evil and sapa relentent not. Hearts are weary, hands are hung down, knees have become feeble. In all these, we still hold on to hope."
        })

        await BlogModel.create({
            "title": "Things Fall Apart",
            "description": "A new twist",
            "tags": "tragy-comedy",
            "body": "Things been never even fall apart when dem been write that book."
        })

        const response = await request(app)
        .get('/users/myblogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
    })

    // it('should return blogs with matching title', async () => {
    //     // create order in our db
    //     await BlogModel.create({
    //         state: 1,
    //         total_price: 900,
    //         created_at: moment().toDate(),
    //         items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
    //     })

    //     await OrderModel.create({
    //         state: 2,
    //         total_price: 900,
    //         created_at: moment().toDate(),
    //         items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
    //     })

    //     const response = await request(app)
    //     .get('/orders?state=2')
    //     .set('content-type', 'application/json')
    //     .set('Authorization', `Bearer ${token}`)

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('orders')
    //     expect(response.body).toHaveProperty('status', true)
    //     expect(response.body.orders.every(order => order.state === 2)).toBe(true)
    // })
});
