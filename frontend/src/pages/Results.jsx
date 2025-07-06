import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Target, Clock, TrendingUp, 
  CheckCircle, XCircle, AlertCircle,
  Download, Share2, RefreshCw
} from 'lucide-react';
import { useInterview } from '../contexts/InterviewContext';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInterview } = useInterview();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviewResults();
  }, [id]);

  const fetchInterviewResults = async () => {
    try {
      const data = await getInterview(id);
      setInterview(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-effect rounded-2xl p-8 text-center">
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-effect rounded-2xl p-8 text-center">
          <p>Interview not found</p>
        </div>
      </div>
    );
  }

  const overallScore = interview.overallScore || 75; // Mock score
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Interview Results</h1>
          <p className="text-xl text-white/70">
            {interview.position} at {interview.company}
          </p>
        </div>

        {/* Overall Score */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - overallScore / 100)}`}
                  className={`${getScoreColor(overallScore)} transition-all duration-1000`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </p>
                <p className="text-white/70">Overall Score</p>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-2xl font-semibold mb-2">
                {overallScore >= 80 ? 'Excellent Performance!' :
                 overallScore >= 60 ? 'Good Job!' :
                 'Keep Practicing!'}
              </p>
              <p className="text-white/70 max-w-2xl mx-auto">
                {overallScore >= 80 
                  ? 'You demonstrated strong interview skills and gave comprehensive answers.'
                  : overallScore >= 60 
                  ? 'You showed good understanding but there\'s room for improvement in some areas.'
                  : 'Practice more to improve your interview skills and confidence.'}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">85%</p>
            <p className="text-sm text-white/70">Answer Quality</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">92%</p>
            <p className="text-sm text-white/70">Time Management</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">78%</p>
            <p className="text-sm text-white/70">Communication</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 text-center"
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">88%</p>
            <p className="text-sm text-white/70">Confidence</p>
          </motion.div>
        </div>

        {/* Question-by-Question Breakdown */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Question Analysis</h2>
          
          <div className="space-y-4">
            {interview.questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold flex items-center">
                    Question {index + 1}
                    {question.score >= 80 ? (
                      <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                    ) : question.score >= 60 ? (
                      <AlertCircle className="w-5 h-5 text-yellow-400 ml-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 ml-2" />
                    )}
                  </h3>
                  <span className={`font-bold ${getScoreColor(question.score || 75)}`}>
                    {question.score || 75}%
                  </span>
                </div>
                
                <p className="text-white/80 mb-3">{question.question}</p>
                
                {question.feedback && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-sm">
                      <span className="font-semibold text-blue-400">Feedback:</span>{' '}
                      {question.feedback || 'Good answer with clear structure and relevant examples.'}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="font-semibold">Strengths</p>
                <p className="text-white/70">
                  You demonstrated good technical knowledge and provided structured answers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="font-semibold">Areas for Improvement</p>
                <p className="text-white/70">
                  Try to include more specific examples from your experience and practice the STAR method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Practice Again</span>
          </button>
          
          <button className="px-6 py-3 glass-effect rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          
          <button className="px-6 py-3 glass-effect rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Results</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;