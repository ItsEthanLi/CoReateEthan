import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Mentor from '../../../models/Mentor';

export async function POST(req) {
  try {
    // Log the start of the request
    console.log('Starting mentor creation...');

    const { userId } = getAuth(req);
    console.log('Auth check - userId:', userId); // Debug log

    if (!userId) {
      console.log('No userId found in auth');
      return NextResponse.json({ error: 'Unauthorized - No user ID' }, { status: 401 });
    }

    // Try to connect to DB
    console.log('Connecting to DB...');
    await connectDB();
    console.log('DB Connection successful');

    // Parse the request body
    const data = await req.json();
    console.log('About to create mentor with data:', data);

    // Create the mentor document
    const mentor = await Mentor.create({
      clerkId: userId,
      ...data
    });
    console.log('Created mentor:', mentor);

    // Verify the mentor was created
    const savedMentor = await Mentor.findById(mentor._id);
    console.log('Saved mentor:', savedMentor);

    return NextResponse.json({ 
      success: true, 
      mentor: savedMentor
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 