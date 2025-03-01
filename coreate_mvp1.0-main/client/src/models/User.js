import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true }, // To link with Clerk auth
  name: String,
  email: String,
  profileImage: String,
  role: {
    type: String,
    enum: ['mentor', 'student'],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  // Add other user fields as needed
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 