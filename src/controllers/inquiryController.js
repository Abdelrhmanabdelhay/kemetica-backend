import Inquiry from '../models/Inquiry.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';

export const create = async (req, res, next) => {
  try {
    const {
      fullName, email, phone, expeditionType,
      estimatedGuests, travelDates, specialRequests
    } = req.body;

    const inquiry = await Inquiry.create({
      fullName, email, phone, expeditionType,
      estimatedGuests, travelDates, specialRequests,
    });
    sendSuccess(res, 201, inquiry, 'Successfully created inquiry');
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');
    sendSuccess(res, 200, inquiries, 'Successfully fetched inquiries', inquiries.length);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return next(new AppError('Inquiry not found', 404));
    }
    sendSuccess(res, 200, inquiry, 'Successfully updated inquiry status');
  } catch (error) {
    next(error);
  }
};
