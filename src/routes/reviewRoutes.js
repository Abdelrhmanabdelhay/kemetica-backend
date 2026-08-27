import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getForTour)
  .post(protect, reviewController.create);

export default router;
