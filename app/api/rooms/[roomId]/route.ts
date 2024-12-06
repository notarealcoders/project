import { NextResponse } from 'next/server';
import { RoomService } from '@/lib/mongodb/services/roomService';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const room = await RoomService.findByRoomId(params.roomId);
    
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const body = await request.json();
    const room = await RoomService.update(params.roomId, body);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}