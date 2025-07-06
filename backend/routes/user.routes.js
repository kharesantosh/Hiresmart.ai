// backend/routes/user.routes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getProfile, 
  updateProfile, 
  uploadResume, 
  getStats 
} from '../controllers/user.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect); // All routes below require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/upload-resume', upload.single('resume'), uploadResume);
router.get('/stats', getStats);

export default router;