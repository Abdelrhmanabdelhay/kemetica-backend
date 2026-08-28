import User from '../models/User.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    sendSuccess(res, 200, users, 'Successfully fetched users', users.length);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    // Allows admin to create a user with a specific role
    const { fullName, email, password, role } = req.body;
    
    const newUser = await User.create({
      fullName,
      email,
      password,
      role: role || 'customer',
    });

    // Remove password from response
    newUser.password = undefined;

    sendSuccess(res, 201, newUser, 'User created successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    sendSuccess(res, 204, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};
