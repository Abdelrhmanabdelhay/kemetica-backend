import Destination from '../models/Destination.js';
import { sendSuccess } from '../utils/response.js';

import Tour from '../models/Tour.js';

export const getAll = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ isActive: true }).sort('sortOrder');
    
    // Get counts of tours per destination (exclude cover-only 'special' tours)
    const counts = await Tour.aggregate([
      { $match: { tour_type: { $ne: 'special' } } },
      { $group: { _id: '$destination', count: { $sum: 1 } } }
    ]);

    // Attach counts to the destinations
    const destinationsWithCounts = destinations.map(dest => {
      const match = counts.find(c => c._id === dest.slug);
      return {
        ...dest.toObject(),
        toursCount: match ? match.count : 0
      };
    });

    sendSuccess(res, 200, destinationsWithCounts, 'Successfully fetched destinations', destinationsWithCounts.length);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    sendSuccess(res, 201, dest