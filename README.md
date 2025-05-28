#  Library Management System (LMS) API

A secure and scalable RESTful API built with Node.js, Express, Sequelize, MySQL, and JWT.

## Tech Stack
- Node.js + Express
- MySQL + Sequelize ORM
- JWT for Authentication
- Joi for Validation

## Features

### Authentication
- User registration (admin approval)
- Secure password generation
- JWT-based login

### Role-based Access
- Admin: approve users, manage books/users
- Librarian: view borrow history
- Member: borrow & return books

###  Book Management
- Admin can create/update/delete books
- All users can view books

###  Borrow/Return
- Members can borrow and return books
- Librarians can view history

##  Setup Instructions

```bash
git clone <repo-url>
cd library-management-api
npm install
npm start or node server.js



| Method | Route                   | Role      | Description             |
| ------ | ----------------------- | --------- | ----------------------- |
| POST   | /api/auth/register      | Public    | Register new user       |
| POST   | /api/auth/login         | Public    | Login and get token     |
| GET    | /api/users              | Admin     | View all users          |
| PUT    | /api/users/\:id/approve | Admin     | Approve user            |
| DELETE | /api/users/\:id         | Admin     | Delete user             |
| POST   | /api/books              | Admin     | Add a book              |
| PUT    | /api/books/\:id         | Admin     | Update a book           |
| DELETE | /api/books/\:id         | Admin     | Delete a book           |
| GET    | /api/books              | All       | View books              |
| POST   | /api/borrow/borrow      | Member    | Borrow a book           |
| POST   | /api/borrow/return      | Member    | Return a book           |
| GET    | /api/borrow/history     | Librarian | View all borrow records |


Here's a Postman collection JSON for your Library Management System (LMS) API, including:

Auth (Register/Login)

Admin (User Approval)

Books (CRUD)

Borrow/Return

Borrow History

