import { NextResponse } from 'next/server';
import Room from '@/lib/mongodb/models/Room';
import connectDB from '@/lib/mongodb/connection';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectDB();
    const room = await Room.findOne({ roomId: params.roomId });
    
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const room = await Room.findOneAndUpdate(
      { roomId: params.roomId },
      { $set: body },
      { new: true }
    );

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}