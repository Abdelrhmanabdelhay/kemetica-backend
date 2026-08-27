import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

// Only admins can upload images directly through this endpoint
router.post('/', protect, restrictTo('admin'), upload.single('image'), uploadImage);

export default router;
