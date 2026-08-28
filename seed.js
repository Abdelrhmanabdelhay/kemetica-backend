import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';
import Tour from './src/models/Tour.js';
import Review from './src/models/Review.js';
import Inquiry from './src/models/Inquiry.js';
import Category from './src/models/Category.js';

dotenv.config();

const users = [
  { fullName: 'Admin User', email: 'admin@kemetica.com', password: 'password123', role: 'admin' }
];

const tours = [
  {
    "title": "Giza VIP Experience",
    "slug": "giza-vip-experience",
    "tagline": "Private access to the Great Pyramids.",
    "description": "An exclusive VIP tour of the Giza Plateau including private access to the Sphinx enclosure.",
    "category": "historical",
    "destination": "giza",
    "duration": 1,
    "max_group_size": 5,
    "featured_image_url": "/cover-special/giza.jpg",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80"
    ],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "special",
    "sub_type": "gold",
    "is_featured": false,
    "highlights": [
      "Private Sphinx enclosure access",
      "VIP guide",
      "Luxury transport"
    ],
    "included": [
      "Professional Egyptologist Guide",
      "All transfers by private air-conditioned vehicle",
      "Entrance fees to all mentioned sites",
      "Meals as mentioned in the itinerary"
    ],
    "excluded": [
      "International Airfare",
      "Entry visa to Egypt",
      "Any optional tours",
      "Tipping"
    ],
    "tours_plan": [
      {
        "day": 1,
        "title": "Arrival & Check-in",
        "description": [
          { "headline": "Morning Pickup:", "details": "Meet your guide and transfer to your accommodation." },
          { "headline": "Afternoon Tour:", "details": "Begin your exploration with an introductory tour." },
          { "headline": "Meals:", "details": "Dinner included." }
        ]
      },
      {
        "day": 2,
        "title": "Highlights Tour",
        "description": [
          { "headline": "Early Departure:", "details": "Leave early to beat the crowds and heat." },
          { "headline": "Guided Visit:", "details": "Explore the majestic sites with your expert guide." },
          { "headline": "Meals:", "details": "Breakfast, Lunch" }
        ]
      }
    ]
  },
  {
    "title": "Luxor to Aswan Nile Cruise",
    "slug": "luxor-aswan-nile-cruise",
    "tagline": "Sail the Nile in pure luxury.",
    "description": "A 5-day luxury cruise from Luxor to Aswan exploring the Valley of the Kings and Karnak Temple.",
    "category": "luxury-nile",
    "destination": "luxor",
    "duration": 5,
    "max_group_size": 20,
    "featured_image_url": "/cover-special/luxor.jpg",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80"
    ],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "special",
    "sub_type": "cruise",
    "is_featured": true,
    "highlights": [
      "Valley of the Kings",
      "Karnak Temple",
      "Luxury cruise ship"
    ],
    "included": [
      "Professional Egyptologist Guide",
      "All transfers by private air-conditioned vehicle",
      "Entrance fees to all mentioned sites",
      "Meals as mentioned in the itinerary"
    ],
    "excluded": [
      "International Airfare",
      "Entry visa to Egypt",
      "Any optional tours",
      "Tipping"
    ],
    "tours_plan": [
      {
        "day": 1,
        "title": "Arrival & Check-in",
        "description": [
          { "headline": "Morning Pickup:", "details": "Meet your guide and transfer to your accommodation." },
          { "headline": "Afternoon Tour:", "details": "Begin your exploration with an introductory tour." },
          { "headline": "Meals:", "details": "Dinner included." }
        ]
      },
      {
        "day": 2,
        "title": "Highlights Tour",
        "description": [
          { "headline": "Early Departure:", "details": "Leave early to beat the crowds and heat." },
          { "headline": "Guided Visit:", "details": "Explore the majestic sites with your expert guide." },
          { "headline": "Meals:", "details": "Breakfast, Lunch" }
        ]
      }
    ]
  },
  {
    "title": "Aswan Philae Temple at Night",
    "slug": "aswan-philae-night",
    "tagline": "Witness the magic of Philae Temple.",
    "description": "A special evening tour to see the spectacular sound and light show at Philae Temple on Agilkia Island.",
    "category": "cultural",
    "destination": "aswan",
    "duration": 1,
    "max_group_size": 10,
    "featured_image_url": "/cover-special/aswan.jpg",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80"
    ],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "special",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Philae Temple illuminated",
      "Sound and Light show",
      "Motorboat to island"
    ],
    "included": [
      "Professional Egyptologist Guide",
      "All transfers by private air-conditioned vehicle",
      "Entrance fees to all mentioned sites",
      "Meals as mentioned in the itinerary"
    ],
    "excluded": [
      "International Airfare",
      "Entry visa to Egypt",
      "Any optional tours",
      "Tipping"
    ],
    "tours_plan": [
      {
        "day": 1,
        "title": "Arrival & Check-in",
        "description": [
          { "headline": "Morning Pickup:", "details": "Meet your guide and transfer to your accommodation." },
          { "headline": "Afternoon Tour:", "details": "Begin your exploration with an introductory tour." },
          { "headline": "Meals:", "details": "Dinner included." }
        ]
      },
      {
        "day": 2,
        "title": "Highlights Tour",
        "description": [
          { "headline": "Early Departure:", "details": "Leave early to beat the crowds and heat." },
          { "headline": "Guided Visit:", "details": "Explore the majestic sites with your expert guide." },
          { "headline": "Meals:", "details": "Breakfast, Lunch" }
        ]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    const DB = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kemetica';
    await mongoose.connect(DB);
    console.log('DB connection successful!');

    // 1. Clear Database
    await User.deleteMany();
    await Tour.deleteMany();
    await Review.deleteMany();
    await Inquiry.deleteMany();
    console.log('Existing data deleted');

    const categories = await Category.find();
    if (categories.length === 0) {
      console.log('No categories found! Please run seed-categories.js first.');
      process.exit(1);
    }

    const categoryMap = {};
    for (const cat of categories) {
      const oldTourString = cat.name.toLowerCase().replace(' ', '-');
      categoryMap[oldTourString] = cat._id;
    }

    const toursWithCategories = tours.map(tour => {
      const categoryId = categoryMap[tour.category];
      if (!categoryId) {
        console.warn(`Category mapping not found for ${tour.category}`);
      }
      return { ...tour, category: categoryId };
    });

    // 2. Insert Users
    const createdUsers = await User.create(users);
    console.log(`Seeded ${createdUsers.length} users`);

    // 3. Insert Tours
    const createdTours = await Tour.create(toursWithCategories);
    console.log(`Seeded ${createdTours.length} tours`);

    // 4. Insert Reviews
    const reviews = [];
    await Review.create(reviews);
    console.log(`Seeded ${reviews.length} reviews`);

    // 5. Insert Inquiries
    const inquiries = [];
    await Inquiry.create(inquiries);
    console.log(`Seeded ${inquiries.length} inquiries`);

    console.log('All seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error with seed data:', err);
    process.exit(1);
  }
};

seedDB();
