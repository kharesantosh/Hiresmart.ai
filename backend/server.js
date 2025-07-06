// // server/server.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';
// // backend/server.js (add this at the top after other imports)
// // Ensure models are imported before routes
// import './models/User.js';
// import './models/Interview.js';

// // Route imports
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import interviewRoutes from './routes/interview.routes.js';
// import aiRoutes from './routes/ai.routes.js';

// // Load env vars
// dotenv.config();

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use('/api', limiter);

// // Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/interviews', interviewRoutes);
// app.use('/api/ai', aiRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     error: err.message || 'Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// backend/server.js

// ------------------------------------------------v2 fully working-----------------------------------------------------------------------------
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hiresmart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' 
  });
});

// Routes (only load if you want to test without DB)
try {
  const authRoutes = await import('./routes/auth.routes.js');
  const userRoutes = await import('./routes/user.routes.js');
  const interviewRoutes = await import('./routes/interview.routes.js');
  const aiRoutes = await import('./routes/ai.routes.js');

  app.use('/api/auth', authRoutes.default);
  app.use('/api/users', userRoutes.default);
  app.use('/api/interviews', interviewRoutes.default);
  app.use('/api/ai', aiRoutes.default);
  // Add this line with other route imports
app.use('/api/interviews', require('./routes/interviews'));
} catch (error) {
  console.error('Routes loading error:', error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

// -----------------------------------------------------v3vvvvv--------------------------------------------------------------------

// import express from 'express';
// import mongoose from 'mongoose';
// import cors  from'cors';
// import path from 'path';
// import fs from 'fs';
// dotenv.config();

// const app = express();

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, 'uploads/resumes');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/interviews', require('./routes/interviews'));
// app.use('/api/upload', require('./routes/upload')); // Add this line

// // Error handling middleware
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ message: 'File size is too large' });
//     }
//   }
//   res.status(500).json({ message: error.message });
// });

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hiresmart', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('MongoDB connected');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// })
// .catch(err => console.log(err));