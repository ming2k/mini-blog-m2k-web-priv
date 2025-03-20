# MiniBlog API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
The API uses Bearer token authentication for protected endpoints. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### User Management

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
```
**Response (201 Created)**
```json
{
    "token": "string",
    "user": {
        "id": "string",
        "username": "string"
    }
}
```
**Error Responses:**
- 400 Bad Request: Username already exists
- 500 Internal Server Error: Database or password hashing error

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
```
**Response (200 OK)**
```json
{
    "token": "string",
    "user": {
        "id": "string",
        "username": "string"
    }
}
```
**Error Responses:**
- 401 Unauthorized: Invalid username or password
- 500 Internal Server Error: Database or token generation error

### Blog Posts

#### Get All Posts
```http
GET /api/posts?page={page}&per_page={per_page}
```
**Query Parameters:**
- `page` (optional): Page number, defaults to 1
- `per_page` (optional): Number of posts per page, defaults to 5

**Response (200 OK)**
```json
{
    "posts": [
        {
            "id": "string",
            "title": "string",
            "content_preview": "First 100 characters of content...",
            "created_at": "timestamp",
            "updated_at": "timestamp",
            "author_id": "string"
        }
    ],
    "pagination": {
        "current_page": 1,
        "per_page": 5,
        "total_posts": 10,
        "total_pages": 2
    }
}
```

#### Get Single Post

```http
GET /api/posts/{id}
```

**Parameters:**
- `id` (required): Numeric ID of the post

**Response (200 OK)**
```json
{
    "id": 1,
    "title": "string",
    "content": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "author_id": "string"
}
```

**Error Responses:**
- 404 Not Found: Post with the specified ID does not exist
- 500 Internal Server Error: Database error


#### Create Post
```http
POST /api/posts
Content-Type: application/json
Authorization: Bearer <your_token>

{
    "title": "string",
    "content": "string"
}
```

**Parameters:**
- `title` (required): Title of the post
- `content` (required): Content of the post

**Response (201 Created)**
```json
{
    "id": "string",
    "title": "string",
    "content": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "author_id": "string"
}
```

**Error Responses:**
- 400 Bad Request: Invalid request body
- 401 Unauthorized: Missing or invalid token
- 500 Internal Server Error: Database error

#### Update Entire Post

```http
POST /api/posts/{id}
Content-Type: application/json
Authorization: Bearer <your_token>

{
    "title": "string",  // Optional - omit to keep the current title
    "content": "string" // Optional - omit to keep the current content
}
```

**Parameters:**
- `id` (required): Numeric ID of the post to update

**Request Body:**
- Only include fields you want to update. Omitted fields will remain unchanged.
- At least one of `title` or `content` must be provided.

**Response (200 OK)**
```json
{
    "id": 1,
    "title": "string",
    "content": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "author_id": "string"
}
```

**Error Responses:**
- 400 Bad Request: Invalid request body
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not the author of the post
- 404 Not Found: Post with the specified ID does not exist
- 500 Internal Server Error: Database error
