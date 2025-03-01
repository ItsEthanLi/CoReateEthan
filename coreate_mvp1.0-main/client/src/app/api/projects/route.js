import { auth } from '@clerk/nextjs';
import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import User from '../../../models/User';

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const body = await request.json();
    const { title, description } = body;

    // Create project
    const project = await Project.create({
      title,
      description,
      creator: userId
    });

    return Response.json({ project });
  } catch (error) {
    console.error('Project creation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Get user's projects
    const projects = await Project.find({ creator: userId });
    return Response.json({ projects });
  } catch (error) {
    console.error('Project fetch error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 