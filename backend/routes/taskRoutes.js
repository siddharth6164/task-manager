// routes/taskRoute.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDashboardData,
  searchAndFilterTasks,
} = require('../controllers/taskController');

// Create a task (Admin & Manager)
router.post('/', auth, authorizeRole('admin', 'manager'), createTask);

// View tasks (All roles)
router.get('/', auth, authorizeRole('admin', 'manager', 'employee'), getTasks);

// Update a task (Employee only — e.g. for submission)
router.put('/:id', auth, authorizeRole('employee'), updateTask);

// Delete a task (Admin & Manager only)
router.delete('/:id', auth, authorizeRole('admin', 'manager'), deleteTask);

// Dashboard and Search — Manager and Admin
router.get('/dashboard/overview', auth, authorizeRole('admin', 'manager'), getDashboardData);
router.get('/search/filter', auth, authorizeRole('admin', 'manager'), searchAndFilterTasks);

module.exports = router;
