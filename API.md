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
- 403 Forbidden: Registration is closed (admin user already exists)
- 500 Internal Server Error: Database or password hashing error

**Note:** This endpoint only allows registration of a single admin user. Once an admin user exists, further registration attempts will be rejected with a 403 Forbidden response.

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

#### Get Current User Profile
```http
GET /api/users/me
Authorization: Bearer <your_token>
```

**Response (200 OK)**
```json
{
    "id": "string",
    "username": "string"
}
```

**Error Responses:**
- 401 Unauthorized: Missing or invalid token
- 404 Not Found: User not found
- 500 Internal Server Error: Database error

#### Change Password
```http
POST /api/users/change-password
Content-Type: application/json
Authorization: Bearer <your_token>

{
    "current_password": "string",
    "new_password": "string"
}
```

**Requirements:**
- Must be authenticated (valid token)
- New password must be at least 6 characters long
- Current password must be correct

**Response (200 OK)**
```json
{
    "message": "Password changed successfully"
}
```

**Error Responses:**
- 400 Bad Request: Invalid request body or new password too short
- 401 Unauthorized: Missing token or incorrect current password
- 500 Internal Server Error: Database error

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

#### Update Post
```http
PUT /api/posts/{id}
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

#### Delete Post
```http
DELETE /api/posts/{id}
Authorization: Bearer <your_token>
```

**Parameters:**
- `id` (required): Numeric ID of the post to delete

**Response (200 OK)**
```json
{
    "message": "Post deleted successfully"
}
```

**Error Responses:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not the author of the post
- 404 Not Found: Post with the specified ID does not exist
- 500 Internal Server Error: Database error

#### Search Posts
```http
GET /api/posts/search?q={search_term}&page={page}&per_page={per_page}
```

**Query Parameters:**
- `q` (required): Search term to match against post titles and content
- `page` (optional): Page number, defaults to 1
- `per_page` (optional): Number of posts per page, defaults to 10

**Response (200 OK)**
```json
{
    "posts": [
        {
            "id": "string",
            "title": "string",
            "content": "string",
            "created_at": "timestamp",
            "updated_at": "timestamp",
            "author_id": "string"
        }
    ],
    "pagination": {
        "current_page": 1,
        "per_page": 10,
        "total_posts": 20,
        "total_pages": 2
    }
}
```

**Error Responses:**
- 400 Bad Request: Missing search query
- 500 Internal Server Error: Database error

### Request Tracking

All API requests are automatically logged with the following information:
- Request path
- HTTP method
- IP address
- Referer header (if available)
- User agent
- User ID (for authenticated requests)
- Status code
- Timestamp

This information is stored in the database and can be accessed through the analytics endpoints by administrators.

### Analytics & Logging

#### Get Request Logs

```http
GET /api/logs
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `page` (optional): Page number, defaults to 1
- `per_page` (optional): Number of logs per page, defaults to 20
- `path` (optional): Filter logs by request path
- `method` (optional): Filter logs by HTTP method
- `ip_address` (optional): Filter logs by IP address
- `user_id` (optional): Filter logs by user ID
- `from_date` (optional): Filter logs from this date (ISO 8601 format)
- `to_date` (optional): Filter logs until this date (ISO 8601 format)

**Response (200 OK)**
```json
{
    "logs": [
        {
            "id": "number",
            "path": "string",
            "method": "string",
            "ip_address": "string",
            "referer": "string | null",
            "user_id": "string | null",
            "user_agent": "string | null",
            "status_code": "number",
            "timestamp": "number"
        }
    ],
    "pagination": {
        "current_page": "number",
        "per_page": "number",
        "total_logs": "number",
        "total_pages": "number"
    }
}
```

**Error Responses:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User does not have admin privileges
- 500 Internal Server Error: Database error

**Note:** This endpoint is restricted to admin users only. Regular users will receive a 403 Forbidden response.

#### Get Visit Statistics
```http
GET /api/stats/visits
Authorization: Bearer <your_token>
```

**Response (200 OK)**
```json
{
    "total_unique_visitors": "number",
    "visits": [
        {
            "ip_address": "string",
            "visit_count": "number",
            "last_visit": "number"
        }
    ]
}
```

**Note:** This endpoint counts unique visitors to the frontend, with visits from the same IP within 30 minutes counted as a single visit.

#### Get Visit Statistics (Last 24h, Excluding IPs)
```http
GET /api/stats/visits/24h?exclude_ips=127.0.0.1,192.168.1.1
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `exclude_ips` (required): Comma-separated list of IP addresses to exclude from statistics

**Response (200 OK)**
```json
{
    "total_unique_visitors": "number",
    "total_visits": "number",
    "excluded_ips": ["string"],
    "visits": [
        {
            "ip_address": "string",
            "visit_count": "number",
            "last_visit": "number"
        }
    ]
}
```

**Error Responses:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User does not have admin privileges
- 500 Internal Server Error: Database error

**Note:** Both visit statistics endpoints are restricted to admin users only.
