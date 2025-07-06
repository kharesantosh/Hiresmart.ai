// backend/routes/interview.routes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createInterview,
  getInterviews,
  getInterview,
  startInterview,
  submitAnswer,
  completeInterview,
  generatePublicLink,
  getInterviewReport
} from '../controllers/interview.controller.js';

const router = express.Router();

router.use(protect); // All routes below require authentication

router.post('/', createInterview);
router.get('/', getInterviews);
router.get('/:id', getInterview);
router.post('/:id/start', startInterview);
router.post('/:id/answer', submitAnswer);
router.post('/:id/complete', completeInterview);
router.post('/:id/share', generatePublicLink);
router.get('/:id/report', getInterviewReport);

export default router;