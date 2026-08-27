import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  slug:      { type: String, required: true, unique: true },  // e.g. 'giza'
  name:      { type: String, required: true },                // e.g. 'Giza'
  iconUrl:   { type: String, required: true },                // e.g. '/icons/giza-icon.jpg'
  sortOrder: { type: Number, default: 0 },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Destination', DestinationSchema);
