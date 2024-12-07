import Room from "../models/Room";
import connectDB from "../connection";
import { generateRoomId } from "@/lib/utils/roomUtils";
import { RoomData } from "../types";

export class RoomService {
  static async create(): Promise<RoomData> {
    await connectDB();

    try {
      const roomId = generateRoomId();
      const room = await Room.create({
        roomId,
        language: "javascript",
        code: "// Start coding here",
      });

      return room.toObject();
    } catch (error) {
      console.error("Error in RoomService.create:", error);
      throw error;
    }
  }

  static async findByRoomId(roomId: string): Promise<RoomData | null> {
    await connectDB();

    try {
      const room = await Room.findOne({ roomId });
      return room ? room.toObject() : null;
    } catch (error) {
      console.error("Error in RoomService.findByRoomId:", error);
      throw error;
    }
  }

  static async update(
    roomId: string,
    data: Partial<Pick<RoomData, "language" | "code">>
  ): Promise<RoomData | null> {
    await connectDB();

    try {
      const room = await Room.findOneAndUpdate(
        { roomId },
        { $set: data },
        { new: true }
      );

      return room ? room.toObject() : null;
    } catch (error) {
      console.error("Error in RoomService.update:", error);
      throw error;
    }
  }
}
