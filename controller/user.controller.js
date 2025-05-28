const { User } = require('../models');

// ✅ Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'role', 'isApproved']
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

// ✅ Approve a user (Admin only)
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: 'User approved', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve user', details: err.message });
  }
};

// ✅ Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};
