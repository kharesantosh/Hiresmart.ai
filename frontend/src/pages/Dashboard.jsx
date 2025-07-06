// // client/src/pages/Dashboard.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   HiPlus, 
//   HiBriefcase, 
//   HiClock, 
//   HiCheckCircle,
//   HiChartBar,
//   HiUpload
// } from 'react-icons/hi';
// import CreateInterviewModal from '../components/CreateInterviewModal';
// import ResumeUploader from '../components/ResumeUploader';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [interviews, setInterviews] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     avgScore: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showResumeUploader, setShowResumeUploader] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [interviewsRes, statsRes] = await Promise.all([
//         axios.get('/api/interviews'),
//         axios.get('/api/users/stats')
//       ]);

//       setInterviews(interviewsRes.data.interviews);
//       setStats(statsRes.data.stats);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
//       'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
//       'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
//       'evaluated': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Welcome back, {user?.name}!
//             </h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">
//               {user?.role === 'candidate' 
//                 ? 'Practice and ace your interviews' 
//                 : 'Manage and review candidate interviews'}
//             </p>
//           </div>

//           <div className="flex space-x-4">
//             {user?.role === 'candidate' && !user?.resume?.url && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowResumeUploader(true)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <HiUpload className="w-5 h-5" />
//                 <span>Upload Resume</span>
//               </motion.button>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCreateModal(true)}
//               className="flex items-center space-x-2 btn-primary"
//             >
//               <HiPlus className="w-5 h-5" />
//               <span>New Interview</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Total Interviews</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                   {stats.total}
//                 </p>
//               </div>
//               <HiBriefcase className="w-10 h-10 text-primary-600" />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                                     {stats.completed}
//                 </p>
//               </div>
//               <HiCheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="glassmorphism dark:glassmorphism-dark rounded-xl p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                   {stats.avgScore}%
//                 </p>
//               </div>
//               <HiChartBar className="w-10 h-10 text-purple-600" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Interviews List */}
//         <div className="glassmorphism dark:glassmorphism-dark rounded-xl p-6">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
//             {user?.role === 'candidate' ? 'Your Interviews' : 'All Interviews'}
//           </h2>

//           {interviews.length === 0 ? (
//             <div className="text-center py-12">
//               <HiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">
//                 No interviews yet. Create your first interview to get started!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {interviews.map((interview, index) => (
//                 <motion.div
//                   key={interview._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {interview.jobRole}
//                       </h3>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
//                           {interview.status}
//                         </span>
//                         <span className="text-sm text-gray-500 dark:text-gray-400">
//                           <HiClock className="inline w-4 h-4 mr-1" />
//                           {new Date(interview.createdAt).toLocaleDateString()}
//                         </span>
//                         {interview.overallScore && (
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Score: {interview.overallScore}%
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-3">
//                       {interview.status === 'scheduled' && (
//                         <Link
//                           to={`/interview/${interview._id}`}
//                           className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//                         >
//                           Start Interview
//                         </Link>
//                       )}
//                       {interview.status === 'in-progress' && (
//                         <Link
//                           to={`/interview/${interview._id}`}
//                           className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
//                         >
//                           Continue
//                         </Link>
//                       )}
//                       {(interview.status === 'completed' || interview.status === 'evaluated') && (
//                         <Link
//                           to={`/interview/${interview._id}/result`}
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         >
//                           View Results
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {showCreateModal && (
//         <CreateInterviewModal
//           onClose={() => setShowCreateModal(false)}
//           onSuccess={() => {
//             setShowCreateModal(false);
//             fetchData();
//           }}
//         />
//       )}

//       {showResumeUploader && (
//         <ResumeUploader
//           onClose={() => setShowResumeUploader(false)}
//           onSuccess={() => {
//             setShowResumeUploader(false);
//             window.location.reload();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// ------------------------------------v2----------------------------------------------------------

// frontend/src/pages/Dashboard.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   HiPlus, 
//   HiBriefcase, 
//   HiClock, 
//   HiCheckCircle,
//   HiChartBar,
//   HiUpload
// } from 'react-icons/hi';
// import toast from 'react-hot-toast';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [interviews, setInterviews] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     avgScore: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       // Fetch interviews
//       const interviewsRes = await axios.get('http://localhost:5000/api/interviews', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Fetch stats
//       const statsRes = await axios.get('http://localhost:5000/api/users/stats', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setInterviews(interviewsRes.data.interviews || []);
//       setStats(statsRes.data.stats || {
//         total: 0,
//         completed: 0,
//         avgScore: 0
//       });
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       // Set default values on error
//       setStats({
//         total: 0,
//         completed: 0,
//         avgScore: 0
//       });
//       setInterviews([]);

//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
//       'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
//       'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
//       'evaluated': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Welcome back, {user?.name || 'User'}!
//             </h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">
//               {user?.role === 'candidate' 
//                 ? 'Practice and ace your interviews' 
//                 : 'Manage and review candidate interviews'}
//             </p>
//           </div>

//           <div className="flex space-x-4">
//             {user?.role === 'candidate' && !user?.resume?.url && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <HiUpload className="w-5 h-5" />
//                 <span>Upload Resume</span>
//               </motion.button>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <HiPlus className="w-5 h-5" />
//               <span>New Interview</span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Total Interviews</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                   {stats?.total || 0}
//                 </p>
//               </div>
//               <HiBriefcase className="w-10 h-10 text-blue-600" />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                   {stats?.completed || 0}
//                 </p>
//               </div>
//               <HiCheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
//                   {stats?.avgScore || 0}%
//                 </p>
//               </div>
//               <HiChartBar className="w-10 h-10 text-purple-600" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Interviews List */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
//             {user?.role === 'candidate' ? 'Your Interviews' : 'All Interviews'}
//           </h2>

//           {interviews.length === 0 ? (
//             <div className="text-center py-12">
//               <HiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 dark:text-gray-400">
//                 No interviews yet. Create your first interview to get started!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {interviews.map((interview, index) => (
//                 <motion.div
//                   key={interview._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {interview.jobRole}
//                       </h3>
//                       <div className="flex items-center space-x-4 mt-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
//                           {interview.status}
//                         </span>
//                         <span className="text-sm text-gray-500 dark:text-gray-400">
//                           <HiClock className="inline w-4 h-4 mr-1" />
//                           {new Date(interview.createdAt).toLocaleDateString()}
//                         </span>
//                         {interview.overallScore && (
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Score: {interview.overallScore}%
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-3">
//                       {interview.status === 'scheduled' && (
//                         <Link
//                           to={`/interview/${interview._id}`}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                           Start Interview
//                         </Link>
//                       )}
//                       {interview.status === 'in-progress' && (
//                         <Link
//                           to={`/interview/${interview._id}`}
//                           className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
//                         >
//                           Continue
//                         </Link>
//                       )}
//                       {(interview.status === 'completed' || interview.status === 'evaluated') && (
//                         <Link
//                           to={`/interview/${interview._id}/result`}
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         >
//                           View Results
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// ------------------------------------------------v3-----------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus, Upload, Trophy, Clock, Target, TrendingUp,
    FileText, Mic, Video, Brain
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useInterview } from '../contexts/InterviewContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { interviews, fetchInterviews, createInterview, loading } = useInterview();
    const navigate = useNavigate();
    const [showNewInterviewModal, setShowNewInterviewModal] = useState(false);
    const [interviewForm, setInterviewForm] = useState({
        position: '',
        company: '',
        jobDescription: '',
        difficulty: 'intermediate',
        type: 'behavioral'
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadingResume, setUploadingResume] = useState(false);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setResumeFile(file);
        setUploadingResume(true);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload/resume', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Failed to upload resume');

            const data = await response.json();
            alert('Resume uploaded successfully!');
        } catch (error) {
            alert('Failed to upload resume: ' + error.message);
        } finally {
            setUploadingResume(false);
        }
    };

    const handleCreateInterview = async () => {
        if (!interviewForm.position || !interviewForm.company) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await createInterview(interviewForm);
            setShowNewInterviewModal(false);
            setInterviewForm({
                position: '',
                company: '',
                jobDescription: '',
                difficulty: 'intermediate',
                type: 'behavioral'
            });
        } catch (error) {
            alert('Failed to create interview: ' + error.message);
        }
    };

    // Replace this part in your Dashboard component
    const stats = {
        totalInterviews: Array.isArray(interviews) ? interviews.length : 0,
        avgScore: Array.isArray(interviews) && interviews.length > 0
            ? Math.round(interviews.reduce((acc, int) => acc + (int.overallScore || 0), 0) / interviews.length)
            : 0,
        completedInterviews: Array.isArray(interviews)
            ? interviews.filter(i => i.status === 'completed').length
            : 0,
        improvement: 15
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Welcome Section */}
                <div className="glass-effect rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.name || 'User'}! 👋
                    </h1>
                    <p className="text-white/70">
                        Ready to ace your next interview? Let's practice!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass-effect rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Total Interviews</p>
                                <p className="text-3xl font-bold mt-1">{stats.totalInterviews}</p>
                            </div>
                            <Trophy className="w-10 h-10 text-yellow-400" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass-effect rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Average Score</p>
                                <p className="text-3xl font-bold mt-1">{stats.avgScore}%</p>
                            </div>
                            <Target className="w-10 h-10 text-green-400" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass-effect rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Completed</p>
                                <p className="text-3xl font-bold mt-1">{stats.completedInterviews}</p>
                            </div>
                            <Clock className="w-10 h-10 text-blue-400" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass-effect rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Improvement</p>
                                <p className="text-3xl font-bold mt-1">+{stats.improvement}%</p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-purple-400" />
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowNewInterviewModal(true)}
                        className="glass-effect rounded-xl p-8 text-left hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-4 rounded-lg bg-primary-500/20">
                                <Plus className="w-8 h-8 text-primary-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">New Interview</h3>
                                <p className="text-white/70">Start practicing with AI-powered questions</p>
                            </div>
                        </div>
                    </motion.button>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-effect rounded-xl p-8 text-left"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-4 rounded-lg bg-green-500/20">
                                <Upload className="w-8 h-8 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-1">Upload Resume</h3>
                                <p className="text-white/70">Get personalized interview questions</p>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="resume-upload"
                                />
                                <label
                                    htmlFor="resume-upload"
                                    className="inline-block mt-3 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg cursor-pointer hover:bg-green-500/30 transition-colors"
                                >
                                    {uploadingResume ? 'Uploading...' : 'Choose File'}
                                </label>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Interviews */}
                <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Recent Interviews</h2>
                    {loading ? (
                        <p className="text-white/70">Loading interviews...</p>
                    ) : Array.isArray(interviews) && interviews.length > 0 ? (
                        <div className="space-y-4">
                            {interviews.slice(0, 5).map((interview) => (
                                <motion.div
                                    key={interview._id}
                                    whileHover={{ x: 10 }}
                                    className="glass-effect rounded-lg p-6 cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => navigate(`/interview/${interview._id}/results`)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-lg ${interview.type === 'technical' ? 'bg-blue-500/20' :
                                                    interview.type === 'behavioral' ? 'bg-purple-500/20' :
                                                        'bg-green-500/20'
                                                }`}>
                                                {interview.type === 'technical' ? <Brain className="w-6 h-6 text-blue-400" /> :
                                                    interview.type === 'behavioral' ? <Mic className="w-6 h-6 text-purple-400" /> :
                                                        <Video className="w-6 h-6 text-green-400" />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{interview.position}</h3>
                                                <p className="text-sm text-white/70">{interview.company}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-white/70">
                                                {new Date(interview.createdAt).toLocaleDateString()}
                                            </p>
                                            {interview.overallScore && (
                                                <p className="text-lg font-semibold text-green-400">
                                                    {interview.overallScore}%
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/70">No interviews yet. Start your first practice session!</p>
                    )}
                </div>
            </motion.div>

            {/* New Interview Modal */}
            {showNewInterviewModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-effect rounded-2xl p-8 max-w-md w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Start New Interview</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Position *</label>
                                <input
                                    type="text"
                                    value={interviewForm.position}
                                    onChange={(e) => setInterviewForm({ ...interviewForm, position: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-primary-400 transition-colors"
                                    placeholder="e.g., Senior Software Engineer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Company *</label>
                                <input
                                    type="text"
                                    value={interviewForm.company}
                                    onChange={(e) => setInterviewForm({ ...interviewForm, company: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-primary-400 transition-colors"
                                    placeholder="e.g., Google"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Job Description</label>
                                <textarea
                                    value={interviewForm.jobDescription}
                                    onChange={(e) => setInterviewForm({ ...interviewForm, jobDescription: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-primary-400 transition-colors h-24 resize-none"
                                    placeholder="Paste the job description here..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Interview Type</label>
                                <select
                                    value={interviewForm.type}
                                    onChange={(e) => setInterviewForm({ ...interviewForm, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-primary-400 transition-colors"
                                >
                                    <option value="behavioral">Behavioral</option>
                                    <option value="technical">Technical</option>
                                    <option value="mixed">Mixed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Difficulty</label>
                                <select
                                    value={interviewForm.difficulty}
                                    onChange={(e) => setInterviewForm({ ...interviewForm, difficulty: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-primary-400 transition-colors"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={handleCreateInterview}
                                disabled={loading}
                                className="btn-primary flex-1"
                            >
                                {loading ? 'Creating...' : 'Start Interview'}
                            </button>
                            <button
                                onClick={() => setShowNewInterviewModal(false)}
                                className="flex-1 px-6 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;