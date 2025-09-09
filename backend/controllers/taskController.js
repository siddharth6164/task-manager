const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { title, description, dueDate, priority, status, assignedTo, project } = req.body;

    // Validate required fields
    if (!title || !assignedTo || !project) {
      return res.status(400).json({ msg: 'Title, Assigned To, and Project are required' });
    }

const task = new Task({
  title,
  description,
  dueDate,
  priority,
  status: status || 'not-started',
  assignedTo,
  project,
  createdBy: req.user.id,
});


    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    }).populate('assignedTo', 'name email').populate('createdBy', 'name email');

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Optional: Allow only creator or assignee to edit
    if (task.createdBy.toString() !== req.user.id && task.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get dashboard tasks
exports.getDashboardData = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const assignedTasks = await Task.find({ assignedTo: userId }).sort({ dueDate: 1 });
      const createdTasks = await Task.find({ createdBy: userId }).sort({ createdAt: -1 });
      const overdueTasks = await Task.find({
        assignedTo: userId,
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' },
      });
  
      res.json({
        assignedTasks,
        createdTasks,
        overdueTasks,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  // Filter and search tasks
exports.searchAndFilterTasks = async (req, res) => {
    try {
      const { status, priority, dueBefore, search } = req.query;
      const userId = req.user.id;
  
      const filter = {
        $or: [
          { createdBy: userId },
          { assignedTo: userId }
        ]
      };
  
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (dueBefore) filter.dueDate = { $lt: new Date(dueBefore) };
  
      if (search) {
        filter.$or.push(
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') }
        );
      }
  
      const tasks = await Task.find(filter);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  