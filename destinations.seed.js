import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Destination from './src/models/Destination.js';

dotenv.config();

const destinations = [
  { slug: 'giza', name: 'Giza', iconUrl: '/icons/giza-icon.jpg', sortOrder: 1 },
  { slug: 'luxor', name: 'Luxor', iconUrl: '/icons/luxor-icon.jpg', sortOrder: 2 },
  { slug: 'aswan', name: 'Aswan', iconUrl: '/icons/aswan-icon.jpg', sortOrder: 3 },
];

const seedDB = async () => {
  try {
    const DB = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kemetica';
    await mongoose.connect(DB);
    console.log('DB connection successful!');

    await Destination.deleteMany();
    console.log('Existing destinations deleted');

    await Destination.insertMany(destinations);
    console.log('Seed data inserted successfully!');

    process.exit(0);
  } catch (err) {
    console.error('Error with seed data:', err);
    process.exit(1);
  }
};

seedDB();
