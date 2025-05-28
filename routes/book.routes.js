const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const bookController = require('../controller/book.controller');

// Admin-only: create/update/delete
router.post('/', auth, role(['Admin']), bookController.createBook);
router.put('/:id', auth, role(['Admin']), bookController.updateBook);
router.delete('/:id', auth, role(['Admin']), bookController.deleteBook);

// Public for logged-in users
router.get('/', auth, bookController.getAllBooks);

module.exports = router;
