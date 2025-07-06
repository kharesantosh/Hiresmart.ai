// backend/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  async generateInterviewQuestions(resume, jobRole, difficulty = 'medium') {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Based on this resume: ${JSON.stringify(resume)}
        Generate 5 technical interview questions for a ${jobRole} position.
        Difficulty level: ${difficulty}
        
        Format the response as JSON:
        {
          "questions": [
            {
              "id": 1,
              "question": "...",
              "category": "technical/behavioral/situational",
              "expectedTime": "2-3 minutes"
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('AI Generation Error:', error);
      throw error;
    }
  }

  async evaluateAnswer(question, answer, context) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert technical interviewer. Evaluate the candidate's answer and provide constructive feedback."
          },
          {
            role: "user",
            content: `
              Question: ${question}
              Candidate's Answer: ${answer}
              Job Role: ${context.jobRole}
              
              Provide evaluation in this format:
              {
                "score": 0-10,
                "strengths": ["..."],
                "improvements": ["..."],
                "feedback": "detailed feedback"
              }
            `
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.3,
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Evaluation Error:', error);
      throw error;
    }
  }
}

export default new AIService();