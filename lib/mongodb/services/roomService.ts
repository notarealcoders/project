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

      return room;
    } catch (error) {
      console.error('Error in RoomService.create:', error);
      throw new Error('Failed to create room');
    }
  }

  static async findByRoomId(roomId: string) {
    try {
      await connectDB();
      return await Room.findOne({ roomId });
    } catch (error) {
      console.error('Error in RoomService.findByRoomId:', error);
      throw new Error('Failed to find room');
    }
  }

  static async update(roomId: string, data: Partial<{ language: string; code: string }>) {
    try {
      await connectDB();
      return await Room.findOneAndUpdate(
        { roomId },
        { $set: data },
        { new: true }
      );
    } catch (error) {
      console.error('Error in RoomService.update:', error);
      throw new Error('Failed to update room');
    }
  }
}