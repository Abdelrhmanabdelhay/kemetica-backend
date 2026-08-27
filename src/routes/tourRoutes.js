import express from 'express';
import * as tourController from '../controllers/tourController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

router.get('/featured', tourController.getFeatured);
router.get('/special', tourController.getSpecial);
router.get('/popular', tourController.getPopular);

router
  .route('/')
  .get(tourController.getAll)
  .post(protect, restrictTo('admin'), tourController.create);

router
  .route('/:id')
  .get(tourController.getOne)
  .patch(protect, restrictTo('admin'), tourController.update)
  .delete(protect, restrictTo('admin'), tourController.deleteTour);

export default router;
