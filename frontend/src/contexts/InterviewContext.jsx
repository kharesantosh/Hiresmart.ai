// import React, { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const InterviewContext = createContext();

// export const useInterview = () => {
//   const context = useContext(InterviewContext);
//   if (!context) {
//     throw new Error('useInterview must be used within InterviewProvider');
//   }
//   return context;
// };

// export const InterviewProvider = ({ children }) => {
//   const { token } = useAuth();
//   const navigate = useNavigate();
//   const [interviews, setInterviews] = useState([]);
//   const [currentInterview, setCurrentInterview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all interviews
//   const fetchInterviews = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/interviews', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch interviews');
      
//       const data = await response.json();
//       setInterviews(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create new interview
//   const createInterview = async (interviewData) => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/interviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(interviewData)
//       });
      
//       if (!response.ok) throw new Error('Failed to create interview');
      
//       const data = await response.json();
//       setCurrentInterview(data);
//       navigate(`/interview/${data._id}`);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get interview by ID
//   const getInterview = async (id) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/interviews/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch interview');
      
//       const data = await response.json();
//       setCurrentInterview(data);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update interview answer
//   const updateAnswer = async (interviewId, questionIndex, answer) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/interviews/${interviewId}/answer`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ questionIndex, answer })
//       });
      
//       if (!response.ok) throw new Error('Failed to update answer');
      
//       const data = await response.json();
//       setCurrentInterview(data);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     }
//   };

//   // Complete interview
//   const completeInterview = async (interviewId) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/interviews/${interviewId}/complete`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) throw new Error('Failed to complete interview');
      
//       const data = await response.json();
//       setCurrentInterview(data);
//       navigate(`/interview/${interviewId}/results`);
//       return data;
//     } catch (error) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     interviews,
//     currentInterview,
//     loading,
//     error,
//     fetchInterviews,
//     createInterview,
//     getInterview,
//     updateAnswer,
//     completeInterview
//   };

//   return (
//     <InterviewContext.Provider value={value}>
//       {children}
//     </InterviewContext.Provider>
//   );
// };

// ------------------------------------v2=============================================

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const InterviewContext = createContext();

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within InterviewProvider');
  }
  return context;
};

export const InterviewProvider = ({ children }) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all interviews
  const fetchInterviews = async () => {
    if (!token) return; // Don't fetch if not authenticated
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/interviews', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch interviews');
      
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new interview
  const createInterview = async (interviewData) => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(interviewData)
      });
      
      if (!response.ok) throw new Error('Failed to create interview');
      
      const data = await response.json();
      setCurrentInterview(data);
      navigate(`/interview/${data._id}`);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get interview by ID
  const getInterview = async (id) => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch interview');
      
      const data = await response.json();
      setCurrentInterview(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update interview answer
  const updateAnswer = async (interviewId, questionIndex, answer) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${interviewId}/answer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ questionIndex, answer })
      });
      
      if (!response.ok) throw new Error('Failed to update answer');
      
      const data = await response.json();
      setCurrentInterview(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Complete interview
  const completeInterview = async (interviewId) => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${interviewId}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to complete interview');
      
      const data = await response.json();
      setCurrentInterview(data);
      navigate(`/interview/${interviewId}/results`);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    interviews,
    currentInterview,
    loading,
    error,
    fetchInterviews,
    createInterview,
    getInterview,
    updateAnswer,
    completeInterview
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};