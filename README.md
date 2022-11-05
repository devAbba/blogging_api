# blogging_api

This is an api for blogging applications

---

## Requirements
1. User should be able to register 
2. User should be able to login with using JWT
3. Implement token based authentication
4. User should be able to get a list of their blogs
5. Users should be able to create a blog
6. Users should be able to update and delete blog posts
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- somehostsite.com


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
| datePublished |  date  | optional  |



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
---
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

- Route: blogs/save-draft
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title": "Example title",
    "description": "A short description",
    "tags": "Science and Technology",
    "body": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
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
        "createdAt": "2022-11-04T12:22:55.013Z",
        "updatedAt": "2022-11-04T12:22:55.013Z"
    }
    
}
```
---
### Publish Blog

- Route: /blogs/publish/:blogId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "status": true,
    "message": "blog has been published"
    
}

```
---
### Get Blog

- Route: /blogs/:blogId
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
        "updatedAt": "2022-11-04T12:29:40.819Z",
        "datePublished": "2022-11-04T12:24:56.751Z"
    }
    
}
```
---

### Get Blog Posts

- Route: /blogs
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
    
}
```
---

...

## Contributor
- Victor Abbah
