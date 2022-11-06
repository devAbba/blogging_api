const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel')


    
describe('Blogs Route', () => {
    let db_connect;
    let token;
    let draftId;
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
        await db_connect.cleanup()
        await db_connect.disconnect()
    })

    it('should create a blog', async () => {
        // create a blog draft in database
        const response = await request(app).post('/blog/save-draft')
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
        expect(response.body.blog.publishedAt).toBeNull()   
        
        draftId = response.body.blog.id
    })
        
    it('should publish a blog', async () => {
        // create a blog draft in database
        const response = await request(app).post('/blog/save-draft')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Different Example title",
            "description": "A short description",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            "state": "published"
        })

        blogId = response.body.blog.id
        
        //publish blog
        const response2 = await request(app).patch(`/blog/p/${blogId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        

        expect(response2.status).toBe(200)
        expect(response2.body).toHaveProperty('blog')
        expect(response2.body).toHaveProperty('status', true)
        expect(response2.body.blog.state).toBe('published')
        expect(response2.body.blog.read_count).toBe(0)
        expect(response2.body.blog.publishedAt).not.toBeNull()
        
    }) 
    

    it('should return user blogs', async () => {
        
        const response = await request(app).get('/blog/a/userblogs')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body.blogs).not.toBeNull()
        expect(response.body.blogs.length).toBeGreaterThanOrEqual(2) 
   })

   it('should query by state', async () => {
        
        const response = await request(app).get('/blog/a/userblogs?state=draft')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body.blogs).not.toBeNull()
        expect(response.body.blogs.length).toBe(1)
        expect(response.body.blogs[0]['state']).toBe('draft')
    })
    
    it('should return blogs', async () => {

        // return blogs that have been published
        const response = await request(app).get('/blog')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('totalPages')
        expect(response.body).toHaveProperty('currentPage')
        
  
   })

   it('should return a blog', async () => {
       
        // return blogs that have been published
        const response = await request(app).get(`/blog/${blogId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.blog.read_count).toBe(1)

    })

   it('should update blog', async () => {

        const response = await request(app).patch(`/blog/u/${blogId}`)
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "Example title 2",
                "description": "A short description",
                "tags": "Science and Technology",
                "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum I just made a change"
            })

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('blog')
            expect(response.body).toHaveProperty('status', true)
        
   })

   it('should delete blog', async () => {
        const response = await request(app).delete(`/blog/d/${draftId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('blog')
        expect(response.body.blog).toHaveProperty('acknowledged')
        expect(response.body.blog).toHaveProperty('deletedCount')
        expect(response.body.blog.deletedCount).toBe(1)

   })
     
})


    
    
