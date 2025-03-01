import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  skills: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema); 