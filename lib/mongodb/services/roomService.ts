import Room from '../models/Room';
import connectDB from '../connection';
import { generateRoomId } from '@/lib/utils/roomUtils';

export class RoomService {
  static async create() {
    try {
      await connectDB();
      const roomId = generateRoomId();
      
      const room = await Room.create({
        roomId,
        language: 'javascript',
        code: '// Start coding here',
      });

      if (!room) {
        throw new Error('Room creation failed');
      }

      return room;
    } catch (error) {
      console.error('Error in RoomService.create:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to create room: ${error.message}`);
      }
      throw new Error('Failed to create room: Unknown error');
    }
  }

  static async findByRoomId(roomId: string) {
    try {
      await connectDB();
      const room = await Room.findOne({ roomId });
      
      if (!room) {
        throw new Error('Room not found');
      }
      
      return room;
    } catch (error) {
      console.error('Error in RoomService.findByRoomId:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to find room: ${error.message}`);
      }
      throw new Error('Failed to find room: Unknown error');
    }
  }

  static async update(roomId: string, data: Partial<{ language: string; code: string }>) {
    try {
      await connectDB();
      const room = await Room.findOneAndUpdate(
        { roomId },
        { $set: data },
        { new: true }
      );

      if (!room) {
        throw new Error('Room not found');
      }

      return room;
    } catch (error) {
      console.error('Error in RoomService.update:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to update room: ${error.message}`);
      }
      throw new Error('Failed to update room: Unknown error');
    }
  }
}