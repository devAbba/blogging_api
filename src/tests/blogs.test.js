const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel')


    
describe('Blogs Route', () => {
    let db_connect;
    let token;
    let blogId;

    beforeAll(async () => {
        db_connect = await connect()

        await UserModel.create({ 
            first_name: 'Madara',
            last_name: 'Uchiha',
            email: 'tobi@uchihaclan.io',
            password: 'susano'
        });

        const loginResponse = await request(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobi@uchihaclan.io', 
            password: 'susano'
        });

        token = loginResponse.body.token;
    })

    // afterEach(async () => {
    //     await db_connect.cleanup()
    // })

    afterAll(async () => {

        await db_connect.disconnect()
    })

    it('should create a blog', async () => {
        // create a blog draft in database
        const response = await request(app).post('/blogs/save-draft')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Example title",
            "description": "A short description",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        })
        
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.blog.state).toBe('draft')
        expect(response.body.blog.read_count).toBe(0)
        expect(response.body.blog.publishedAt).toBe(null)   
        
    })
        
    it('should publish a blog', async () => {
        // create a blog draft in database
        const response = await request(app).post('/blogs/save-draft')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Example title 2",
            "description": "A short description",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
        })


        //publish blog
        const id = response.body.blog.id
        const response2 = await request(app).patch(`/blogs/publish/${id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        

        expect(response2.status).toBe(200)
        expect(response2.body).toHaveProperty('blog')
        expect(response2.body).toHaveProperty('status', true)
        expect(response2.body.blog.state).toBe('published')
        expect(response2.body.blog.read_count).toBe(0)
        expect(response2.body.blog.publishedAt).not.toBe(null)
        
    })  

    it('should return user blogs', async () => {
        
        const response = await request(app).get('/users/myblogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect((res) => {console.log(res.body.blogs.length)})

        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body.blogs).not.toBe(null)
   })
    
    it('should return blogs', async () => {
       
        // return blogs that have been published
        const response = await request(app).get('/blogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('totalPages')
        expect(response.body).toHaveProperty('currentPage')
  
   })

   
        
})


    
    
