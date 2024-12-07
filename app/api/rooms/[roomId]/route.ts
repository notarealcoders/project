import { NextResponse } from "next/server";
import { RoomService } from "@/lib/mongodb/services/roomService";
import { isValidRoomId } from "@/lib/utils/roomUtils";

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    if (!isValidRoomId(params.roomId)) {
      return NextResponse.json(
        { error: "Invalid room ID format" },
        { status: 400 }
      );
    }

    const room = await RoomService.findByRoomId(params.roomId);

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/rooms/[roomId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    if (!isValidRoomId(params.roomId)) {
      return NextResponse.json(
        { error: "Invalid room ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const room = await RoomService.update(params.roomId, body);

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/rooms/[roomId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}