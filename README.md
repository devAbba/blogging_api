# blogging_api

An AltSchool Africa Examination Project

---

## Requirements
1. User should be able to register 
2. User should be able to login
3. User should be authenticated using JWT
4. Users should be able to create a blog
    - when a blog is created, it is in draft state
5. The owner of a blog should be able to update the state of the blog to published
6. The owner of a blog should be able to edit the blog in draft or published state
7. The owner of the blog should be able to delete the blog in draft or published state
8. User should be able to get a list of their blogs
    - blogs should be paginated
    - filterable by state
9. Logged in and not logged in users should be able to get a published blog
10. List of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated
    - default of 20 per page
    - it should be searchable by author, title and tags
    - it should be orderable by read_count, reading_time and timestamp
11. Blogs should be orderable by read_count, reading_time and timestamp
10. Test all endpoints
---

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---

## Base URL
- https://nightgown-fly.cyclic.app


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name | string  |  required  |
|  last_name  | string  |  required  |
|  email     | string  |  required  |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required  |
|  title |  string |  required  |
|  description | string  |  optional  |
|  author  |  string |  required  |
|  state     | array  |  required, default: 'draft', enum: ['draft', 'published'] |
|  read_count |   string |  default: 0  |
|  reading_time |  number |  required |
|  tags |  string |  optional |
|  body |  string |  required  |
| createdAt |  date  | optional  |
| updatedAt |  date  | optional  |
| publishedAt |  date  | optional  |



## APIs
---

### Signup User

- Route: /users/signup
- Method: POST
- Body: 
```
{
  "first_name": "John",
  "last_name": "Mark",
  "email": "johnmark@example.com",
  "password": "Pass123",
}
```

- Responses

Success
```
{
    message: 'user profile created successfully',
    user: {
             "first_name": "John",
  	         "last_name": "Mark",
  	         "email": "johnmark@example.com"
    }
}
```

### Login User

- Route: /users/login
- Method: POST
- Body: 
```
{
  "email": "johnmark@example.com",
  "password": "Pass123",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'jlsghgzledhfcdfhjh'
}
```

---
### Create Blog as draft

- Route: blog/save-draft
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title": "Example title",
    "description": "A short description",
    "tags": "Science and Technology",
    "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    "createdAt": "[date object]",
    "updatedAt": "[date object]",
    "publishedAt": null,
    "id": "[objectId]"
}
```

- Responses

Success
```
{
    status: true,
    blog: {
        "title": "Example title",
        "state": "draft",
        "read_count": 0,
        "reading_time": "0.04 mins",
        "tags": "Science and Technology",
        "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
        "createdAt": "[date object]",
        "updatedAt": "[date object]"
    }
    
}
```
---
### Publish Blog

- Route: /blog/p/:blogId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "status": true,
    "blog": {
        "title": "Example title",
        "author": "userId",
        "state": "published",
        "read_count": 0,
        "reading_time": "0.04 mins",
        "tags": "Science and Technology",
        "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        "createdAt": "[date object]",
        "updatedAt": "[date object]",
        "publishedAt": "[date object]"
    
}

```
---
### Get Blog

- Route: /blog/:blogId
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "status": true,
    "blog": {
        "title": "Example title",
        "author": "John Mark",
        "state": "published",
        "read_count": 1,
        "reading_time": "0.14 mins",
        "tags": "Science and Technology",
        "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
        "updatedAt": "[date object]",
        "datePublished": "[date object]"
    }
    
}
```
---

### Get Blog Posts

- Route: /blog?author=john
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - author
    - title
    - tags
    - page (default: 1)
    - limit (default: 20)
    - order (options: asc | desc, default: desc)
    - order_by (default: 'publishedAt')
    
    
- Responses

Success
```
{
   "status": true,
    "blogs": [
        {
            "publishedAt": null,
            "title": "Example Title",
            "author": {
                "first_name": "John",
                "last_name": "Mark"
            },
            "state": "published",
            "read_count": 1,
            "reading_time": "0.14 mins",
            "tags": "science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            "createdAt": "[date object]",
            "updatedAt": "[date object]",
            "datePublished": "[date object]",
            "id": "[objectId]"
        
        },
        {
            "title": "Example title 2",
            "author": {
                "first_name": "John",
                "last_name": "Mark"
            },
            "state": "published",
            "read_count": 1,
            "reading_time": "0.08 mins",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            "createdAt": "[date object]",
            "updatedAt": "[date object]",
            "publishedAt": "[date object]",
            "id": "[objectId]"
            
        }
    ],
    "totalPages": 1,
    "currentPage": 1 
}
```
---
### Update Blog

- Route: /blog/u/:blogId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Example title",
  "desciption": "A short description",
  "tags": "science and Technology",
  "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum i just made a change",
}
```
- Responses

Success
```
{
    "status": true,
    "blog": {
        "title": "Example title",
        "author": "userId",
        "state": "published",
        "read_count": 0,
        "reading_time": "0.08 mins",
        "tags": "Science and Technology",
        "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum i just made a change",
        "createdAt": "2022-11-05T15:53:43.704Z",
        "updatedAt": "2022-11-05T15:56:44.874Z",
        "publishedAt": "2022-11-05T15:56:44.874Z",
        "id": "objectId"
    
}
```
---
### Delete Blog

- Route: /blog/d/:blogId
- Method: DELETE
- Header
    - Authorization: Bearer {token}

- Responses

Success
```
{
    "status": true,
    "blog": {
        "acknowledged": true,
        "deletedCount": 1
    }
    
}
```

---

## User Blogs

- Route: /blog/a/userblogs
- Method: GET
- Header
    - Authorization: Bearer {token}

- Responses

Success
```
{
    "status": true,
    "blogs": [
        {
            "title": "Example title 3",
            "author": "objectId",
            "state": "draft",
            "read_count": 0,
            "reading_time": "0.04 mins",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            "createdAt": "2022-11-05T16:48:44.260Z",
            "updatedAt": "2022-11-05T16:55:03.643Z",
            "publishedAt": null,
            "id": "objectId"
        },
        {
            "title": "Example title 4",
            "author": "objectId",
            "state": "published",
            "read_count": 0,
            "reading_time": "0.055 mins",
            "tags": "Science and Technology",
            "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum la la land",
            "createdAt": "2022-11-06T06:39:59.191Z",
            "updatedAt": "2022-11-06T06:42:22.402Z",
            "publishedAt": "2022-11-06T06:42:22.401Z",
            "id": "objectId"
        }
    ],
    "totalPages": 1,
    "currentPage": 1
}
```
...

## Contributor
- Victor Abbah
