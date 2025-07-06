// server/models/Interview.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['technical', 'behavioral', 'situational'],
    default: 'technical'
  },
  answer: {
    text: String,
    audioUrl: String,
    videoUrl: String,
    duration: Number
  },
  aiEvaluation: {
    score: {
      type: Number,
      min: 0,
      max: 10
    },
    feedback: String,
    strengths: [String],
    improvements: [String],
    keyPoints: [String]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  jobRole: {
    type: String,
    required: true
  },
  jobDescription: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    default: 'medium'
  },
  questions: [questionSchema],
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'evaluated'],
    default: 'scheduled'
  },
  scheduledDate: Date,
  startedAt: Date,
  completedAt: Date,
  duration: Number, // in seconds
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  aiReview: {
    summary: String,
    strengths: [String],
    areasOfImprovement: [String],
    recommendations: [String],
    hiringRecommendation: {
      type: String,
      enum: ['strongly-recommend', 'recommend', 'maybe', 'not-recommend']
    }
  },
  publicLink: {
    type: String,
    unique: true,
    sparse: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  recordingUrl: String,
  reportUrl: String
}, {
  timestamps: true
});

// Generate public link
interviewSchema.methods.generatePublicLink = function() {
  this.publicLink = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  this.isPublic = true;
  return this.publicLink;
};

export default mongoose.model('Interview', interviewSchema);

// -------------------------------------------------v2-------------------------------------------------------------------
// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['behavioral', 'technical', 'mixed']
//   },
//   difficulty: {
//     type: String,
//     enum: ['beginner', 'intermediate', 'advanced']
//   },
//   userAnswer: String,
//   duration: Number,
//   score: Number,
//   feedback: String
// });

// const interviewSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   position: {
//     type: String,
//     required: true
//   },
//   company: {
//     type: String,
//     required: true
//   },
//   jobDescription: String,
//   type: {
//     type: String,
//     enum: ['behavioral', 'technical', 'mixed'],
//     default: 'behavioral'
//   },
//   difficulty: {
//     type: String,
//     enum: ['beginner', 'intermediate', 'advanced'],
//     default: 'intermediate'
//   },
//   questions: [questionSchema],
//   status: {
//     type: String,
//     enum: ['in-progress', 'completed'],
//     default: 'in-progress'
//   },
//   overallScore: Number,
//   completedAt: Date,
//   duration: Number
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Interview', interviewSchema);