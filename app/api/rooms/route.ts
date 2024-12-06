import { NextResponse } from 'next/server';
import { generateRoomId } from '@/lib/utils/roomUtils';
import Room from '@/lib/mongodb/models/Room';
import connectDB from '@/lib/mongodb/connection';

export async function POST(request: Request) {
  try {
    await connectDB();
    const roomId = generateRoomId();
    
    const room = await Room.create({
      roomId,
      language: 'javascript',
      code: '// Start coding here',
    });

    return NextResponse.json({ roomId: room.roomId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create room:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}