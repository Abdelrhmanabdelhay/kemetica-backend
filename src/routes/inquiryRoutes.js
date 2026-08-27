import express from 'express';
import * as inquiryController from '../controllers/inquiryController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('admin'), inquiryController.getAll)
  .post(inquiryController.create);

router
  .route('/:id')
  .patch(protect, restrictTo('admin'), inquiryController.updateStatus);

export default router;
