// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to HireSmart.ai
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          AI that prepares you for your dream job
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;