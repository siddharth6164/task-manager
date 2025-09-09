const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /api/user - Get current user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// GET /api/users - Get all users (limited fields)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username firstname lastname _id');
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: `${user.firstname} ${user.lastname}`
    }));
    res.json(formattedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateProfile: async (req, res) => {
    try {
      const { profileImage, password } = req.body;
      const updates = {};

      if (profileImage) updates.profileImage = profileImage;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ msg: 'No updates provided' });
      }

      const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
      res.json({ msg: 'Profile updated', user: { id: updated._id, email: updated.email, profileImage: updated.profileImage } });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
};
