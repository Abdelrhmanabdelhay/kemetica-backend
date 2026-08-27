import Review from '../models/Review.js';
import Tour from '../models/Tour.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

export const getForTour = async (req, res, next) => {
  try {
    const reviews = await Review.find({ tour: req.params.id }).sort('-createdAt');
    sendSuccess(res, 200, reviews, 'Successfully fetched reviews', reviews.length);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const tourId = req.params.id;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    const review = await Review.create({
      tour: tourId,
      author: req.user.id,
      authorName: req.user.fullName || 'Anonymous',
      authorAvatar: req.user.avatarUrl,
      rating,
      comment
    });

    sendSuccess(res, 201, review, 'Successfully created review');
  } catch (error) {
    next(error);
  }
};
