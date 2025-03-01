import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { auth } from '@clerk/nextjs';

export async function GET() {
  try {
    const { userId } = auth();
    await connectDB();
    
    // Create or update user
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { clerkId: userId },
      { upsert: true, new: true }
    );
    
    return Response.json({ 
      status: 'Connected to coreateDB successfully!',
      user 
    });
  } catch (error) {
    console.error('Connection error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 