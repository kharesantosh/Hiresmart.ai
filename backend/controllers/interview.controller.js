// // server/controllers/interview.controller.js
// import Interview from '../models/Interview.js';
// import AIService from '../services/ai.service.js';
// import { uploadToCloudinary } from '../utils/cloudinary.js';

// export const createInterview = async (req, res) => {
//   try {
//     const { jobRole, jobDescription, difficulty, scheduledDate } = req.body;
//     const candidateId = req.user.id;

//     // Get candidate's resume data
//     const candidate = await User.findById(candidateId);
//     if (!candidate.resume?.parsedData) {
//       return res.status(400).json({
//         success: false,
//         error: 'Please upload your resume first'
//       });
//     }

//     // Generate questions based on resume and job role
//     const questionsData = await AIService.generateInterviewQuestions(
//       candidate.resume.parsedData,
//       jobRole,
//       difficulty
//     );

//     // Create interview
//     const interview = await Interview.create({
//       candidate: candidateId,
//       jobRole,
//       jobDescription,
//       difficulty,
//       scheduledDate,
//       questions: questionsData.questions.map(q => ({
//         question: q.question,
//         questionType: q.type
//       }))
//     });

//     res.status(201).json({
//       success: true,
//       interview
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const startInterview = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const interview = await Interview.findById(id);
//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         error: 'Interview not found'
//       });
//     }

//     // Check if user is authorized
//         // Check if user is authorized
//     if (interview.candidate.toString() !== req.user.id && req.user.role !== 'recruiter') {
//       return res.status(403).json({
//         success: false,
//         error: 'Not authorized to access this interview'
//       });
//     }

//     interview.status = 'in-progress';
//     interview.startedAt = new Date();
//     await interview.save();

//     res.status(200).json({
//       success: true,
//       interview
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const submitAnswer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { questionId, answer, audioUrl, videoUrl, duration } = req.body;

//     const interview = await Interview.findById(id);
//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         error: 'Interview not found'
//       });
//     }

//     // Find the question
//     const question = interview.questions.id(questionId);
//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         error: 'Question not found'
//       });
//     }

//     // Save answer
//     question.answer = {
//       text: answer,
//       audioUrl,
//       videoUrl,
//       duration
//     };

//     // Get AI evaluation
//     const evaluation = await AIService.evaluateAnswer(
//       question.question,
//       answer,
//       interview.jobRole,
//       question.keyPoints || []
//     );

//     question.aiEvaluation = evaluation;
//     await interview.save();

//     res.status(200).json({
//       success: true,
//       evaluation,
//       question
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const completeInterview = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const interview = await Interview.findById(id);
//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         error: 'Interview not found'
//       });
//     }

//     // Calculate duration
//     interview.completedAt = new Date();
//     interview.duration = Math.floor(
//       (interview.completedAt - interview.startedAt) / 1000
//     );
//     interview.status = 'completed';

//     // Generate overall report
//     const report = await AIService.generateInterviewReport(interview);
//     interview.overallScore = report.overallScore;
//     interview.aiReview = {
//       summary: report.summary,
//       strengths: report.strengths,
//       areasOfImprovement: report.areasOfImprovement,
//       recommendations: report.recommendations,
//       hiringRecommendation: report.hiringRecommendation
//     };

//     await interview.save();

//     res.status(200).json({
//       success: true,
//       interview,
//       report
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const generatePublicLink = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const interview = await Interview.findById(id);
//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         error: 'Interview not found'
//       });
//     }

//     // Check if user is recruiter
//     if (req.user.role !== 'recruiter') {
//       return res.status(403).json({
//         success: false,
//         error: 'Only recruiters can generate public links'
//       });
//     }

//     const publicLink = interview.generatePublicLink();
//     await interview.save();

//     res.status(200).json({
//       success: true,
//       publicLink: `${process.env.CLIENT_URL}/interview/public/${publicLink}`
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

//--------------------------------------------------------------------------------------

// backend/controllers/interview.controller.js
import Interview from '../models/Interview.js';
import User from '../models/User.js';
import AIService from '../services/ai.service.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const createInterview = async (req, res) => {
  try {
    const { jobRole, jobDescription, difficulty, scheduledDate } = req.body;
    const candidateId = req.user.id;

    // Get candidate's resume data
    const candidate = await User.findById(candidateId);
    if (!candidate.resume?.parsedData) {
      return res.status(400).json({
        success: false,
        error: 'Please upload your resume first'
      });
    }

    // Generate questions based on resume and job role
    const questionsData = await AIService.generateInterviewQuestions(
      candidate.resume.parsedData,
      jobRole,
      difficulty
    );

    // Create interview
    const interview = await Interview.create({
      candidate: candidateId,
      jobRole,
      jobDescription,
      difficulty,
      scheduledDate,
      questions: questionsData.questions.map(q => ({
        question: q.question,
        questionType: q.type
      }))
    });

    res.status(201).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const query = req.user.role === 'candidate' 
      ? { candidate: req.user.id }
      : {};
      
    const interviews = await Interview.find(query)
      .populate('candidate', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      interviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('candidate', 'name email');
    
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }
    
    // Check authorization
    if (interview.candidate._id.toString() !== req.user.id && req.user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }
    
    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const startInterview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }

    interview.status = 'in-progress';
    interview.startedAt = new Date();
    await interview.save();

    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionId, answer, audioUrl, videoUrl, duration } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }

    // Find the question
    const question = interview.questions.id(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    // Save answer
    question.answer = {
      text: answer,
      audioUrl,
      videoUrl,
      duration
    };

    // Get AI evaluation
    const evaluation = await AIService.evaluateAnswer(
      question.question,
      answer,
      interview.jobRole,
      question.keyPoints || []
    );

    question.aiEvaluation = evaluation;
    await interview.save();

    res.status(200).json({
      success: true,
      evaluation,
      question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const completeInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }

    // Calculate duration
    interview.completedAt = new Date();
    interview.duration = Math.floor(
      (interview.completedAt - interview.startedAt) / 1000
    );
    interview.status = 'completed';

    // Generate overall report
    const report = await AIService.generateInterviewReport(interview);
    interview.overallScore = report.overallScore;
    interview.aiReview = {
      summary: report.summary,
      strengths: report.strengths,
      areasOfImprovement: report.areasOfImprovement,
      recommendations: report.recommendations,
      hiringRecommendation: report.hiringRecommendation
    };

    await interview.save();

    res.status(200).json({
      success: true,
      interview,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const generatePublicLink = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }

    // Check if user is recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        error: 'Only recruiters can generate public links'
      });
    }

    const publicLink = interview.generatePublicLink();
    await interview.save();

    res.status(200).json({
      success: true,
      publicLink: `${process.env.CLIENT_URL}/interview/public/${publicLink}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getInterviewReport = async (req, res) => {
  try {
    const { id } = req.params;
    
    const interview = await Interview.findById(id)
      .populate('candidate', 'name email');
    
    if (!interview) {
      return res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
    }
    
    // TODO: Generate PDF report
    // For now, return the interview data
    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};