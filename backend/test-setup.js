// backend/test-setup.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './models/User.js';        // Add this
import './models/Interview.js';

dotenv.config();

async function testSetup() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hiresmart');
    console.log('✅ MongoDB connected');

    // Check models
    console.log('📦 Registered models:', mongoose.modelNames());

    // Test creating a user
    const User = mongoose.model('User');
    const userCount = await User.countDocuments();
    console.log(`👥 Total users: ${userCount}`);

    // Test server endpoint
    const response = await fetch('http://localhost:5000/api/health');
    const health = await response.json();
    console.log('🏥 Health check:', health);

    console.log('\n✅ Backend is fully operational!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testSetup();