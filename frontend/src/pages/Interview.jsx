// client/src/pages/Interview.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Webcam from 'react-webcam';
import { HiMicrophone, HiStop, HiVideoCamera, HiChevronRight } from 'react-icons/hi';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  const [interview, setInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    fetchInterview();
  }, [id]);

  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  const fetchInterview = async () => {
    try {
      const response = await axios.get(`/api/interviews/${id}`);
      setInterview(response.data.interview);
      
      if (response.data.interview.status === 'scheduled') {
        await startInterview();
      }
    } catch (error) {
      toast.error('Failed to load interview');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const startInterview = async () => {
    try {
      await axios.post(`/api/interviews/${id}/start`);
      setInterview(prev => ({ ...prev, status: 'in-progress' }));
    } catch (error) {
      toast.error('Failed to start interview');
    }
  };

  const handleStartRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error('Browser does not support speech recognition');
      return;
    }
    
    startListening(); // Instead of SpeechRecognition.startListening()
    // SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
    
    // Start video recording if enabled
    if (isVideoEnabled && webcamRef.current) {
      const stream = webcamRef.current.stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorderRef.current.start();
    }
  };

  const handleStopRecording = () => {
    // SpeechRecognition.stopListening();
     stopListening(); // Instead of SpeechRecognition.stopListening()
    setIsRecording(false);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const currentQuestion = interview.questions[currentQuestionIndex];
      
            // Upload video if recorded
      let videoUrl = null;
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', blob);
        
        try {
          const uploadResponse = await axios.post('/api/upload/video', formData);
          videoUrl = uploadResponse.data.url;
        } catch (error) {
          console.error('Video upload failed:', error);
        }
      }
      
      // Submit answer
      const response = await axios.post(`/api/interviews/${id}/answer`, {
        questionId: currentQuestion._id,
        answer: answer,
        videoUrl: videoUrl,
        duration: Date.now() - questionStartTime
      });
      
      const evaluation = response.data.evaluation;
      
      // Show immediate feedback
      toast.success(`Score: ${evaluation.score}/10`);
      
      // Move to next question or complete interview
      if (currentQuestionIndex < interview.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnswer('');
        resetTranscript();
        setRecordedChunks([]);
      } else {
        await completeInterview();
      }
    } catch (error) {
      toast.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const completeInterview = async () => {
    try {
      await axios.post(`/api/interviews/${id}/complete`);
      toast.success('Interview completed!');
      navigate(`/interview/${id}/result`);
    } catch (error) {
      toast.error('Failed to complete interview');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentQuestion = interview?.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / interview?.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {interview?.jobRole} Interview
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {interview?.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-primary-600 h-2 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentQuestion?.question}
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  {currentQuestion?.questionType}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Expected time: {currentQuestion?.expectedDuration || '2-3 minutes'}
                </span>
              </div>
            </motion.div>

            {/* Answer Area */}
            <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Answer
              </h3>
              
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here or use voice recording..."
                className="w-full min-h-[200px] p-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />

              {/* Voice Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <HiStop className="w-5 h-5" />
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <HiMicrophone className="w-5 h-5" />
                        <span>Start Recording</span>
                      </>
                    )}
                  </motion.button>

                  {listening && (
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse w-3 h-3 bg-red-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Listening...
                      </span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !answer.trim()}
                  className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit Answer'}</span>
                  <HiChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="space-y-6">
            <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Video Recording
                </h3>
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    isVideoEnabled
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <HiVideoCamera className="w-5 h-5" />
                </button>
              </div>

              {isVideoEnabled ? (
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  <Webcam
                    ref={webcamRef}
                    audio={true}
                    className="w-full h-full object-cover"
                  />
                  {isRecording && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm">REC</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Video recording disabled
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Interview Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Take your time to think before answering
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Be specific and provide examples
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Maintain eye contact with the camera
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Speak clearly and at a moderate pace
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;