import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

// All routes are protected and restricted to admin
router.use(protect, restrictTo('admin'));

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router
  .route('/:id/toggle-status')
  .patch(categoryController.toggleCategoryStatus);

export default router;
