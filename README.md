# Node.js Authentication and Authorization API

This project is a RESTful API built with Node.js and Express that implements authentication and authorization using JSON Web Tokens (JWT). It includes role-based access control (RBAC) and encrypts user passwords with 'bcryptjs' to ensure password security.

## Features

- **User Authentication:** Secure user login using JWT.
- **Password Encryption:** Passwords are hashed usign 'bcryptjs'.
- **Role-Based Authorization:** Implemented RBAC to restrict access based on user roles (e.g., admin, user).
- **Testing:** Routes have been thoroughly tested with 'supertest' to ensure the authentication and authorization flow works correctly.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- yarn (v1 or higher)

### Instalation

1. Clone the repository:

    ```bash
    git clone https://github.com/jacksonnunes/node-restful-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install dependencies:

    - If you're using npm:
    ```bash
    npm install
    ```

    - If you're using yarn:
    ```bash
    yarn
    ```

### Environment Variables

Create a '.env' file in the root directory of the project and add the following:

```env
NODE_ENV=development
PORT=3333
TEST_PORT=4000
JWT_SECRET=your_jwt_secret
```

- `NODE_ENV`: environment (e.g., development, test, production).
- `PORT`: the port number on which the server runs.
- `TEST_PORT`: the port number on which the server runs the tests.
- `JWT_SECRET`: secret key for signing JWTs.

### Running Server

- Start the server application by running:
    - If you're using npm:
    ```bash
    npm start
    ```

    - If you're using yarn:
    ```bash
    yarn start
    ```

### Running Tests

- To run the unit tests, use the following command:
    - If you're using npm:
    ```bash
    npm test
    ```

    - If you're using yarn:
    ```bash
    yarn test
    ```

## API Endpoints

### Authentication

**Login**
- **POST** `/login`

    Logs in a user and returns a JWT.

    **Request Body:**
    ```json
    {
        "username": "exampleUser",
        "password": "examplePassword"
    }
    ```

    **Response:**
    - `200 OK` with a JWT token if credentials are valid.
    - `400 Bad Request` if credentials are invalid.

### Authorization

**Admin Access**
- **GET** `/admin`

    Access restricted to admin users only.

    **Request headers:**
    ```http
    Authorization: Bearer <JWT_token>
    ```

    **Response:**
    - `200 OK` if the user has admin role.
    - `401 Unauthorized` if the user does not have the correct role.
    - `403 Forbidden` if the token is not provided.

## Role-Based Access Control (RBAC)

The API implements role-based access control for specific routes. Users are assigned roles such as `admin` or `user`, and only users with the `admin` role can access the `/admin` route.

## Password Encryption

Passwords are hashed using `bcryptjs` with a salt factor of 10 to ensure security. When a user logs in, the entered password is hashed and compared to the stored hash in the database.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for Node.js.
- **bcryptjs:** For password hashing and encryption.
- **jsonwebtoken (JWT):** For handling user authentication.
- **Jest:** Testing framework.
- **supertest:** For testing HTTP endpoints.