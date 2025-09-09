// routes/userRoute.js
const express = require('express');
const router = express.Router();

const { getUser, getAllUsers, updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// Any authenticated user
router.get('/user', verifyToken, getUser);

// Admin, Manager & Employee can view all users (limited fields)
router.get('/users', verifyToken, authorizeRole('admin', 'manager', 'employee'), getAllUsers);

module.exports = router;
// Update profile (any authenticated user)
router.put('/profile', verifyToken, updateProfile);
