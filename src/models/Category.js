import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  display_order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

CategorySchema.index({ is_active: 1 });
CategorySchema.index({ display_order: 1 });

export default mongoose.model('Category', CategorySchema);
