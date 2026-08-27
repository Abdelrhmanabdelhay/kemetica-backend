import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  fullName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, select: false },
  avatarUrl: { type: String },
  role: {
    type: String,
    enum: ['customer', 'guide', 'admin'],
    default: 'customer',
  },
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.correctPassword = function (candidate, hashed) {
  return bcrypt.compare(candidate, hashed);
};

export default mongoose.model('User', UserSchema);
