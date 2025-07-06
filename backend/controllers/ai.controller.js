// backend/controllers/ai.controller.js
import AIService from '../services/ai.service.js';

export const generateQuestions = async (req, res) => {
  try {
    const { resumeData, jobRole, difficulty, count } = req.body;
    
    const questions = await AIService.generateInterviewQuestions(
      resumeData,
      jobRole,
      difficulty,
      count
    );
    
    res.status(200).json({
      success: true,
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer, jobRole, expectedKeyPoints } = req.body;
    
    const evaluation = await AIService.evaluateAnswer(
      question,
      answer,
      jobRole,
      expectedKeyPoints
    );
    
    res.status(200).json({
      success: true,
      evaluation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    
    const parsedData = await AIService.parseResume(
      req.file.buffer,
      req.file.mimetype
    );
    
    res.status(200).json({
      success: true,
      parsedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};