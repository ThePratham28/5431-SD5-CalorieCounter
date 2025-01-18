# Calorie Counter API Documentation

## User Routes

### Register a new user
**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### Login user
**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "token": "string"
}
```

### Logout user
**Endpoint:** `GET /api/users/logout`

**Response:**
```json
{
  "message": "User logged out successfully"
}
```

### Get user profile
**Endpoint:** `GET /api/users/profile`

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "savedDishes": ["dishId1", "dishId2"]
}
```

### Save a dish for the user
**Endpoint:** `POST /api/users/save-dish/:dishId`

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "message": "Dish saved successfully",
  "savedDishes": ["dishId1", "dishId2", "dishId3"]
}
```

### Unsave a dish for the user
**Endpoint:** `DELETE /api/users/save-dish/:dishId`

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "message": "Dish unsaved successfully",
  "savedDishes": ["dishId1", "dishId2"]
}
```

## Dish Routes

### Get all dishes
**Endpoint:** `GET /api/dishes/`

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "calories": "number",
    "ingredients": ["ingredient1", "ingredient2"]
  },
  ...
]
```

### Get a specific dish by ID
**Endpoint:** `GET /api/dishes/:id`

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "calories": "number",
  "ingredients": ["ingredient1", "ingredient2"]
}
```

### Create a new dish
**Endpoint:** `POST /api/dishes/`

**Request Body:**
```json
{
  "name": "string",
  "calories": "number",
  "ingredients": ["ingredient1", "ingredient2"]
}
```

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "message": "Dish created successfully",
  "dish": {
    "id": "string",
    "name": "string",
    "calories": "number",
    "ingredients": ["ingredient1", "ingredient2"]
  }
}
```

### Update a specific dish by ID
**Endpoint:** `PUT /api/dishes/:id`

**Request Body:**
```json
{
  "name": "string",
  "calories": "number",
  "ingredients": ["ingredient1", "ingredient2"]
}
```

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "message": "Dish updated successfully",
  "dish": {
    "id": "string",
    "name": "string",
    "calories": "number",
    "ingredients": ["ingredient1", "ingredient2"]
  }
}
```

### Delete a specific dish by ID
**Endpoint:** `DELETE /api/dishes/:id`

**Request Headers:**
```json
{
  "Cookie": "jwt=<token>"
}
```

**Response:**
```json
{
  "message": "Dish deleted successfully"
}
```
