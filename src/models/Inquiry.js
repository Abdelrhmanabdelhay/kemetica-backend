import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  fullName:        { type: String, required: true },
  email:           { type: String, required: true },
  phone:           { type: String },
  expeditionType: {
    type: String,
    enum: ['luxury-nile', 'historical', 'desert-safari', 'diving', 'custom'],
    default: 'custom',
  },
  estimatedGuests: { type: Number, default: 2 },
  travelDates:     { type: String },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.model('Inquiry', InquirySchema);
