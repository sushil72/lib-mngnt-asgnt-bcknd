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
