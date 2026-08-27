import express from 'express';
import * as destinationController from '../controllers/destinationController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

router
  .route('/')
  .get(destinationController.getAll)
  .post(protect, restrictTo('admin'), destinationController.create);

export default router;
