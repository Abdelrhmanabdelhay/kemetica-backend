import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  tour:         { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  author:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName:   { type: String, required: true },
  authorAvatar: { type: String },
  rating:       { type: Number, required: true, min: 1, max: 5 },
  comment:      { type: String, required: true },
}, { timestamps: true });

ReviewSchema.post('save', async function () {
  const stats = await mongoose.model('Review').aggregate([
    { $match: { tour: this.tour } },
    { $group: { _id: '$tour', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await mongoose.model('Tour').findByIdAndUpdate(this.tour, {
      rating_score:  Math.round(stats[0].avgRating * 100) / 100,
      reviews_count: stats[0].count,
    });
  }
});

export default mongoose.model('Review', ReviewSchema);
