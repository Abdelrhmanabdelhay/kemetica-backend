import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour from './src/models/Tour.js';

dotenv.config();

const updateExistingToPopular = async () => {
  try {
    const DB = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kemetica';
    await mongoose.connect(DB);
    console.log('DB connection successful!');

    // Find 6 existing standard tours
    const standardTours = await Tour.find({
      $or: [{ tour_type: 'standard' }, { tour_type: { $exists: false } }]
    }).limit(6);

    if (standardTours.length === 0) {
      console.log('No standard tours found.');
    } else {
      console.log(`Found ${standardTours.length} standard tours. Updating their tour_type to 'popular'...`);
      for (const tour of standardTours) {
        tour.tour_type = 'popular';
        await tour.save();
        console.log(`Updated existing tour to popular: ${tour.title}`);
      }
      console.log('Successfully updated tours in the database! No duplicates were created.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

updateExistingToPopular();
