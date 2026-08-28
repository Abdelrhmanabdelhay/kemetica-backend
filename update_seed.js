import fs from 'fs';

let content = fs.readFileSync('seed.js', 'utf8');

const galleryStr = `"gallery_urls": [
      "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80"
    ]`;

const extraStr = `"included": [
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
    ]`;

// Replace gallery_urls
content = content.replace(/"gallery_urls": \[\],?/g, galleryStr + ',');

// Instead of matching itinerary complexly, since some are empty and some are not:
// Empty: "itinerary": []
// Populated: "itinerary": [\n ... \n    ]
content = content.replace(/"itinerary": \[\s*\]/g, extraStr);

// Populated itinerary replacement (e.g. for Giza and Cairo Highlights, Luxor to Aswan Nile Cruise)
// They span multiple lines. We use a non-greedy match.
content = content.replace(/"itinerary": \[\s*\{[\s\S]*?\}\s*\]/g, extraStr);

fs.writeFileSync('seed.js', content);
console.log('Done replacement');
