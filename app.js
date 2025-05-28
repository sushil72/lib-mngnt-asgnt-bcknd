const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

module.exports = app;


const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);


const bookRoutes = require('./routes/book.routes');
app.use('/api/books', bookRoutes);


const borrowRoutes = require('./routes/borrow.routes');
app.use('/api/borrow', borrowRoutes);


const errorHandler = require('./middlewares/error.middleware');
app.use(errorHandler); // After all routes
