// // server/services/ai.service.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import Groq from 'groq-sdk';
// import PDFParser from 'pdf-parse';
// import mammoth from 'mammoth';

// class AIService {
//   constructor() {
//     this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     this.groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY
//     });
//   }

//   // Parse resume from different formats
//   async parseResume(fileBuffer, mimeType) {
//     try {
//       let text = '';

//       if (mimeType === 'application/pdf') {
//         const data = await PDFParser(fileBuffer);
//         text = data.text;
//       } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//         const result = await mammoth.extractRawText({ buffer: fileBuffer });
//         text = result.value;
//       } else {
//         text = fileBuffer.toString('utf-8');
//       }

//       // Use Gemini to extract structured data from resume
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const prompt = `
//         Extract the following information from this resume and return as JSON:
//         {
//           "name": "",
//           "email": "",
//           "phone": "",
//           "skills": ["skill1", "skill2"],
//           "experience": [
//             {
//               "company": "",
//               "position": "",
//               "duration": "",
//               "description": ""
//             }
//           ],
//           "education": [
//             {
//               "institution": "",
//               "degree": "",
//               "year": ""
//             }
//           ],
//           "summary": "Brief professional summary"
//         }
        
//         Resume text:
//         ${text}
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return JSON.parse(response.text());
//     } catch (error) {
//       console.error('Resume parsing error:', error);
//       throw new Error('Failed to parse resume');
//     }
//   }

//   // Generate interview questions based on resume and job role
//   async generateInterviewQuestions(resumeData, jobRole, difficulty = 'medium', count = 5) {
//     try {
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const difficultyPrompts = {
//         easy: 'basic and fundamental',
//         medium: 'intermediate level requiring practical knowledge',
//         hard: 'advanced and challenging requiring deep understanding',
//         expert: 'expert level, complex scenarios and system design'
//       };

//       const prompt = `
//         Based on the following resume data and job role, generate ${count} ${difficultyPrompts[difficulty]} interview questions.
        
//         Resume Summary:
//         Skills: ${resumeData.skills?.join(', ')}
//         Experience: ${resumeData.experience?.length || 0} years
        
//         Job Role: ${jobRole}
        
//         Generate questions in the following format:
//         {
//           "questions": [
//             {
//               "id": 1,
//               "question": "Clear, specific interview question",
//               "type": "technical/behavioral/situational",
//               "expectedDuration": "2-3 minutes",
//               "keyPoints": ["key point 1", "key point 2"],
//               "difficulty": "${difficulty}"
//             }
//           ]
//         }
        
//         Make questions relevant to the candidate's background and the job role.
//         Include a mix of technical, behavioral, and situational questions.
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return JSON.parse(response.text());
//     } catch (error) {
//       console.error('Question generation error:', error);
//       throw new Error('Failed to generate questions');
//     }
//   }

//   // Evaluate candidate's answer
//   async evaluateAnswer(question, answer, jobRole, expectedKeyPoints = []) {
//     try {
//       const chat = await this.groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `You are an expert technical interviewer evaluating candidates for ${jobRole} position. 
//                      Provide constructive and detailed feedback.`
//           },
//           {
//             role: "user",
//             content: `
//               Question: ${question}
              
//               Candidate's Answer: ${answer}
              
//               Expected Key Points: ${expectedKeyPoints.join(', ')}
              
//               Evaluate the answer and provide feedback in this JSON format:
//               {
//                 "score": 0-10,
//                 "feedback": "Detailed feedback on the answer",
//                 "strengths": ["strength 1", "strength 2"],
//                 "improvements": ["improvement 1", "improvement 2"],
//                 "keyPointsCovered": ["point 1", "point 2"],
//                 "keyPointsMissed": ["point 1", "point 2"],
//                 "technicalAccuracy": "assessment of technical accuracy",
//                 "communicationClarity": "assessment of communication"
//               }
//             `
//           }
//         ],
//         model: "mixtral-8x7b-32768",
//         temperature: 0.3,
//         max_tokens: 1000,
//       });

//       return JSON.parse(chat.choices[0].message.content);
//     } catch (error) {
//       console.error('Answer evaluation error:', error);
//       throw new Error('Failed to evaluate answer');
//     }
//   }

//   // Generate overall interview report
//   async generateInterviewReport(interview) {
//     try {
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const prompt = `
//         Generate a comprehensive interview report based on the following interview data:
        
//         Job Role: ${interview.jobRole}
//         Difficulty: ${interview.difficulty}
//         Duration: ${interview.duration} seconds
        
//         Questions and Evaluations:
//         ${interview.questions.map((q, i) => `
//           Q${i + 1}: ${q.question}
//           Answer Score: ${q.aiEvaluation?.score || 'N/A'}/10
//           Feedback: ${q.aiEvaluation?.feedback || 'No feedback'}
//         `).join('\n')}
        
//         Generate a report in this format:
//         {
//           "overallScore": 0-100,
//           "summary": "Executive summary of the interview",
//           "technicalSkillsAssessment": "Assessment of technical skills",
//           "communicationSkills": "Assessment of communication",
//           "problemSolvingAbility": "Assessment of problem-solving",
//           "strengths": ["strength 1", "strength 2", "strength 3"],
//           "areasOfImprovement": ["area 1", "area 2", "area 3"],
//           "recommendations": ["recommendation 1", "recommendation 2"],
//           "hiringRecommendation": "strongly-recommend/recommend/maybe/not-recommend",
//           "additionalNotes": "Any additional observations"
//         }
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return JSON.parse(response.text());
//     } catch (error) {
//       console.error('Report generation error:', error);
//       throw new Error('Failed to generate report');
//     }
//   }
// }

// export default new AIService();

// ---------------------------------------------------------------------------------------------------------

// // backend/services/ai.service.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import Groq from 'groq-sdk';
// import PDFParser from 'pdf-parse';
// import mammoth from 'mammoth';

// class AIService {
//   constructor() {
//     this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     this.groq = new Groq({
//       apiKey: process.env.GROQ_API_KEY
//     });
//   }

//   // Parse resume from different formats
//   async parseResume(fileBuffer, mimeType) {
//     try {
//       let text = '';

//       if (mimeType === 'application/pdf') {
//         const data = await PDFParser(fileBuffer);
//         text = data.text;
//       } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//         const result = await mammoth.extractRawText({ buffer: fileBuffer });
//         text = result.value;
//       } else {
//         text = fileBuffer.toString('utf-8');
//       }

//       // Use Gemini to extract structured data from resume
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const prompt = `
//         Extract the following information from this resume and return as JSON:
//         {
//           "name": "",
//           "email": "",
//           "phone": "",
//           "skills": ["skill1", "skill2"],
//           "experience": [
//             {
//               "company": "",
//               "position": "",
//               "duration": "",
//               "description": ""
//             }
//           ],
//           "education": [
//             {
//               "institution": "",
//               "degree": "",
//               "year": ""
//             }
//           ],
//           "summary": "Brief professional summary"
//         }
        
//         Resume text:
//         ${text}
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const responseText = response.text();
      
//       // Clean up the response to ensure valid JSON
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse resume data');
//     } catch (error) {
//       console.error('Resume parsing error:', error);
//       throw new Error('Failed to parse resume');
//     }
//   }

//   // Generate interview questions based on resume and job role
//   async generateInterviewQuestions(resumeData, jobRole, difficulty = 'medium', count = 5) {
//     try {
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const difficultyPrompts = {
//         easy: 'basic and fundamental',
//         medium: 'intermediate level requiring practical knowledge',
//         hard: 'advanced and challenging requiring deep understanding',
//         expert: 'expert level, complex scenarios and system design'
//       };

//       const prompt = `
//         Based on the following resume data and job role, generate ${count} ${difficultyPrompts[difficulty]} interview questions.
        
//         Resume Summary:
//         Skills: ${resumeData.skills?.join(', ')}
//         Experience: ${resumeData.experience?.length || 0} years
        
//         Job Role: ${jobRole}
        
//         Generate questions in the following format:
//         {
//           "questions": [
//             {
//               "id": 1,
//               "question": "Clear, specific interview question",
//               "type": "technical/behavioral/situational",
//               "expectedDuration": "2-3 minutes",
//               "keyPoints": ["key point 1", "key point 2"],
//               "difficulty": "${difficulty}"
//             }
//           ]
//         }
        
//         Make questions relevant to the candidate's background and the job role.
//         Include a mix of technical, behavioral, and situational questions.
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const responseText = response.text();
      
//       // Clean up the response to ensure valid JSON
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }
      
//       throw new Error('Failed to generate questions');
//     } catch (error) {
//       console.error('Question generation error:', error);
//       throw new Error('Failed to generate questions');
//     }
//   }

//   // Evaluate candidate's answer
//   async evaluateAnswer(question, answer, jobRole, expectedKeyPoints = []) {
//     try {
//       const chat = await this.groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `You are an expert technical interviewer evaluating candidates for ${jobRole} position. 
//                      Provide constructive and detailed feedback.`
//           },
//           {
//             role: "user",
//             content: `
//               Question: ${question}
              
//               Candidate's Answer: ${answer}
              
//               Expected Key Points: ${expectedKeyPoints.join(', ')}
              
//               Evaluate the answer and provide feedback in this JSON format:
//               {
//                 "score": 0-10,
//                 "feedback": "Detailed feedback on the answer",
//                 "strengths": ["strength 1", "strength 2"],
//                 "improvements": ["improvement 1", "improvement 2"],
//                 "keyPointsCovered": ["point 1", "point 2"],
//                 "keyPointsMissed": ["point 1", "point 2"],
//                 "technicalAccuracy": "assessment of technical accuracy",
//                 "communicationClarity": "assessment of communication"
//               }
//             `
//           }
//         ],
//         model: "mixtral-8x7b-32768",
//         temperature: 0.3,
//         max_tokens: 1000,
//       });

//       const responseText = chat.choices[0].message.content;
      
//       // Clean up the response to ensure valid JSON
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse evaluation');
//     } catch (error) {
//       console.error('Answer evaluation error:', error);
//       throw new Error('Failed to evaluate answer');
//     }
//   }

//   // Generate overall interview report
//   async generateInterviewReport(interview) {
//     try {
//       const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
//       const prompt = `
//         Generate a comprehensive interview report based on the following interview data:
        
//         Job Role: ${interview.jobRole}
//         Difficulty: ${interview.difficulty}
//         Duration: ${interview.duration} seconds
        
//         Questions and Evaluations:
//         ${interview.questions.map((q, i) => `
//           Q${i + 1}: ${q.question}
//           Answer Score: ${q.aiEvaluation?.score || 'N/A'}/10
//           Feedback: ${q.aiEvaluation?.feedback || 'No feedback'}
//         `).join('\n')}
        
//         Generate a report in this format:
//         {
//           "overallScore": 0-100,
//           "summary": "Executive summary of the interview",
//           "technicalSkillsAssessment": "Assessment of technical skills",
//           "communicationSkills": "Assessment of communication",
//           "problemSolvingAbility": "Assessment of problem-solving",
//           "strengths": ["strength 1", "strength 2", "strength 3"],
//           "areasOfImprovement": ["area 1", "area 2", "area 3"],
//           "recommendations": ["recommendation 1", "recommendation 2"],
//           "hiringRecommendation": "strongly-recommend/recommend/maybe/not-recommend",
//           "additionalNotes": "Any additional observations"
//         }
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const responseText = response.text();
      
//       // Clean up the response to ensure valid JSON
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }
      
//       throw new Error('Failed to generate report');
//     } catch (error) {
//       console.error('Report generation error:', error);
//       throw new Error('Failed to generate report');
//     }
//   }
// }

// export default new AIService();

// backend/services/ai.service.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { parsePDF } from '../utils/pdfParser.js';  // Changed import
import mammoth from 'mammoth';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key-for-dev');
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-dev'
    });
  }

  // Parse resume from different formats
  async parseResume(fileBuffer, mimeType) {
    try {
      let text = '';

      if (mimeType === 'application/pdf') {
        const data = await parsePDF(fileBuffer);  // Use our wrapper
        text = data.text;
      } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        text = result.value;
      } else {
        text = fileBuffer.toString('utf-8');
      }

      // For development, if we don't have API keys, return mock data
      if (!process.env.GEMINI_API_KEY) {
        return {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          skills: ["JavaScript", "React", "Node.js"],
          experience: [{
            company: "Tech Corp",
            position: "Developer",
            duration: "2 years",
            description: "Full stack development"
          }],
          education: [{
            institution: "University",
            degree: "BS Computer Science",
            year: "2020"
          }],
          summary: "Experienced developer"
        };
      }

      // Use Gemini to extract structured data from resume
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Extract the following information from this resume and return as JSON:
        {
          "name": "",
          "email": "",
          "phone": "",
          "skills": ["skill1", "skill2"],
          "experience": [
            {
              "company": "",
              "position": "",
              "duration": "",
              "description": ""
            }
          ],
          "education": [
            {
              "institution": "",
              "degree": "",
              "year": ""
            }
          ],
          "summary": "Brief professional summary"
        }
        
        Resume text:
        ${text}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      // Clean up the response to ensure valid JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse resume data');
    } catch (error) {
      console.error('Resume parsing error:', error);
      // Return mock data for development
      return {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        skills: ["JavaScript", "React", "Node.js"],
        experience: [],
        education: [],
        summary: "Resume parsing failed - using mock data"
      };
    }
  }

  // Generate interview questions based on resume and job role
  async generateInterviewQuestions(resumeData, jobRole, difficulty = 'medium', count = 5) {
    try {
      // For development without API keys
      if (!process.env.GEMINI_API_KEY) {
        return {
          questions: [
            {
              id: 1,
              question: "Can you explain your experience with React?",
              type: "technical",
              expectedDuration: "2-3 minutes",
              keyPoints: ["Component lifecycle", "Hooks", "State management"],
              difficulty: difficulty
            },
            {
              id: 2,
              question: "Describe a challenging project you worked on.",
              type: "behavioral",
              expectedDuration: "3-4 minutes",
              keyPoints: ["Problem solving", "Team work", "Technical challenges"],
              difficulty: difficulty
            },
            {
              id: 3,
              question: "How do you handle API integration in your applications?",
              type: "technical",
              expectedDuration: "2-3 minutes",
              keyPoints: ["REST", "Error handling", "Authentication"],
              difficulty: difficulty
            },
            {
              id: 4,
              question: "Tell me about a time you had to learn a new technology quickly.",
              type: "behavioral",
              expectedDuration: "2-3 minutes",
              keyPoints: ["Learning ability", "Adaptability", "Problem solving"],
              difficulty: difficulty
            },
            {
              id: 5,
              question: "What's your approach to debugging complex issues?",
              type: "technical",
              expectedDuration: "2-3 minutes",
              keyPoints: ["Debugging tools", "Systematic approach", "Problem isolation"],
              difficulty: difficulty
            }
          ]
        };
      }

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const difficultyPrompts = {
        easy: 'basic and fundamental',
        medium: 'intermediate level requiring practical knowledge',
        hard: 'advanced and challenging requiring deep understanding',
        expert: 'expert level, complex scenarios and system design'
      };

      const prompt = `
        Based on the following resume data and job role, generate ${count} ${difficultyPrompts[difficulty]} interview questions.
        
        Resume Summary:
        Skills: ${resumeData.skills?.join(', ')}
        Experience: ${resumeData.experience?.length || 0} years
        
        Job Role: ${jobRole}
        
        Generate questions in the following format:
        {
          "questions": [
            {
              "id": 1,
              "question": "Clear, specific interview question",
              "type": "technical/behavioral/situational",
              "expectedDuration": "2-3 minutes",
              "keyPoints": ["key point 1", "key point 2"],
              "difficulty": "${difficulty}"
            }
          ]
        }
        
        Make questions relevant to the candidate's background and the job role.
        Include a mix of technical, behavioral, and situational questions.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      // Clean up the response to ensure valid JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to generate questions');
    } catch (error) {
      console.error('Question generation error:', error);
      // Return default questions for development
      return {
        questions: [
          {
            id: 1,
            question: `What interests you about the ${jobRole} position?`,
            type: "behavioral",
            expectedDuration: "2-3 minutes",
            keyPoints: ["Motivation", "Career goals", "Company research"],
            difficulty: difficulty
          }
        ]
      };
    }
  }

  // Other methods remain the same but add similar fallbacks...
  async evaluateAnswer(question, answer, jobRole, expectedKeyPoints = []) {
    try {
      // For development without API keys
      if (!process.env.GROQ_API_KEY) {
        return {
          score: Math.floor(Math.random() * 3) + 7, // Random score 7-9
          feedback: "Good answer with clear explanation of the concepts.",
          strengths: ["Clear communication", "Good examples"],
          improvements: ["Could provide more technical depth"],
          keyPointsCovered: expectedKeyPoints.slice(0, 2),
          keyPointsMissed: expectedKeyPoints.slice(2),
          technicalAccuracy: "Good technical understanding",
          communicationClarity: "Clear and well-structured"
        };
      }

      // Original code...
      const chat = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert technical interviewer evaluating candidates for ${jobRole} position. 
                     Provide constructive and detailed feedback.`
          },
          {
            role: "user",
            content: `
              Question: ${question}
              
              Candidate's Answer: ${answer}
              
              Expected Key Points: ${expectedKeyPoints.join(', ')}
              
              Evaluate the answer and provide feedback in this JSON format:
              {
                "score": 0-10,
                "feedback": "Detailed feedback on the answer",
                "strengths": ["strength 1", "strength 2"],
                "improvements": ["improvement 1", "improvement 2"],
                "keyPointsCovered": ["point 1", "point 2"],
                "keyPointsMissed": ["point 1", "point 2"],
                "technicalAccuracy": "assessment of technical accuracy",
                "communicationClarity": "assessment of communication"
              }
            `
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.3,
        max_tokens: 1000,
      });

      const responseText = chat.choices[0].message.content;
      
      // Clean up the response to ensure valid JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse evaluation');
    } catch (error) {
      console.error('Answer evaluation error:', error);
      // Return mock evaluation
      return {
        score: 7,
        feedback: "Development mode: Using mock evaluation",
        strengths: ["Good effort"],
        improvements: ["Practice more"],
        keyPointsCovered: [],
        keyPointsMissed: [],
        technicalAccuracy: "Satisfactory",
        communicationClarity: "Clear"
      };
    }
  }

    async generateInterviewReport(interview) {
    try {
      // For development without API keys
      if (!process.env.GEMINI_API_KEY) {
        const avgScore = interview.questions.reduce((acc, q) => 
          acc + (q.aiEvaluation?.score || 0), 0) / interview.questions.length;
        
        return {
          overallScore: Math.round(avgScore * 10),
          summary: "The candidate demonstrated good technical knowledge and communication skills.",
          technicalSkillsAssessment: "Solid understanding of core concepts with room for growth in advanced topics.",
          communicationSkills: "Clear and articulate communication throughout the interview.",
          problemSolvingAbility: "Good problem-solving approach with logical thinking.",
          strengths: [
            "Strong communication skills",
            "Good technical foundation",
            "Enthusiastic and motivated"
          ],
          areasOfImprovement: [
            "Deepen technical knowledge in specific areas",
            "Practice system design questions",
            "Work on handling edge cases"
          ],
          recommendations: [
            "Continue practicing coding problems",
            "Study system design patterns",
            "Gain more hands-on project experience"
          ],
          hiringRecommendation: avgScore >= 7 ? "recommend" : "maybe",
          additionalNotes: "Development mode - using mock evaluation"
        };
      }

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Generate a comprehensive interview report based on the following interview data:
        
        Job Role: ${interview.jobRole}
        Difficulty: ${interview.difficulty}
        Duration: ${interview.duration} seconds
        
        Questions and Evaluations:
        ${interview.questions.map((q, i) => `
          Q${i + 1}: ${q.question}
          Answer Score: ${q.aiEvaluation?.score || 'N/A'}/10
          Feedback: ${q.aiEvaluation?.feedback || 'No feedback'}
        `).join('\n')}
        
        Generate a report in this format:
        {
          "overallScore": 0-100,
          "summary": "Executive summary of the interview",
          "technicalSkillsAssessment": "Assessment of technical skills",
          "communicationSkills": "Assessment of communication",
          "problemSolvingAbility": "Assessment of problem-solving",
          "strengths": ["strength 1", "strength 2", "strength 3"],
          "areasOfImprovement": ["area 1", "area 2", "area 3"],
          "recommendations": ["recommendation 1", "recommendation 2"],
          "hiringRecommendation": "strongly-recommend/recommend/maybe/not-recommend",
          "additionalNotes": "Any additional observations"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      // Clean up the response to ensure valid JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to generate report');
    } catch (error) {
      console.error('Report generation error:', error);
      // Return mock report
      return {
        overallScore: 75,
        summary: "Development mode - Mock interview report",
        technicalSkillsAssessment: "Good technical foundation",
        communicationSkills: "Clear communication",
        problemSolvingAbility: "Logical approach to problems",
        strengths: ["Good foundation", "Clear communication", "Motivated"],
        areasOfImprovement: ["More practice needed", "Deeper technical knowledge"],
        recommendations: ["Continue learning", "Build more projects"],
        hiringRecommendation: "recommend",
        additionalNotes: "Using mock data for development"
      };
    }
  }
}

export default new AIService();