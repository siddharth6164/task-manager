require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
const allowedOrigins = [
  'https://task-manager-beta-azure.vercel.app',
  'https://taskmanagerbysid.vercel.app'
];

app.use(require('cors')({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);           // /api/users/user, /api/users/users
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);

// ✅ Root Check
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// ✅ Server Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));
