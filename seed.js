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
    "title": "Abu Simbel Temple",
    "tagline": "Journey from Aswan to the legendary temples of Ramesses II and Queen Nefertari at Abu Simbel.",
    "description": "Discover one of Egypt's greatest archaeological masterpieces on a full-day journey from Aswan to the magnificent Abu Simbel Temples. Travel through the Nubian desert toward the shores of Lake Nasser and explore the monumental temples carved into the sandstone cliffs by King Ramesses II during the 19th Dynasty. Your visit includes the Great Temple of Ramesses II, famous for its four colossal seated statues, monumental halls, intricate hieroglyphic reliefs, and sacred sanctuary. You will also explore the nearby Small Temple dedicated to Queen Nefertari and the goddess Hathor, where the queen's statues are presented on an exceptional monumental scale. Your professional guide will explain the history, religious symbolism, architecture, and remarkable relocation of the temples during the international UNESCO campaign in the 1960s. After exploring the site and taking time for photographs, return comfortably to Aswan with unforgettable memories of southern Egypt's ancient Nubian heritage.",
    "category": "historical",
    "destination": "aswan",
    "duration": 1,
    "duration_type": "Days",
    "rating_score": 0,
    "reviews_count": 0,
    "max_group_size": 40,
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948682/kemetica/er2c8elthnh20cpfio6p.webp",
    "gallery_urls": [
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948717/kemetica/agzclz8is1qi3c1ax2q2.webp",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948718/kemetica/drucebrgibwyitexj3gd.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948720/kemetica/jqmug32lfdzbhelsxrdi.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948720/kemetica/pdx36repnimb6g8tjtlp.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787948721/kemetica/lwhtswvypeayqnhbuijn.jpg"
    ],
    "highlights": [
      "Explore the magnificent Great Temple of Ramesses II",
      "Visit the Small Temple of Queen Nefertari and the goddess Hathor",
      "Stand before the four colossal statues of Ramesses II",
      "Discover the fascinating story behind the relocation of Abu Simbel",
      "Travel through the spectacular Nubian desert landscape",
      "Capture unforgettable photographs of one of Egypt's most iconic archaeological sites"
    ],
    "city": "Aswan",
    "country": "Egypt",
    "tours_plan": [
      {
        "day": 1,
        "title": "Aswan to Abu Simbel - Temples of Ramesses II and Nefertari",
        "description": [
          {
            "headline": "Early Morning Pickup",
            "details": "Start your journey with an early morning pickup from your hotel or agreed meeting point in Aswan. Meet your professional tour representative and board a comfortable air-conditioned vehicle for the journey to Abu Simbel",
            "_id": "6a91f290e9ce53c2485ba655"
          },
          {
            "headline": "Journey Through the Nubian Desert",
            "details": "Travel south from Aswan through the dramatic desert landscapes of southern Egypt. During the approximately three-hour journey, your guide will share stories about ancient Nubia, Lake Nasser, the Aswan High Dam, and the historical importance of Abu Simbel",
            "_id": "6a91f290e9ce53c2485ba656"
          },
          {
            "headline": "Arrival at Abu Simbel",
            "details": "Arrive at the Abu Simbel archaeological complex and walk toward the impressive temples. Your guide will introduce the history of the site and explain why Abu Simbel became one of the most important monuments of ancient Egypt.",
            "_id": "6a91f290e9ce53c2485ba657"
          },
          {
            "headline": "Great Temple of Ramesses II",
            "details": "Explore the Great Temple dedicated to Ramesses II and the major gods associated with the temple. Admire the four enormous seated statues of the king on the facade before entering the decorated halls filled with colossal statues, hieroglyphic inscriptions, religious scenes, and historical reliefs.",
            "_id": "6a91f290e9ce53c2485ba658"
          },
          {
            "headline": "Temple of Queen Nefertari",
            "details": "Visit the smaller temple dedicated to Queen Nefertari and the goddess Hathor. Admire the impressive facade featuring monumental statues of Ramesses II and Nefertari and learn about the queen's important position within the royal family and ancient Egyptian religious tradition",
            "_id": "6a91f290e9ce53c2485ba659"
          },
          {
            "headline": "The Incredible Relocation of Abu Simbel",
            "details": "Discover the remarkable modern history of Abu Simbel and how the temples were carefully dismantled and reconstructed on higher ground during the international UNESCO-led campaign to protect them from the rising waters of Lake Nasser after the construction of the Aswan High Dam.",
            "_id": "6a91f290e9ce53c2485ba65a"
          },
          {
            "headline": "Photography and Free Time",
            "details": "Enjoy free time to admire the monumental architecture, surrounding desert landscape, and views toward Lake Nasser. Take memorable photographs from the permitted areas before meeting your guide for the return journey",
            "_id": "6a91f290e9ce53c2485ba65b"
          },
          {
            "headline": "Return to Aswan",
            "details": "Board your comfortable vehicle and begin the journey back to Aswan. Relax during the drive and arrive back at your hotel or selected drop-off point after an unforgettable day exploring Abu Simbe",
            "_id": "6a91f290e9ce53c2485ba65c"
          }
        ],
        "_id": "6a91f290e9ce53c2485ba654"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Aswan",
      "Round-trip transportation from Aswan to Abu Simbel",
      "Air-conditioned private or shared vehicle",
      "Professional tour guide",
      "Visit to the Abu Simbel archaeological complex",
      "Visit to the Great Temple of Ramesses II",
      "Visit to the Small Temple of Queen Nefertari",
      "All transportation taxes and service charges",
      "Entrance tickets to Abu Simbel Temples"
    ],
    "excluded": [
      "Any services not specifically listed under included services"
    ],
    "is_featured": false,
    "tour_type": "popular",
    "sub_type": "excursion",
    "itinerary": [],
    "slug": "abu-simbel-temple"
  },
  {
    "slug": "felucca-nile-river",
    "category": "cultural",
    "city": "Aswan",
    "country": "Egypt",
    "description": "Enjoy a relaxing sail on a traditional wooden felucca along the Nile River in Aswan. Glide past Elephantine Island, the Aga Khan Mausoleum, and the Botanical Garden on Kitchener's Island while your captain navigates the calm waters using only the wind. This peaceful excursion offers some of the best views of Aswan's riverside scenery, granite rock formations, and golden desert hills, making it a perfect way to unwind and take in the beauty of southern Egypt.",
    "destination": "aswan",
    "duration": 1,
    "duration_type": "Hours",
    "excluded": [
      "Any services not specifically listed under included services"
    ],
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950628/kemetica/vkxfh8mdcwgwfjers3fc.jpg",
    "gallery_urls": [
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950668/kemetica/ii9ifsadruots8ltw2hg.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950672/kemetica/zt8bau1tfaamur1n4tzt.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950676/kemetica/v756enqnzzgpbaesxzwe.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950678/kemetica/sq3acmsvws3lgxru5enf.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950683/kemetica/irofejviro2svnqduxbo.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950688/kemetica/alrx60ze7pbvjbpvecsj.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950689/kemetica/pualnfurtmm81zx8olkn.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950707/kemetica/gx7pwivd5rilv9kewjhv.jpg"
    ],
    "highlights": [
      "Traditional sailboat experience on the Nile",
      "Views of Elephantine Island and the Aga Khan Mausoleum",
      "Pass by Kitchener's Island Botanical Garden",
      "Peaceful, wind-powered sailing with a local captain",
      "Golden hour photo opportunities over the river"
    ],
    "included": [
      "Hotel pickup and drop-off in Aswan",
      "Felucca boat ride with experienced captain",
      "All transportation taxes and service charges"
    ],
    "is_featured": false,
    "itinerary": [],
    "max_group_size": 40,
    "rating_score": 0,
    "reviews_count": 0,
    "sub_type": "excursion",
    "tagline": "Sail Aswan's waters the traditional way, aboard a classic Nubian felucca.",
    "title": "Felucca Ride on the Nile River",
    "tour_type": "popular",
    "tours_plan": [
      {
        "day": 1,
        "title": "Sailing the Nile by Felucca",
        "description": [
          {
            "headline": "Meeting Point",
            "details": "Meet your captain at the riverbank in Aswan and board your traditional felucca sailboat.",
            "_id": "6a92b590542029a350dd2063"
          },
          {
            "headline": "Sailing the Nile",
            "details": "Set sail on the calm waters of the Nile, drifting past Elephantine Island and the granite rocks that dot the river.",
            "_id": "6a92b590542029a350dd2064"
          },
          {
            "headline": "Kitchener's Island",
            "details": "Pass by the lush Botanical Garden on Kitchener's Island, admiring the contrast of greenery against the desert backdrop.",
            "_id": "6a92b590542029a350dd2065"
          },
          {
            "headline": "Free Time on Board",
            "details": "Relax on deck, take photos, and enjoy the tranquility of the river as the sun moves across the sky.",
            "_id": "6a92b590542029a350dd2066"
          },
          {
            "headline": "Return to Shore",
            "details": "Sail back to the dock and disembark, concluding your felucca experience.",
            "_id": "6a92b590542029a350dd2067"
          }
        ],
        "_id": "6a92b590542029a350dd2062"
      }
    ]
  },
  {
    "slug": "nubian-village",
    "category": "cultural",
    "city": "Aswan",
    "country": "Egypt",
    "description": "Venture across the Nile to visit a traditional Nubian village near Aswan, known for its brightly painted houses, warm hospitality, and rich cultural heritage. Walk through narrow lanes lined with vibrant blue, yellow, and orange homes, meet local families, and learn about Nubian customs, music, and history. Depending on the season, you may also have the chance to interact with friendly crocodiles kept by locals, sample traditional Nubian tea, and browse handmade crafts in the village market.",
    "destination": "aswan",
    "duration": 3,
    "duration_type": "Hours",
    "excluded": [
      "Tipping",
      "Any services not specifically listed under included services"
    ],
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787950989/kemetica/ttudsansraqmhkrdfqgw.jpg",
    "gallery_urls": [
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951017/kemetica/dg3ztpqdkilvqrevca5l.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951018/kemetica/jimgbu1fyxgzp2jshsuk.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951021/kemetica/yss4zptakucpjr4j1ypx.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951022/kemetica/trviu0j9y4uhhdrxa18c.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951035/kemetica/g8glcw8thrivqnndzm97.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951040/kemetica/gvuwtapjofkvw3ppy9wt.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951063/kemetica/r0x9ivi2zehddee2lkzj.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951090/kemetica/vdso4dscjlvaxrqnqrsx.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787996976/kemetica/p1skn8eszkt2dmaypbkx.jpg"
    ],
    "highlights": [
      "Colorful traditional Nubian houses",
      "Boat ride across the Nile to the village",
      "Meet local Nubian families",
      "Traditional tea and hospitality",
      "Browse handmade Nubian crafts and souvenirs"
    ],
    "included": [
      "Hotel pickup and drop-off in Aswan",
      "Boat transfer to the Nubian village",
      "Local guide",
      "All transportation taxes and service charges"
    ],
    "is_featured": false,
    "itinerary": [],
    "max_group_size": 40,
    "rating_score": 0,
    "reviews_count": 0,
    "sub_type": "excursion",
    "tagline": "Step into the colorful world of Nubian culture and hospitality.",
    "title": "Nubian Village Tour",
    "tour_type": "popular",
    "tours_plan": [
      {
        "day": 1,
        "title": "Discovering a Nubian Village",
        "description": [
          {
            "headline": "Boat Crossing",
            "details": "Board a traditional boat and cross the Nile toward the Nubian village on the West Bank.",
            "_id": "6a92ab3aa15d059af6d70307"
          },
          {
            "headline": "Arrival in the Village",
            "details": "Step ashore into a village of vividly painted houses and welcoming Nubian residents.",
            "_id": "6a92ab3aa15d059af6d70308"
          },
          {
            "headline": "Cultural Walk",
            "details": "Stroll through the village lanes, learning about Nubian history, language, and traditions from your guide.",
            "_id": "6a92ab3aa15d059af6d70309"
          },
          {
            "headline": "Local Hospitality",
            "details": "Visit a Nubian home for traditional tea and conversation with a local family.",
            "_id": "6a92ab3aa15d059af6d7030a"
          },
          {
            "headline": "Market and Free Time",
            "details": "Browse the village market for handmade crafts, spices, and souvenirs before returning to the boat.",
            "_id": "6a92ab3aa15d059af6d7030b"
          },
          {
            "headline": "Return to Aswan",
            "details": "Sail back across the Nile and transfer back to your hotel.",
            "_id": "6a92ab3aa15d059af6d7030c"
          }
        ],
        "_id": "6a92ab3aa15d059af6d70306"
      }
    ]
  },
  {
    "slug": "philae-high-dam-unfinished-obelisk",
    "category": "historical",
    "city": "Aswan",
    "country": "Egypt",
    "description": "Explore three of Aswan's most iconic landmarks in one comprehensive tour. Begin at the Philae Temple, dedicated to the goddess Isis, relocated to Agilkia Island to save it from flooding after the construction of the Aswan Dams. Continue to the Aswan High Dam, one of the largest embankment dams in the world, and learn about its role in controlling the Nile's floods and generating hydroelectric power. Finally, visit the Unfinished Obelisk, still attached to its bedrock in the ancient granite quarries, offering fascinating insight into the stone-cutting techniques of the ancient Egyptians.",
    "destination": "aswan",
    "duration": 1,
    "duration_type": "Days",
    "excluded": [
      "Food and drinks",
      "Tipping",
      "Any services not specifically listed under included services"
    ],
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951205/kemetica/mhtaq8ejiewld9htsyeu.jpg",
    "gallery_urls": [
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951240/kemetica/d4qpieapwsbklhsj5csa.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951264/kemetica/vucl7l3hz3rslrirjtcz.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951290/kemetica/rctrs4p1p18qo1cab2mn.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951304/kemetica/fw8jjifmgjvukjlemln2.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951321/kemetica/bivofmibqyujal1wmdox.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951406/kemetica/vz2lbkkxaeueg0xptk6t.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951410/kemetica/woqpelikhw01su6sneto.jpg",
      "https://res.cloudinary.com/e7b9mwev/image/upload/v1787951492/kemetica/x2x7uvzhoaogejjscdz1.jpg"
    ],
    "highlights": [
      "Visit the Temple of Isis at Philae",
      "See the engineering marvel of the Aswan High Dam",
      "Discover the Unfinished Obelisk in the ancient quarries",
      "Learn about ancient and modern Egyptian history side by side",
      "Motorboat ride to Agilkia Island"
    ],
    "included": [
      "Hotel pickup and drop-off in Aswan",
      "Private air-conditioned vehicle",
      "Professional Egyptologist guide",
      "Entrance fees to Philae Temple, High Dam viewpoint, and Unfinished Obelisk",
      "Motorboat ride to Agilkia Island",
      "All transportation taxes and service charges"
    ],
    "is_featured": false,
    "itinerary": [],
    "max_group_size": 40,
    "rating_score": 0,
    "reviews_count": 0,
    "sub_type": "transfer",
    "tagline": "A half-day journey through Aswan's ancient temples and modern engineering marvels.",
    "title": "Philae Temple, High Dam & Unfinished Obelisk",
    "tour_type": "popular",
    "tours_plan": [
      {
        "day": 1,
        "title": "Philae Temple, High Dam & Unfinished Obelisk",
        "description": [
          {
            "headline": "Morning Pickup",
            "details": "Meet your guide and depart from your hotel in Aswan in a comfortable air-conditioned vehicle.",
            "_id": "6a9200b6efa4f34fa6b0cf49"
          },
          {
            "headline": "Aswan High Dam",
            "details": "Visit the Aswan High Dam and learn about its construction, its role in controlling the Nile's annual floods, and its impact on modern Egypt.",
            "_id": "6a9200b6efa4f34fa6b0cf4a"
          },
          {
            "headline": "Unfinished Obelisk",
            "details": "Explore the ancient granite quarries and see the Unfinished Obelisk, still partly carved into the bedrock, and learn how ancient Egyptians cut and transported massive stones.",
            "_id": "6a9200b6efa4f34fa6b0cf4b"
          },
          {
            "headline": "Philae Temple",
            "details": "Take a short motorboat ride to Agilkia Island to explore the Temple of Isis, admiring its reliefs, courtyards, and the story of its relocation to save it from the rising waters of Lake Nasser.",
            "_id": "6a9200b6efa4f34fa6b0cf4c"
          },
          {
            "headline": "Return to Aswan",
            "details": "Board your vehicle for the return journey to your hotel, concluding your tour of Aswan's ancient and modern wonders.",
            "_id": "6a9200b6efa4f34fa6b0cf4d"
          }
        ],
        "_id": "6a9200b6efa4f34fa6b0cf48"
      }
    ]
  },
  {
    "slug": "nile-cruise-4-days-3-nights-aswan-luxor",
    "category": "luxury-nile",
    "city": "Aswan",
    "country": "Egypt",
    "description": "Experience the magic of the Nile on a 4-day, 3-night cruise from Aswan to Luxor. Visit the High Dam, Philae Temple, and the Unfinished Obelisk in Aswan before sailing north, stopping at the temples of Kom Ombo and Edfu along the way. Arrive in Luxor to explore the Valley of the Kings, Karnak Temple, and Luxor Temple. This classic itinerary combines relaxed river travel with some of Egypt's greatest ancient monuments, all while enjoying full-board accommodation on a comfortable Nile cruise ship.",
    "destination": "aswan",
    "duration": 4,
    "duration_type": "Days",
    "excluded": [
      "Any services not specifically listed under included services"
    ],
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787953634/kemetica/zbycrfbtu2jiy2gw2hth.jpg",
    "gallery_urls": [],
    "highlights": [
      "Visit Philae Temple and the Aswan High Dam",
      "Explore the Temple of Kom Ombo on the riverbank",
      "Discover the well-preserved Temple of Edfu",
      "Full board accommodation aboard a Nile cruise ship",
      "Explore the Valley of the Kings and Karnak Temple in Luxor"
    ],
    "included": [
      "3 nights accommodation aboard a Nile cruise ship, full board",
      "Professional Egyptologist guide",
      "All transfers by private air-conditioned vehicle",
      "Entrance fees to all mentioned sites",
      "All transportation taxes and service charges"
    ],
    "is_featured": true,
    "itinerary": [],
    "max_group_size": 50,
    "rating_score": 0,
    "reviews_count": 0,
    "sub_type": "excursion",
    "tagline": "Sail the Nile from Aswan to Luxor aboard a classic cruise ship.",
    "title": "Nile Cruise 4 Days 3 Nights Aswan to Luxor",
    "tour_type": "popular",
    "tours_plan": [
      {
        "day": 1,
        "title": "Embarkation in Aswan & City Sightseeing",
        "description": [
          {
            "headline": "Arrival & Embarkation",
            "details": "Arrive in Aswan and check in to your Nile cruise ship cabin.",
            "_id": "6a92024befa4f34fa6b0d2a6"
          },
          {
            "headline": "Aswan High Dam",
            "details": "Visit the Aswan High Dam and learn about its role in controlling the Nile's floods.",
            "_id": "6a92024befa4f34fa6b0d2a7"
          },
          {
            "headline": "Philae Temple",
            "details": "Take a short boat ride to Agilkia Island to explore the Temple of Isis.",
            "_id": "6a92024befa4f34fa6b0d2a8"
          },
          {
            "headline": "Unfinished Obelisk",
            "details": "Visit the ancient granite quarries and see the famous Unfinished Obelisk.",
            "_id": "6a92024befa4f34fa6b0d2a9"
          },
          {
            "headline": "Overnight",
            "details": "Overnight aboard the cruise ship in Aswan.",
            "_id": "6a92024befa4f34fa6b0d2aa"
          }
        ],
        "_id": "6a92024befa4f34fa6b0d2a5"
      },
      {
        "day": 2,
        "title": "Sail to Kom Ombo & Edfu",
        "description": [
          {
            "headline": "Sail to Kom Ombo",
            "details": "Cruise north along the Nile toward Kom Ombo, enjoying the passing riverside scenery.",
            "_id": "6a92024befa4f34fa6b0d2ac"
          },
          {
            "headline": "Kom Ombo Temple",
            "details": "Visit the unique double temple dedicated to the crocodile god Sobek and the falcon god Horoeris.",
            "_id": "6a92024befa4f34fa6b0d2ad"
          },
          {
            "headline": "Sail to Edfu",
            "details": "Continue sailing overnight toward Edfu.",
            "_id": "6a92024befa4f34fa6b0d2ae"
          },
          {
            "headline": "Overnight",
            "details": "Overnight aboard the cruise ship en route to Edfu.",
            "_id": "6a92024befa4f34fa6b0d2af"
          }
        ],
        "_id": "6a92024befa4f34fa6b0d2ab"
      },
      {
        "day": 3,
        "title": "Edfu Temple & Sail to Luxor",
        "description": [
          {
            "headline": "Edfu Temple",
            "details": "Visit the Temple of Horus at Edfu, one of the best-preserved temples in Egypt, traveling there by horse-drawn carriage.",
            "_id": "6a92024befa4f34fa6b0d2b1"
          },
          {
            "headline": "Sail to Luxor",
            "details": "Continue cruising north toward Luxor, passing scenic villages and farmland along the riverbanks.",
            "_id": "6a92024befa4f34fa6b0d2b2"
          },
          {
            "headline": "Overnight",
            "details": "Arrive in Luxor and stay overnight aboard the ship.",
            "_id": "6a92024befa4f34fa6b0d2b3"
          }
        ],
        "_id": "6a92024befa4f34fa6b0d2b0"
      },
      {
        "day": 4,
        "title": "Luxor Sightseeing & Disembarkation",
        "description": [
          {
            "headline": "Valley of the Kings",
            "details": "Explore the tombs of the pharaohs carved into the West Bank mountains.",
            "_id": "6a92024befa4f34fa6b0d2b5"
          },
          {
            "headline": "Karnak & Luxor Temples",
            "details": "Visit the vast Karnak Temple complex and the elegant Luxor Temple on the East Bank.",
            "_id": "6a92024befa4f34fa6b0d2b6"
          },
          {
            "headline": "Disembarkation",
            "details": "Check out from the cruise ship and transfer to your onward destination, concluding your Nile cruise.",
            "_id": "6a92024befa4f34fa6b0d2b7"
          }
        ],
        "_id": "6a92024befa4f34fa6b0d2b4"
      }
    ]
  },
  {
    "slug": "nile-cruise-5-days-4-nights-aswan-luxor",
    "category": "luxury-nile",
    "city": "Aswan",
    "country": "Egypt",
    "description": "Enjoy a more relaxed pace on this 5-day, 4-night Nile cruise from Aswan to Luxor. In addition to the classic stops at Philae Temple, the High Dam, Kom Ombo, and Edfu, this extended itinerary allows extra time for leisure aboard the ship and deeper exploration of Luxor's East and West Banks, including the Valley of the Kings, Hatshepsut Temple, the Colossi of Memnon, Karnak Temple, and Luxor Temple. A perfect choice for travelers who want to soak in the Nile's scenery without rushing between sites.",
    "destination": "aswan",
    "duration": 5,
    "duration_type": "Days",
    "excluded": [
      "Any services not specifically listed under included services"
    ],
    "featured_image_url": "https://res.cloudinary.com/e7b9mwev/image/upload/v1787953818/kemetica/clwuzclgheghom3ahnri.jpg",
    "gallery_urls": [],
    "highlights": [
      "Visit Philae Temple and the Aswan High Dam",
      "Explore Kom Ombo and Edfu temples",
      "Extra leisure time aboard the cruise ship",
      "Full day of sightseeing on Luxor's West Bank",
      "Visit Karnak and Luxor Temples on the East Bank"
    ],
    "included": [
      "4 nights accommodation aboard a Nile cruise ship, full board",
      "Professional Egyptologist guide",
      "All transfers by private air-conditioned vehicle",
      "Entrance fees to all mentioned sites",
      "All transportation taxes and service charges"
    ],
    "is_featured": true,
    "itinerary": [],
    "max_group_size": 30,
    "rating_score": 0,
    "reviews_count": 0,
    "sub_type": "excursion",
    "tagline": "An extended Nile journey from Aswan to Luxor with more time to explore.",
    "title": "Nile Cruise 5 Days 4 Nights Aswan to Luxor",
    "tour_type": "popular",
    "tours_plan": [
      {
        "day": 1,
        "title": "Embarkation in Aswan & City Sightseeing",
        "description": [
          {
            "headline": "Arrival & Embarkation",
            "details": "Arrive in Aswan and check in to your Nile cruise ship cabin.",
            "_id": "6a9202a2efa4f34fa6b0d3a4"
          },
          {
            "headline": "Aswan High Dam",
            "details": "Visit the Aswan High Dam and learn about its engineering significance.",
            "_id": "6a9202a2efa4f34fa6b0d3a5"
          },
          {
            "headline": "Philae Temple",
            "details": "Take a boat ride to Agilkia Island to explore the Temple of Isis.",
            "_id": "6a9202a2efa4f34fa6b0d3a6"
          },
          {
            "headline": "Unfinished Obelisk",
            "details": "Visit the ancient granite quarries and the Unfinished Obelisk.",
            "_id": "6a9202a2efa4f34fa6b0d3a7"
          },
          {
            "headline": "Overnight",
            "details": "Overnight aboard the cruise ship in Aswan.",
            "_id": "6a9202a2efa4f34fa6b0d3a8"
          }
        ],
        "_id": "6a9202a2efa4f34fa6b0d3a3"
      },
      {
        "day": 2,
        "title": "Leisure Morning & Sail to Kom Ombo",
        "description": [
          {
            "headline": "Leisure Time",
            "details": "Enjoy a relaxed morning aboard the ship as it remains docked in Aswan, with optional access to onboard facilities.",
            "_id": "6a9202a2efa4f34fa6b0d3aa"
          },
          {
            "headline": "Sail to Kom Ombo",
            "details": "Depart Aswan and cruise toward Kom Ombo in the afternoon.",
            "_id": "6a9202a2efa4f34fa6b0d3ab"
          },
          {
            "headline": "Kom Ombo Temple",
            "details": "Visit the double temple dedicated to Sobek and Horoeris.",
            "_id": "6a9202a2efa4f34fa6b0d3ac"
          },
          {
            "headline": "Overnight",
            "details": "Overnight aboard the cruise ship in Kom Ombo or en route to Edfu.",
            "_id": "6a9202a2efa4f34fa6b0d3ad"
          }
        ],
        "_id": "6a9202a2efa4f34fa6b0d3a9"
      },
      {
        "day": 3,
        "title": "Edfu Temple & Sail to Luxor",
        "description": [
          {
            "headline": "Edfu Temple",
            "details": "Visit the Temple of Horus at Edfu by horse-drawn carriage from the dock.",
            "_id": "6a9202a2efa4f34fa6b0d3af"
          },
          {
            "headline": "Sail to Luxor",
            "details": "Continue cruising north toward Luxor, enjoying the passing scenery of rural Upper Egypt.",
            "_id": "6a9202a2efa4f34fa6b0d3b0"
          },
          {
            "headline": "Overnight",
            "details": "Arrive in Luxor and stay overnight aboard the ship.",
            "_id": "6a9202a2efa4f34fa6b0d3b1"
          }
        ],
        "_id": "6a9202a2efa4f34fa6b0d3ae"
      },
      {
        "day": 4,
        "title": "Luxor West Bank",
        "description": [
          {
            "headline": "Valley of the Kings",
            "details": "Explore the underground tombs of New Kingdom pharaohs.",
            "_id": "6a9202a2efa4f34fa6b0d3b3"
          },
          {
            "headline": "Temple of Hatshepsut",
            "details": "Visit the striking mortuary temple built into the cliffs at Deir el-Bahari.",
            "_id": "6a9202a2efa4f34fa6b0d3b4"
          },
          {
            "headline": "Colossi of Memnon",
            "details": "Stop at the two massive stone statues guarding the ancient mortuary temple of Amenhotep III.",
            "_id": "6a9202a2efa4f34fa6b0d3b5"
          },
          {
            "headline": "Overnight",
            "details": "Overnight aboard the cruise ship in Luxor.",
            "_id": "6a9202a2efa4f34fa6b0d3b6"
          }
        ],
        "_id": "6a9202a2efa4f34fa6b0d3b2"
      },
      {
        "day": 5,
        "title": "Luxor East Bank & Disembarkation",
        "description": [
          {
            "headline": "Karnak Temple",
            "details": "Explore the vast Karnak Temple complex, one of the largest religious sites ever built.",
            "_id": "6a9202a2efa4f34fa6b0d3b8"
          },
          {
            "headline": "Luxor Temple",
            "details": "Visit the elegant Luxor Temple, especially striking with its avenue of sphinxes.",
            "_id": "6a9202a2efa4f34fa6b0d3b9"
          },
          {
            "headline": "Disembarkation",
            "details": "Check out from the cruise ship and transfer to your onward destination.",
            "_id": "6a9202a2efa4f34fa6b0d3ba"
          }
        ],
        "_id": "6a9202a2efa4f34fa6b0d3b7"
      }
    ]
  }
];

const seedDB = async () => {
  try {
    const DB = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kemetica';
    await mongoose.connect(DB);
    console.log('DB connection successful!');

    // NOTE: No deleteMany() calls here anymore — this script is additive only.
    // Existing users, tours, reviews, and inquiries are left untouched.

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

    // Upsert tours by slug so re-running this script is safe and never
    // duplicates or deletes existing tours.
    let insertedCount = 0;
    let updatedCount = 0;
    for (const tour of toursWithCategories) {
      const result = await Tour.findOneAndUpdate(
        { slug: tour.slug },
        { $set: tour },
        { upsert: true, new: true, rawResult: true }
      );
      if (result.lastErrorObject?.updatedExisting) {
        updatedCount++;
      } else {
        insertedCount++;
      }
    }
    console.log(`Tours: ${insertedCount} inserted, ${updatedCount} updated (existing tours preserved)`);

    // Only create the admin user if it doesn't already exist, to avoid
    // duplicate-key errors on re-run since users are no longer wiped.
    const existingAdmin = await User.findOne({ email: users[0].email });
    if (!existingAdmin) {
      const createdUsers = await User.create(users);
      console.log(`Seeded ${createdUsers.length} users`);
    } else {
      console.log('Admin user already exists, skipping');
    }

    console.log('Seed data processed successfully! (no existing data was deleted)');
    process.exit(0);
  } catch (err) {
    console.error('Error with seed data:', err);
    process.exit(1);
  }
};

seedDB();