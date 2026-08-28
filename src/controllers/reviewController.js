import Review from '../models/Review.js';
import Tour from '../models/Tour.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort('-createdAt').populate('tour', 'title');
    sendSuccess(res, 200, reviews, 'Successfully fetched all reviews', reviews.length);
  } catch (error) {
    next(error);
  }
};

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
    const { rating, comment, authorName } = req.body;
    const tourId = req.params.id;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    const review = await Review.create({
      tour: tourId,
      author: req.user ? req.user.id : undefined,
      authorName: authorName || (req.user && req.user.fullName) || 'Anonymous',
      authorAvatar: req.user ? req.user.avatarUrl : undefined,
      rating,
      comment
    });

    sendSuccess(res, 201, review, 'Successfully created review');
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    
    sendSuccess(res, 204, null, 'Review deleted successfully');
  } catch (error) {
    next(error);
  }
};
