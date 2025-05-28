const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const borrowController = require('../controller/borrow.controller');

// Member routes
router.post('/borrow', auth, role(['Member']), borrowController.borrowBook);
router.post('/return', auth, role(['Member']), borrowController.returnBook);

// Librarian route
router.get('/history', auth, role(['Librarian']), borrowController.viewBorrowHistory);

module.exports = router;
