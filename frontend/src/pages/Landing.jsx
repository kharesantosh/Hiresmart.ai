import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Users, Target, TrendingUp, 
  CheckCircle, ArrowRight, Sparkles, Zap
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Questions',
      description: 'Get personalized interview questions based on your resume and job description'
    },
    {
      icon: Users,
      title: 'Real-time Feedback',
      description: 'Receive instant AI feedback on your answers and communication skills'
    },
    {
      icon: Target,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and improvement suggestions'
    },
    {
      icon: TrendingUp,
      title: 'Skill Development',
      description: 'Identify areas for improvement and get personalized coaching tips'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center px-4 py-2 mb-6 glass-effect rounded-full"
            >
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">AI-Powered Interview Preparation</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Ace Your Next Interview with{' '}
              <span className="gradient-text">HireSmart.ai</span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Practice with AI-generated questions, get real-time feedback, and boost your confidence
              for any interview.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 glass-effect rounded-lg hover:bg-white/10 transition-colors"
              >
                Sign In
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to prepare for any interview
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl p-6"
              >
                <feature.icon className="w-12 h-12 text-primary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              How <span className="gradient-text">HireSmart.ai</span> Works
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { step: 1, title: 'Upload Your Resume', description: 'Upload your resume and job description for personalized questions' },
              { step: 2, title: 'Practice Interviews', description: 'Answer AI-generated questions with video/audio recording' },
              { step: 3, title: 'Get Instant Feedback', description: 'Receive detailed analysis and improvement suggestions' },
              { step: 4, title: 'Track Progress', description: 'Monitor your performance and see your improvement over time' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-400">{item.step}</span>
                </div>
                <div className="flex-1 glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="glass-effect rounded-3xl p-12 text-center">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their interview skills with HireSmart.ai
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started for Free
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;