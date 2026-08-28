import Category from '../models/Category.js';
import Tour from '../models/Tour.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';
import { slugify } from '../utils/slugify.js';

export const createCategory = async (req, res, next) => {
  try {
    let { name, slug, description, display_order, is_active } = req.body;

    if (!name) {
      return next(new AppError('Please provide a category name', 400));
    }

    if (!slug) {
      slug = slugify(name);
    } else {
      slug = slugify(slug);
    }

    const category = await Category.create({
      name,
      description,
      is_active,
      display_order
    });

    sendSuccess(res, 201, category, 'Successfully created category');
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { q, is_active, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }

    if (is_active !== undefined) {
      filter.is_active = is_active === 'true';
    }

    const skip = (page - 1) * limit;

    const [categories, totalCount] = await Promise.all([
      Category.find(filter)
        .sort('display_order name')
        .skip(skip)
        .limit(Number(limit)),
      Category.countDocuments(filter)
    ]);

    sendSuccess(res, 200, categories, 'Successfully fetched categories', totalCount);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }
    sendSuccess(res, 200, category, 'Successfully fetched category');
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let { name, slug, description, image_url, is_active, display_order } = req.body;

    const categoryToUpdate = await Category.findById(req.params.id);
    if (!categoryToUpdate) {
      return next(new AppError('Category not found', 404));
    }

    // Regenerate slug if name is changed and no specific slug is provided
    if (name && name !== categoryToUpdate.name && !slug) {
      slug = slugify(name);
    } else if (slug) {
      slug = slugify(slug);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description, image_url, is_active, display_order },
      { returnDocument: 'after', runValidators: true }
    );

    sendSuccess(res, 200, updatedCategory, 'Successfully updated category');
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const isUsed = await Tour.exists({ category: req.params.id });

    if (isUsed) {
      return next(new AppError('This category is currently being used by tours. Please deactivate it instead of deleting.', 400));
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }

    sendSuccess(res, 204, null, 'Successfully deleted category');
  } catch (error) {
    next(error);
  }
};

export const toggleCategoryStatus = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }

    category.is_active = !category.is_active;
    await category.save();

    sendSuccess(res, 200, category, `Successfully ${category.is_active ? 'activated' : 'deactivated'} category`);
  } catch (error) {
    next(error);
  }
};
