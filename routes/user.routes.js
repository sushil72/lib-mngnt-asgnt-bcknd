const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const userController = require('../controller/user.controller');

// 🔐 Test/Demo Routes (optional)
router.get('/admin-only', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

router.get('/staff', authMiddleware, roleMiddleware(['Admin', 'Librarian']), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

// 👮 Protected Admin Routes
router.use(authMiddleware, roleMiddleware(['Admin']));

router.get('/', userController.getAllUsers);               // View all users
router.put('/:id/approve', userController.approveUser);    // Approve a user
router.delete('/:id', userController.deleteUser);          // Delete a user

module.exports = router;
