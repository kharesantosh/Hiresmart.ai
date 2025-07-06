// backend/controllers/user.controller.js
import User from '../models/User.js';
import AIService from '../services/ai.service.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already in use'
        });
      }
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }

    // Upload to cloudinary
    const result = await uploadToCloudinary(req.file.buffer, 'resumes');
    
    // Parse resume using AI
    const parsedData = await AIService.parseResume(req.file.buffer, req.file.mimetype);
    
    // Update user
    const user = await User.findById(req.user.id);
    user.resume = {
      public_id: result.public_id,
      url: result.secure_url,
      parsedData
    };
    
    await user.save();
    
    res.status(200).json({
      success: true,
      resume: user.resume,
      parsedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get interview stats
    const Interview = (await import('../models/Interview.js')).default;
    const interviews = await Interview.find({ candidate: userId });
    
    const stats = {
      total: interviews.length,
      completed: interviews.filter(i => i.status === 'completed' || i.status === 'evaluated').length,
      avgScore: 0
    };
    
    // Calculate average score
    const completedInterviews = interviews.filter(i => i.overallScore);
    if (completedInterviews.length > 0) {
      const totalScore = completedInterviews.reduce((acc, i) => acc + i.overallScore, 0);
      stats.avgScore = Math.round(totalScore / completedInterviews.length);
    }
    
    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};