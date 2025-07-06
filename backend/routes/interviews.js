const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interview = require('../models/Interview');

// Get all interviews for a user
router.get('/', auth, async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Error fetching interviews' });
  }
});

// Create new interview
router.post('/', auth, async (req, res) => {
  try {
    const { position, company, jobDescription, difficulty, type } = req.body;
    
    // Generate questions based on the interview type
    const questions = generateQuestions(type, difficulty);
    
    const interview = new Interview({
      user: req.userId,
      position,
      company,
      jobDescription,
      difficulty,
      type,
      questions,
      status: 'in-progress'
    });
    
    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ message: 'Error creating interview' });
  }
});

// Get single interview
router.get('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    res.json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({ message: 'Error fetching interview' });
  }
});

// Update interview answer
router.put('/:id/answer', auth, async (req, res) => {
  try {
    const { questionIndex, answer } = req.body;
    
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    interview.questions[questionIndex].userAnswer = answer.answer;
    interview.questions[questionIndex].duration = answer.duration;
    
    await interview.save();
    res.json(interview);
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ message: 'Error updating answer' });
  }
});

// Complete interview
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    // Calculate scores
    let totalScore = 0;
    interview.questions.forEach((question, index) => {
      // Simple scoring logic - you can make this more sophisticated
      const score = question.userAnswer ? Math.floor(Math.random() * 30) + 70 : 0;
      interview.questions[index].score = score;
      totalScore += score;
    });
    
    interview.overallScore = Math.round(totalScore / interview.questions.length);
    interview.status = 'completed';
    interview.completedAt = new Date();
    
    await interview.save();
    res.json(interview);
  } catch (error) {
    console.error('Error completing interview:', error);
    res.status(500).json({ message: 'Error completing interview' });
  }
});

// Helper function to generate questions
function generateQuestions(type, difficulty) {
  const questions = {
    behavioral: [
      "Tell me about yourself and your background.",
      "Describe a challenging situation you faced and how you handled it.",
      "What are your greatest strengths and weaknesses?",
      "Where do you see yourself in 5 years?",
      "Why are you interested in this position?",
      "Tell me about a time you worked in a team.",
      "How do you handle stress and pressure?",
      "Describe a time when you had to learn something new quickly."
    ],
    technical: [
      "Explain your experience with your primary programming language.",
      "How would you optimize a slow-running application?",
      "Describe your approach to debugging complex issues.",
      "What's your experience with version control systems?",
      "How do you ensure code quality in your projects?",
      "Explain a recent technical challenge you solved."
    ],
    mixed: [
      "Tell me about yourself.",
      "What technical skills do you bring to this role?",
      "Describe a technical project you're proud of.",
      "How do you stay updated with new technologies?",
      "Tell me about a time you had to explain technical concepts to non-technical stakeholders."
    ]
  };
  
  const selectedQuestions = questions[type] || questions.behavioral;
  return selectedQuestions.slice(0, 5).map(q => ({
    question: q,
    type: type,
    difficulty: difficulty
  }));
}

module.exports = router;