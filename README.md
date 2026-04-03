# Finance Data Processing and Access Control Backend

## Description

This is a backend system for managing financial records with role-based access control. It supports CRUD operations, filtering, and summary analytics for a dashboard.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Architecture

The project follows a clean architecture with separation of concerns:
- **controllers**: Handle HTTP requests and responses
- **services**: Contain business logic
- **models**: Define data schemas and database interactions
- **routes**: Define API endpoints and route handlers
- **middleware**: Implement authentication, authorization, and other cross-cutting concerns

## Features

- User management with roles (admin, analyst, viewer)
- Role-based access control using middleware
- Financial record CRUD operations (create, read, update, delete)
- Filtering records by type and category
- Dashboard summary API including:
  - Total income
  - Total expense
  - Net balance
  - Category-wise breakdown
  - Recent transactions

## Roles and Permissions
-------------------------------------------
| Role    | Permissions                   |
|-------- |-------------------------------|
| Admin   | Full CRUD access              |
| Analyst | View records + access summary |
| Viewer  | View records only             |
-------------------------------------------
## Authentication

This project uses mock authentication for simplicity. Users are identified via request headers:
- `user-id`: MongoDB user ID

The backend fetches the user from the database and applies role-based access control based on the user's assigned role.

## API Endpoints

###  User Management

- **POST /users**
  - Create a new user
  - No authentication required

---

###  Financial Records

- **POST /records**
  - Create a new financial record
  - Admin only

- **GET /records**
  - Get all financial records
  - Accessible by Admin, Analyst, Viewer

---

###  Record Operations

- **PATCH /records/:id**
  - Update a record
  - Admin only

- **DELETE /records/:id**
  - Delete a record
  - Admin only

---

### Filtering Records (Analyst only)

Filtering is restricted to users with the "analyst" role. Role validation is handled via middleware using user data stored in the database.

- **GET /records/category**
  - Filter records by category

- **GET /records/type**
  - Filter records by type (income/expense)

- **GET /records/type-category**
  - Filter records by both type and category

---

### Dashboard Summary

- **GET /summary**
  - Get dashboard insights including:
    - Total income
    - Total expense
    - Net balance
    - Category-wise breakdown
    - Recent transactions
  -  Analyst only

Example request body for creating a record:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "notes": "monthly salary"
}
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd finance-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/finance-db
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on the specified port (default: 3000).

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (optional, defaults to 3000)

## Assumptions

- No real authentication system implemented
- Mock authentication is used for simplicity
- Focus is on backend logic and architecture

## Testing

A Postman collection is included in the repository for testing the APIs. Import the collection file and use it to interact with the endpoints.
## 📬 Postman Collection

You can test all API endpoints using the provided Postman collection.

### Download Postman Collection
[Click here to download](https://raw.githubusercontent.com/IrfanAhmed8/Finance-Data-Processing-and-Access-Control-Backend/main/postman/Finance-Backend.postman_collection.json)
Steps to use:
1. Open Postman
2. Click "Import"
3. Upload the JSON file
4. Start testing APIs