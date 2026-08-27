import Tour from '../models/Tour.js';
import Category from '../models/Category.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

export const getAll = async (req, res, next) => {
  try {
    const { category, destination, maxPrice, q, tour_type, sub_type } = req.query;

    // Always exclude 'special' tours from listings — they are cover/hero images only.
    // Use the dedicated GET /special endpoint to fetch them.
    const filter = { tour_type: { $ne: 'special' } };

    if (category && category !== 'all') {
      const nameSearch = category.replace(/-/g, ' ');
      const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(`^${nameSearch}$`, 'i') } });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        filter.category = null;
      }
    }
    if (destination)                    filter.destination = destination;
    if (maxPrice)                       filter.price_usd = { $lte: Number(maxPrice) };
    if (tour_type)                      filter.tour_type = tour_type;  // explicit override still works
    if (sub_type)                       filter.sub_type = sub_type;
    if (q)                              filter.$text = { $search: q };

    const tours = await Tour.find(filter).sort('-is_featured -rating_score').populate('category');
    sendSuccess(res, 200, tours, 'Successfully fetched tours', tours.length);
  } catch (error) {
    next(error);
  }
};



export const getFeatured = async (req, res, next) => {
  try {
    const tours = await Tour.find({ is_featured: true }).limit(6).sort('-rating_score').populate('category');
    sendSuccess(res, 200, tours, 'Successfully fetched featured tours', tours.length);
  } catch (error) {
    next(error);
  }
};

export const getSpecial = async (req, res, next) => {
  try {
    const { destination } = req.query;
    const filter = { tour_type: 'special' };
    if (destination) filter.destination = destination;
    const tours = await Tour.find(filter).limit(6).populate('category');
    sendSuccess(res, 200, tours, 'Successfully fetched special tours', tours.length);
  } catch (error) {
    next(error);
  }
};

export const getPopular = async (req, res, next) => {
  try {
    const tours = await Tour.find({ tour_type: 'popular' }).limit(6).populate('category');
    sendSuccess(res, 200, tours, 'Successfully fetched popular tours', tours.length);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    const query = isValidObjectId 
      ? { $or: [{ slug: id }, { _id: id }] }
      : { slug: id };

    const tour = await Tour.findOne(query).populate('category');
    
    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    // Special tours are cover images only and shouldn't have a detail page
    if (tour.tour_type === 'special') {
      return next(new AppError('Tour not found', 404));
    }

    sendSuccess(res, 200, tour, 'Successfully fetched tour');
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.body);
    sendSuccess(res, 201, tour, 'Successfully created tour');
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }
    sendSuccess(res, 200, tour, 'Successfully updated tour');
  } catch (error) {
    next(error);
  }
};

export const deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }
    sendSuccess(res, 204, null, 'Successfully deleted tour');
  } catch (error) {
    next(error);
  }
};
