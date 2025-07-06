// // client/src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { Toaster } from 'react-hot-toast';
// import PrivateRoute from './components/PrivateRoute';
// import Layout from './components/Layout';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import Dashboard from './pages/Dashboard';
// import Interview from './pages/Interview';
// import InterviewResult from './pages/InterviewResult';
// import Profile from './pages/Profile';
// import PublicInterview from './pages/PublicInterview';
// import AuthenticatedApp from './components/AuthenticatedApp';

// function App() {
//   return (
//     <Router>
//       <ThemeProvider>
//         <AuthProvider>
//           <Layout>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/reset-password/:token" element={<ResetPassword />} />
//               <Route path="/interview/public/:link" element={<PublicInterview />} />
              
//               <Route element={<PrivateRoute />}>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/interview/:id" element={<Interview />} />
//                 <Route path="/interview/:id/result" element={<InterviewResult />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Route>
//             </Routes>
//           </Layout>
//           <Toaster 
//             position="top-right"
//             toastOptions={{
//               duration: 4000,
//               style: {
//                 background: '#1f2937',
//                 color: '#fff',
//               },
//             }}
//           />
//         </AuthProvider>
//       </ThemeProvider>
//     </Router>
//   );
// }

// export default App;

// -------------------------------------------------v2---------------------------------------------------------------

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { InterviewProvider } from './contexts/InterviewContext';
// import Navbar from './components/Navbar';
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import InterviewPrep from './pages/InterviewPrep';
// import Interview from './pages/Interview';
// import Results from './pages/Results';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <div className="min-h-screen bg-dark-900">
//             <Navbar />
//             <main>
//               <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
                
//                 <Route element={<ProtectedRoute />}>
//                   <InterviewProvider>
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/interview/prep" element={<InterviewPrep />} />
//                     <Route path="/interview/:id" element={<Interview />} />
//                     <Route path="/interview/:id/results" element={<Results />} />
//                   </InterviewProvider>
//                 </Route>
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

// ----------------------------------------v3----------------------------------------------------

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { InterviewProvider } from './contexts/InterviewContext';
// import Navbar from './components/Navbar';
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import InterviewPrep from './pages/InterviewPrep';
// import Interview from './pages/Interview';
// import Results from './pages/Results';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <InterviewProvider>
//           <Router>
//             <div className="min-h-screen bg-dark-900">
//               <Navbar />
//               <main>
//                 <Routes>
//                   <Route path="/" element={<Landing />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
                  
//                   <Route element={<ProtectedRoute />}>
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/interview/prep" element={<InterviewPrep />} />
//                     <Route path="/interview/:id" element={<Interview />} />
//                     <Route path="/interview/:id/results" element={<Results />} />
//                   </Route>
//                 </Routes>
//               </main>
//             </div>
//           </Router>
//         </InterviewProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

// --------------------------v4------------------------------------------------------------

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { ThemeProvider } from './contexts/ThemeContext';
// import Navbar from './components/Navbar';
// import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import PrivateRoute from './components/PrivateRoute';
// import AuthenticatedApp from './components/AuthenticatedApp';

// function App() {
//   return (
//     <Router>
//       <ThemeProvider>
//         <AuthProvider>
//           <div className="min-h-screen bg-dark-900">
//             <Navbar />
//             <main>
//               <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
                
//                 <Route path="/*" element={
//                   <PrivateRoute>
//                     <AuthenticatedApp />
//                   </PrivateRoute>
//                 } />
//               </Routes>
//             </main>
//           </div>
//         </AuthProvider>
//       </ThemeProvider>
//     </Router>
//   );
// }

// export default App;

// ------------------------------------------------------------v5----------------------------------------------------

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { InterviewProvider } from './contexts/InterviewContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import InterviewPrep from './pages/InterviewPrep';
import Interview from './pages/Interview';
import Results from './pages/Results';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <InterviewProvider>
            <div className="min-h-screen bg-dark-900">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/interview/prep" element={<InterviewPrep />} />
                    <Route path="/interview/:id" element={<Interview />} />
                    <Route path="/interview/:id/results" element={<Results />} />
                  </Route>
                </Routes>
              </main>
            </div>
          </InterviewProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;