import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { InterviewProvider } from '../contexts/InterviewContext';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import InterviewPrep from '../pages/InterviewPrep';
import Interview from '../pages/Interview';
import Results from '../pages/Results';

const AuthenticatedApp = () => {
  return (
    <InterviewProvider>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interview/prep" element={<InterviewPrep />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/interview/:id/results" element={<Results />} />
      </Routes>
    </InterviewProvider>
  );
};

export default AuthenticatedApp;