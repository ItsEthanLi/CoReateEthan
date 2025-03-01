import { auth } from '@clerk/nextjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { role } = await request.json();

    // Update or create user with role
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { 
        clerkId: userId,
        role
      },
      { upsert: true, new: true }
    );

    return Response.json({ user });
  } catch (error) {
    console.error('Role update error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 