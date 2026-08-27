import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './src/models/Category.js';
import Tour from './src/models/Tour.js';

// Load env vars
dotenv.config();

const defaultCategories = [
  { name: 'Historical', description: 'Explore ancient history and landmarks.' },
  { name: 'Luxury Nile', description: 'Premium cruises along the Nile river.' },
  { name: 'Desert Safari', description: 'Thrilling adventures in the desert.' },
  { name: 'Cultural', description: 'Immerse yourself in local culture and traditions.' },
  { name: 'Diving', description: 'Discover the underwater wonders.' },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kemetica');
    console.log('MongoDB Connected...');

    console.log('Seeding default categories...');
    const categoryMap = {};

    for (const cat of defaultCategories) {
      let category = await Category.findOne({ name: cat.name });
      if (!category) {
        category = await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
      
      // The old tour category strings were like 'historical', 'luxury-nile', etc.
      // We generate the expected old string format to map it correctly.
      const oldTourString = cat.name.toLowerCase().replace(' ', '-');
      categoryMap[oldTourString] = category._id;
    }

    console.log('\nMigrating Tours to use Category ObjectIds...');

    // Find tours where category is still a string
    // Since category is now an ObjectId in the schema, Mongoose might try to cast string to ObjectId and fail if we just do Tour.find()
    // We will bypass schema casting for the query by using the raw collection
    const tourCollection = mongoose.connection.db.collection('tours');
    const tours = await tourCollection.find({ type: { $type: "string" } }).toArray();
    // Wait, type is not the field, `category` is the field.
    const rawTours = await tourCollection.find({ category: { $type: "string" } }).toArray();

    if (rawTours.length === 0) {
      console.log('No tours found with a string category. Migration might have already run.');
    }

    let updatedCount = 0;
    for (const tour of rawTours) {
      const categoryId = categoryMap[tour.category];
      if (categoryId) {
        await tourCollection.updateOne(
          { _id: tour._id },
          { $set: { category: categoryId } }
        );
        updatedCount++;
      } else {
        console.log(`Warning: Tour ${tour.title} has an unknown category string: ${tour.category}`);
      }
    }

    console.log(`\nMigration completed. Updated ${updatedCount} tours.`);

    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
