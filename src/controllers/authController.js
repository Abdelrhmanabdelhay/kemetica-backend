import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id, user.role);

  res.cookie('kmt_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Remove password from output
  user.password = undefined;

  sendSuccess(res, statusCode, { user }, message);
};

export const register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, res, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Invalid credentials', 401));
    }

    createSendToken(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie('kmt_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  sendSuccess(res, 200, null, 'Logged out successfully');
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    sendSuccess(res, 200, { user }, 'Successfully fetched user data');
  } catch (error) {
    next(error);
  }
};
