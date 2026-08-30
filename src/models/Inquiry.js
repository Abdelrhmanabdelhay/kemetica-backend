import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  // Personal info
  fullName:        { type: String, required: true },
  email:           { type: String, required: true },
  phoneCountryCode:{ type: String, default: '+1' },
  phone:           { type: String },
  nationality:     { type: String },

  // Tour context (optional — populated when submitted from a tour page)
  tourTitle:       { type: String },
  tourSlug:        { type: String },

  // Travel details
  travelDateFrom:  { type: String },   // ISO date string e.g. "2026-09-15"
  travelDateTo:    { type: String },
  adults:          { type: Number, default: 1, min: 1 },
  children:        { type: Number, default: 0, min: 0 },

  // Message
  message:         { type: String },

  // Admin status
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.model('Inquiry', InquirySchema);

