import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, Clock, Target, ArrowRight, 
  Mic, Video, FileText, CheckCircle 
} from 'lucide-react';

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('behavioral');

  const interviewTypes = [
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      icon: Brain,
      description: 'Focus on past experiences and situational questions',
      duration: '30-45 min',
      questions: '8-10 questions'
    },
    {
      id: 'technical',
      title: 'Technical Interview',
      icon: FileText,
      description: 'Technical questions and problem-solving scenarios',
      duration: '45-60 min',
      questions: '5-7 questions'
    },
    {
      id: 'mixed',
      title: 'Mixed Interview',
      icon: Target,
      description: 'Combination of behavioral and technical questions',
      duration: '45-60 min',
      questions: '10-12 questions'
    }
  ];

  const tips = [
    'Ensure you\'re in a quiet environment with good lighting',
    'Test your camera and microphone before starting',
    'Keep water nearby to stay hydrated',
    'Use the STAR method for behavioral questions',
    'Take a moment to think before answering'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Prepare for Your Interview</h1>
          <p className="text-xl text-white/70">Choose your interview type and get ready</p>
        </div>

        {/* Interview Type Selection */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Select Interview Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interviewTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-primary-400 bg-primary-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <type.icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-white/70 mb-4">{type.description}</p>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{type.duration}</span>
                  </p>
                  <p className="text-white/70">{type.questions}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preparation Tips */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Before You Start</h2>
          
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/80">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equipment Check */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Equipment Check</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <Video className="w-8 h-8 text-blue-400" />
              <div>
                <p className="font-semibold">Camera</p>
                <p className="text-sm text-white/70">Ensure your camera is working properly</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
              <Mic className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-semibold">Microphone</p>
                <p className="text-sm text-white/70">Test your microphone audio quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/interview/new')}
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
          >
            <span>Start Interview</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPrep;