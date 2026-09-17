import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization: Bearer <token> header first
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Fallback: check HttpOnly cookie
    else if (req.cookies && req.cookies.kmt_token) {
      token = req.cookies.kmt_token;
    }

    if (!token) {
      return next(new AppError('Not authenticated', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
