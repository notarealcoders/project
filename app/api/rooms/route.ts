import { NextResponse } from 'next/server';
import { RoomService } from '@/lib/mongodb/services/roomService';

export async function POST() {
  try {
    const room = await RoomService.create();
    return NextResponse.json({ roomId: room.roomId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create room:', error);
    return NextResponse.json(
      { error: 'Failed to create room', details: (error as Error).message },
      { status: 500 }
    );
  }
}