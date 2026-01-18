QistonPe Backend API

This project is a backend application developed for the QistonPe Internship Program.
The application is built using NestJS and PostgreSQL and implements vendor management,
purchase orders, payments, analytics, authentication, and API documentation.

--------------------------------------------------

FEATURES

- Vendor Management (Create, View, Update)
- Purchase Order Management
- Payment Management
- Vendor Outstanding Report
- Payment Aging Report
- JWT Authentication
- Swagger API Documentation

--------------------------------------------------

TECH STACK

- Node.js
- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- Swagger (OpenAPI)

--------------------------------------------------

PROJECT SETUP STEPS

STEP 1: CLONE THE REPOSITORY

git clone https://github.com/kumarhadole/qistonpe-backend.git

cd qistonpe-backend

--------------------------------------------------

STEP 2: INSTALL DEPENDENCIES

npm install

--------------------------------------------------

STEP 3: DATABASE SETUP

Create a PostgreSQL database named:

qistonpe

Open the file:

src/app.module.ts

Update your database details:

username: postgres
password: Kunal@2005
database: qistonpe

Make sure PostgreSQL is running on port 5432.

--------------------------------------------------

STEP 4: RUN THE PROJECT

npm run start:dev

The backend server will start on:

http://localhost:3000

--------------------------------------------------

SWAGGER API DOCUMENTATION

Swagger UI is available at:

http://localhost:3000/api

All APIs can be tested directly from Swagger.

--------------------------------------------------

API ENDPOINTS

AUTHENTICATION
- POST /auth/register
- POST /auth/login

VENDORS
- POST /vendors
- GET /vendors
- GET /vendors/:id
- PUT /vendors/:id

PURCHASE ORDERS
- POST /purchase-orders
- GET /purchase-orders
- GET /purchase-orders/:id

PAYMENTS
- POST /payments

ANALYTICS
- GET /analytics/vendor-outstanding
- GET /analytics/payment-aging

--------------------------------------------------

TESTING

All APIs were tested using Postman and Swagger UI.

--------------------------------------------------

NOTES

- JWT authentication is implemented for secured endpoints.
- Clean modular architecture is followed using NestJS.
- Swagger documentation is provided for easy testing and review.

--------------------------------------------------

AUTHOR

Project developed as part of the QistonPe Backend Internship Assignment.
