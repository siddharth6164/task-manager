// routes/teamRoutes.js
const express = require('express');
const {
  createTeam,
  getAllTeams,
  deleteTeam,
  updateTeam,
} = require('../controllers/teamController');

const auth = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();

// Create team (Admin, Manager, Employee)
router.post('/', auth, authorizeRole('admin', 'manager', 'employee'), createTeam);

// Get teams (All roles)
router.get('/', auth, authorizeRole('admin', 'manager', 'employee'), getAllTeams);

// Update team (Admin & Manager)
router.put('/:id', auth, authorizeRole('admin', 'manager'), updateTeam);
router.patch('/:id', auth, authorizeRole('admin', 'manager'), updateTeam);

// Delete team (Admin only)
router.delete('/:id', auth, authorizeRole('admin'), deleteTeam);

module.exports = router;
