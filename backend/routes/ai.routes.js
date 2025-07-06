// backend/routes/ai.routes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  generateQuestions,
  evaluateAnswer,
  parseResume
} from '../controllers/ai.controller.js';

const router = express.Router();

router.use(protect); // All routes below require authentication

router.post('/generate-questions', generateQuestions);
router.post('/evaluate-answer', evaluateAnswer);
router.post('/parse-resume', parseResume);

export default router;