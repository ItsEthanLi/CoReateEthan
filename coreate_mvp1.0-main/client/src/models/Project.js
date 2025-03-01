import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  creator: { type: String, ref: 'User' }, // Reference to user's clerkId
  collaborators: [{ type: String, ref: 'User' }],
  status: { 
    type: String, 
    enum: ['planning', 'in-progress', 'completed'],
    default: 'planning'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 