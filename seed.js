import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';
import Tour from './src/models/Tour.js';
import Review from './src/models/Review.js';
import Inquiry from './src/models/Inquiry.js';
import Category from './src/models/Category.js';

dotenv.config();

const users = [
  { fullName: 'Admin User', email: 'admin@kemetica.com', password: 'password123', role: 'admin' },
  { fullName: 'Guide Ahmed', email: 'guide@kemetica.com', password: 'password123', role: 'guide' },
  { fullName: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' }
];

const tours = [
  {
    "title": "Giza VIP Experience",
    "slug": "giza-vip-experience",
    "tagline": "Private access to the Great Pyramids.",
    "description": "An exclusive VIP tour of the Giza Plateau including private access to the Sphinx enclosure.",
    "category": "historical",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 5,
    "featured_image_url": "/cover-special/giza.jpg",
    "gallery_urls": [],
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
    "itinerary": []
  },
  {
    "title": "Giza and Cairo Highlights",
    "slug": "giza-cairo-highlights",
    "tagline": "Discover the ancient wonders of Cairo and Giza.",
    "description": "An unforgettable journey through the Great Pyramids the Sphinx and the Egyptian Museum.",
    "category": "historical",
    "destination": "giza",
    "duration_days": 3,
    "max_group_size": 15,
    "featured_image_url": "https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Great Pyramids",
      "The Sphinx",
      "Egyptian Museum"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "description": "Arrive in Cairo.",
        "activities": [],
        "meals": [
          "Dinner"
        ]
      },
      {
        "day": 2,
        "title": "Pyramids",
        "description": "Full day tour of Giza Pyramids.",
        "activities": [
          "Sightseeing"
        ],
        "meals": [
          "Breakfast",
          "Lunch"
        ]
      }
    ]
  },
  {
    "title": "Grand Egyptian Museum VIP Tour",
    "slug": "giza-grand-museum-vip",
    "tagline": "Explore the new GEM with a private guide.",
    "description": "A comprehensive private guided tour of the Grand Egyptian Museum next to the Pyramids.",
    "category": "historical",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 8,
    "featured_image_url": "https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Tutankhamun treasures",
      "Private guide",
      "Skip the queue"
    ],
    "itinerary": []
  },
  {
    "title": "Nile Dinner Cruise from Giza",
    "slug": "giza-nile-dinner-cruise",
    "tagline": "Sail the Nile with dinner and live entertainment.",
    "description": "A magical evening cruise on the Nile River from Giza featuring gourmet dinner and belly dancing shows.",
    "category": "luxury-nile",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 30,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "cruise",
    "is_featured": false,
    "highlights": [
      "Gourmet dinner on board",
      "Belly dancing show",
      "Live Tanoura dance"
    ],
    "itinerary": []
  },
  {
    "title": "Nile Felucca Sunset Cruise",
    "slug": "giza-felucca-sunset",
    "tagline": "Traditional sailing as the sun sets over Cairo.",
    "description": "Enjoy a peaceful one-hour Felucca sail on the Nile near Giza watching the sun set behind the pyramids.",
    "category": "cultural",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 12,
    "featured_image_url": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "cruise",
    "is_featured": false,
    "highlights": [
      "Traditional Felucca boat",
      "Pyramid backdrop at sunset",
      "Relaxing experience"
    ],
    "itinerary": []
  },
  {
    "title": "Giza Quad Bike Desert Safari",
    "slug": "giza-quad-bike",
    "tagline": "Thrilling desert adventure.",
    "description": "Explore the Giza desert surrounding the Pyramids on an exciting quad bike safari.",
    "category": "desert-safari",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 10,
    "featured_image_url": "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Quad bike safari",
      "Desert landscape",
      "Pyramid views"
    ],
    "itinerary": []
  },
  {
    "title": "Giza Sound and Light Show Transfer",
    "slug": "giza-sound-and-light",
    "tagline": "The Pyramids illuminated with hotel transfers.",
    "description": "Watch the history of ancient Egypt at the Giza Pyramids Sound and Light show with round-trip hotel transfer.",
    "category": "cultural",
    "destination": "giza",
    "duration_days": 1,
    "max_group_size": 30,
    "featured_image_url": "https://images.unsplash.com/photo-1600527382025-0604b9c51a02?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Giza",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Sound and light show",
      "Hotel pickup and drop-off",
      "Evening spectacle"
    ],
    "itinerary": []
  },
  {
    "title": "Luxor to Aswan Nile Cruise",
    "slug": "luxor-aswan-nile-cruise",
    "tagline": "Sail the Nile in pure luxury.",
    "description": "A 5-day luxury cruise from Luxor to Aswan exploring the Valley of the Kings and Karnak Temple.",
    "category": "luxury-nile",
    "destination": "luxor",
    "duration_days": 5,
    "max_group_size": 20,
    "featured_image_url": "/cover-special/luxor.jpg",
    "gallery_urls": [],
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
    "itinerary": [
      {
        "day": 1,
        "title": "Boarding",
        "description": "Board the cruise ship in Luxor.",
        "activities": [],
        "meals": [
          "Dinner"
        ]
      }
    ]
  },
  {
    "title": "Luxor VIP Private Tour",
    "slug": "luxor-vip-private",
    "tagline": "Experience Luxor exclusively.",
    "description": "A private premium guided tour of all Luxor highlights both East and West banks with exclusive access and luxury transport.",
    "category": "historical",
    "destination": "luxor",
    "duration_days": 2,
    "max_group_size": 6,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "exclusive",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Private Egyptologist guide",
      "Both East and West banks",
      "Luxury vehicle"
    ],
    "itinerary": []
  },
  {
    "title": "Luxor Hot Air Balloon Ride",
    "slug": "luxor-balloon",
    "tagline": "See Luxor from the sky.",
    "description": "A magical sunrise hot air balloon flight over the Valley of the Kings and Luxor Temple.",
    "category": "cultural",
    "destination": "luxor",
    "duration_days": 1,
    "max_group_size": 24,
    "featured_image_url": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Sunrise flight",
      "Valley of the Kings aerial view",
      "Champagne landing"
    ],
    "itinerary": []
  },
  {
    "title": "Luxor Felucca Nile Overnight",
    "slug": "luxor-felucca-overnight",
    "tagline": "Sleep under the stars on the Nile.",
    "description": "A relaxing overnight Felucca trip from Luxor sailing gently downriver as you watch the temples drift by.",
    "category": "luxury-nile",
    "destination": "luxor",
    "duration_days": 2,
    "max_group_size": 10,
    "featured_image_url": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "cruise",
    "is_featured": false,
    "highlights": [
      "Overnight on deck",
      "Cook on board",
      "Temple views from the river"
    ],
    "itinerary": []
  },
  {
    "title": "Luxor Dahabiya Private Cruise",
    "slug": "luxor-dahabiya-cruise",
    "tagline": "Old-world elegance on the Nile.",
    "description": "Sail in style on a traditional Dahabiya houseboat from Luxor stopping at smaller less-visited temples along the way.",
    "category": "luxury-nile",
    "destination": "luxor",
    "duration_days": 4,
    "max_group_size": 12,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "exclusive",
    "sub_type": "cruise",
    "is_featured": false,
    "highlights": [
      "Private Dahabiya houseboat",
      "Off-the-beaten-track temples",
      "Gourmet dining on board"
    ],
    "itinerary": []
  },
  {
    "title": "Luxor West Bank Tour",
    "slug": "luxor-west-bank",
    "tagline": "Valley of the Kings with hotel transfer.",
    "description": "Explore the royal tombs in the Valley of the Kings and Hatshepsut Temple with comfortable A/C vehicle and hotel pickup.",
    "category": "historical",
    "destination": "luxor",
    "duration_days": 1,
    "max_group_size": 15,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Valley of the Kings",
      "Hatshepsut Temple",
      "Hotel pickup and drop-off"
    ],
    "itinerary": []
  },
  {
    "title": "Dendera and Abydos Day Trip",
    "slug": "luxor-dendera-abydos",
    "tagline": "Venture beyond Luxor.",
    "description": "A full-day excursion from Luxor to the beautifully preserved temples of Dendera and Abydos.",
    "category": "historical",
    "destination": "luxor",
    "duration_days": 1,
    "max_group_size": 12,
    "featured_image_url": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Luxor",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Dendera Temple",
      "Abydos Temple",
      "Full-day excursion"
    ],
    "itinerary": []
  },
  {
    "title": "Aswan Philae Temple at Night",
    "slug": "aswan-philae-night",
    "tagline": "Witness the magic of Philae Temple.",
    "description": "A special evening tour to see the spectacular sound and light show at Philae Temple on Agilkia Island.",
    "category": "cultural",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 10,
    "featured_image_url": "/cover-special/aswan.jpg",
    "gallery_urls": [],
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
    "itinerary": []
  },
  {
    "title": "Aswan Luxury Nile Escape",
    "slug": "aswan-luxury-escape",
    "tagline": "The finest Aswan experience.",
    "description": "A premium full-day Aswan tour including Philae Temple the Unfinished Obelisk and the High Dam with a private guide.",
    "category": "historical",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 6,
    "featured_image_url": "https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "exclusive",
    "sub_type": "gold",
    "is_featured": true,
    "highlights": [
      "Philae Temple",
      "Unfinished Obelisk",
      "High Dam",
      "Private guide"
    ],
    "itinerary": []
  },
  {
    "title": "Aswan Nubian Gold Experience",
    "slug": "aswan-nubian-gold",
    "tagline": "Nubian culture in premium style.",
    "description": "An exclusive private motorboat to a Nubian village followed by a traditional Nubian meal and guided tour of local life.",
    "category": "cultural",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 8,
    "featured_image_url": "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "exclusive",
    "sub_type": "gold",
    "is_featured": false,
    "highlights": [
      "Private motorboat",
      "Nubian village visit",
      "Traditional lunch included"
    ],
    "itinerary": []
  },
  {
    "title": "Aswan to Luxor Nile Cruise",
    "slug": "aswan-luxor-nile-cruise",
    "tagline": "Sail north from Aswan on the Nile.",
    "description": "A 4-day luxury cruise from Aswan to Luxor visiting Kom Ombo and Edfu temples along the way.",
    "category": "luxury-nile",
    "destination": "aswan",
    "duration_days": 4,
    "max_group_size": 25,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "cruise",
    "is_featured": true,
    "highlights": [
      "Kom Ombo Temple",
      "Edfu Temple",
      "Luxury cruise ship"
    ],
    "itinerary": []
  },
  {
    "title": "Aswan Felucca Sunset Sail",
    "slug": "aswan-felucca",
    "tagline": "Sail the Nile the traditional way.",
    "description": "A relaxing sunset sail on a traditional wooden Felucca boat around Elephantine Island.",
    "category": "cultural",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 8,
    "featured_image_url": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "popular",
    "sub_type": "cruise",
    "is_featured": false,
    "highlights": [
      "Traditional Felucca",
      "Elephantine Island",
      "Sunset views"
    ],
    "itinerary": []
  },
  {
    "title": "Nubian Village Day Trip",
    "slug": "aswan-nubian-village",
    "tagline": "Discover Nubian culture and colors.",
    "description": "Take a motorboat across the Nile to visit a traditional brightly colored Nubian Village with hotel transfer.",
    "category": "cultural",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 15,
    "featured_image_url": "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Motorboat crossing",
      "Nubian village",
      "Hotel transfer"
    ],
    "itinerary": []
  },
  {
    "title": "High Dam and Unfinished Obelisk",
    "slug": "aswan-high-dam",
    "tagline": "Engineering marvels ancient and modern.",
    "description": "A guided tour of the massive Aswan High Dam and the ancient Unfinished Obelisk with hotel pickup and drop-off.",
    "category": "historical",
    "destination": "aswan",
    "duration_days": 1,
    "max_group_size": 20,
    "featured_image_url": "https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [],
    "city": "Aswan",
    "country": "Egypt",
    "tour_type": "standard",
    "sub_type": "transfer",
    "is_featured": false,
    "highlights": [
      "Aswan High Dam",
      "Unfinished Obelisk",
      "Hotel pickup and drop-off"
    ],
    "itinerary": []
  }
];;;

const seedDB = async () => {
  try {
    const DB = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kemetica';
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

    // 4. Insert Reviews (Link to actual users and tours)
    const reviews = [
      {
        tour: createdTours[0]._id,
        author: createdUsers[2]._id,
        authorName: createdUsers[2].fullName,
        rating: 5,
        comment: 'Amazing experience at the Pyramids!'
      },
      {
        tour: createdTours[1]._id,
        author: createdUsers[2]._id,
        authorName: createdUsers[2].fullName,
        rating: 4,
        comment: 'The cruise was beautiful and relaxing.'
      }
    ];
    await Review.create(reviews);
    console.log(`Seeded ${reviews.length} reviews`);

    // 5. Insert Inquiries
    const inquiries = [
      { fullName: 'Alice Smith', email: 'alice@example.com', expeditionType: 'luxury-nile', estimatedGuests: 2 }
    ];
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
