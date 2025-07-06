// client/src/pages/InterviewResult.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  HiCheckCircle, 
  HiXCircle, 
  HiLightBulb,
  HiDownload,
  HiShare
} from 'react-icons/hi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast from 'react-hot-toast';

const InterviewResult = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const response = await axios.get(`/api/interviews/${id}`);
      setInterview(response.data.interview);
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get(`/api/interviews/${id}/report`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `interview-report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download report');
    }
  };

  const shareResults = async () => {
    try {
      const response = await axios.post(`/api/interviews/${id}/share`);
      const shareUrl = response.data.shareUrl;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Interview Results',
          text: 'Check out my interview results!',
          url: shareUrl
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share results');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getRecommendationStyle = (recommendation) => {
    const styles = {
      'strongly-recommend': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'recommend': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'maybe': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'not-recommend': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return styles[recommendation] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interview Results
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {interview?.jobRole} - {new Date(interview?.completedAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadReport}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <HiDownload className="w-5 h-5" />
              <span>Download Report</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareResults}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <HiShare className="w-5 h-5" />
              <span>Share</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Overall Performance
              </h2>
              
              <div className="flex items-center space-x-8">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={interview?.overallScore || 0}
                    text={`${interview?.overallScore || 0}%`}
                    styles={buildStyles({
                      pathColor: getScoreColor(interview?.overallScore || 0),
                      textColor: '#1f2937',
                      trailColor: '#e5e7eb',
                    })}
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {interview?.aiReview?.summary}
                  </p>
                  {interview?.aiReview?.hiringRecommendation && (
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRecommendationStyle(interview.aiReview.hiringRecommendation)}`}>
                      {interview.aiReview.hiringRecommendation.replace('-', ' ').toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Question-wise Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Question-wise Analysis
              </h2>
              
              <div className="space-y-4">
                {interview?.questions.map((question, index) => (
                  <div key={question._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Q{index + 1}: {question.question}
                      </h3>
                      <span className={`text-lg font-bold ${
                        question.aiEvaluation?.score >= 7 ? 'text-green-600' : 
                        question.aiEvaluation?.score >= 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {question.aiEvaluation?.score || 0}/10
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {question.aiEvaluation?.feedback}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {question.aiEvaluation?.keyPointsCovered?.map((point, idx) => (
                        <span key={idx} className="flex items-center text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                          <HiCheckCircle className="w-3 h-3 mr-1" />
                          {point}
                        </span>
                      ))}
                      {question.aiEvaluation?.keyPointsMissed?.map((point, idx) => (
                        <span key={idx} className="flex items-center text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                          <HiXCircle className="w-3 h-3 mr-1" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Strengths
              </h3>
              <ul className="space-y-2">
                {interview?.aiReview?.strengths?.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <HiCheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Areas of Improvement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Areas of Improvement
              </h3>
              <ul className="space-y-2">
                {interview?.aiReview?.areasOfImprovement?.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <HiLightBulb className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{area}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recommendations
              </h3>
              <ul className="space-y-2">
                {interview?.aiReview?.recommendations?.map((recommendation, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    • {recommendation}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Actions */}
            <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6">
              <Link
                to="/dashboard"
                className="block w-full text-center btn-primary"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResult;