import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get((req, res, next) => {
    if (req.params.id) {
      // If accessed via /tours/:id/reviews
      return reviewController.getForTour(req, res, next);
    }
    // If accessed globally /reviews (admin only)
    return protect(req, res, () => restrictTo('admin')(req, res, () => reviewController.getAllReviews(req, res, next)));
  })
  .post(reviewController.create);

router
  .route('/:id')
  .delete(protect, restrictTo('admin'), reviewController.deleteReview);

export default router;
