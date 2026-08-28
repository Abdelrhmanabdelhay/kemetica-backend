import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/protect.js';
import { restrictTo } from '../middleware/restrictTo.js';

const router = express.Router();

// All routes here require admin privileges
router.use(protect, restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .delete(userController.deleteUser);

export default router;
