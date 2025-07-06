// // client/src/components/Navbar.jsx
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';
// import { 
//   HiMenu, 
//   HiX, 
//   HiMoon, 
//   HiSun, 
//   HiUser,
//   HiLogout,
//   HiChartBar
// } from 'react-icons/hi';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const { isDark, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text"
//               >
//                 HireSmart.ai
//               </motion.div>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/profile"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="btn-primary text-sm"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
            
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//             >
//               {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md text-gray-700 dark:text-gray-300"
//             >
//               {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {user ? (
//                 <>
//                   <Link
//                     to="/dashboard"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     to="/profile"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsOpen(false);
//                     }}
//                     className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Login
//                   </Link>
//                                     <Link
//                     to="/signup"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//                 <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
//             >
//               {darkMode ? (
//                 <Sun className="w-5 h-5 text-yellow-400" />
//               ) : (
//                 <Moon className="w-5 h-5 text-blue-400" />
//               )}
//             </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

// ----------------------------------------------------------v2----------------------------------------------

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Brain, LogOut, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme(); // Make sure both darkMode and toggleDarkMode are destructured
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary-400" />
            <span className="text-xl font-bold gradient-text">HireSmart.ai</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;