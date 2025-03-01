import connectDB from '../../../lib/mongodb';
import mongoose from 'mongoose';

// Define a schema
const ExampleSchema = new mongoose.Schema({
  name: String,
  email: String,
  // add more fields as needed
});

// Create or get the model
const Example = mongoose.models.Example || mongoose.model('Example', ExampleSchema);

export async function GET() {
  await connectDB();
  
  try {
    const examples = await Example.find({});
    return Response.json({ examples });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 