import Inquiry from '../models/Inquiry.js';
import { sendSuccess } from '../utils/response.js';
import AppError from '../utils/AppError.js';
import { sendInquiryEmail } from '../utils/emailService.js';

export const create = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phoneCountryCode,
      phone,
      nationality,
      tourTitle,
      tourSlug,
      travelDateFrom,
      travelDateTo,
      adults,
      children,
      message,
    } = req.body;

    const inquiry = await Inquiry.create({
      fullName,
      email,
      phoneCountryCode,
      phone,
      nationality,
      tourTitle,
      tourSlug,
      travelDateFrom,
      travelDateTo,
      adults,
      children,
      message,
    });

    // Send notification email — non-blocking; a mail failure won't break the response
    sendInquiryEmail(inquiry).catch((err) => {
      console.error('[EmailService] Failed to send inquiry email:', err.message);
    });

    sendSuccess(res, 201, inquiry, 'Inquiry submitted successfully');
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
      { returnDocument: 'after', runValidators: true }
    );
    if (!inquiry) {
      return next(new AppError('Inquiry not found', 404));
    }
    sendSuccess(res, 200, inquiry, 'Successfully updated inquiry status');
  } catch (error) {
    next(error);
  }
};
