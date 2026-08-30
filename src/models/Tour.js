import mongoose from 'mongoose';

const ItineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
  meals: [{ type: String }],   // e.g. ['Breakfast', 'Lunch', 'Dinner']
});

const ToursPlanDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: [{
    headline: { type: String, required: true },
    details: { type: String, required: true }
  }]
});

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  destination: {
    type: String,
    required: true,
    enum: ['giza', 'luxor', 'aswan'],
  },
  duration: { type: Number, required: true },
  duration_type: { type: String, enum: ['Days', 'Hours'], default: 'Days' },
  rating_score: { type: Number, default: 0, min: 0, max: 5 },
  reviews_count: { type: Number, default: 0 },
  max_group_size: { type: Number, required: true },
  featured_image_url: { type: String, required: true },
  gallery_urls: [{ type: String }],
  highlights: [{ type: String }],
  city: { type: String, required: true },
  country: { type: String, required: true, default: 'Egypt' },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  itinerary: [ItineraryDaySchema],
  tours_plan: [ToursPlanDaySchema],
  included: [{ type: String }],
  excluded: [{ type: String }],
  is_featured: { type: Boolean, default: false },
  badge_label: { type: String },
  // 'special' = cover/hero image only per destination; not shown in tour listings
  tour_type: {
    type: String,
    enum: ['special', 'popular', 'new', 'exclusive', 'standard'],
    default: 'standard',
  },
  // sub_type = the browsable category per destination (gold, cruise, transfer)
  sub_type: {
    type: String,
    enum: ['gold', 'cruise', 'transfer', 'standard'],
    default: 'standard',
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

TourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});


TourSchema.pre('validate', function() {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
});

TourSchema.index({ category: 1, is_featured: 1 });
TourSchema.index({ destination: 1 });
TourSchema.index({ destination: 1, sub_type: 1 });
TourSchema.index({ title: 'text', tagline: 'text', description: 'text' });

export default mongoose.model('Tour', TourSchema);

