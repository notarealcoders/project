import Room from '../models/Room';
import connectDB from '../connection';
import { generateRoomId } from '@/lib/utils/roomUtils';
import { RoomData } from '../types';

export class RoomService {
  static async create(): Promise<RoomData> {
    try {
      await connectDB();
      
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          const roomId = generateRoomId();
          const existingRoom = await Room.findOne({ roomId });
          
          if (!existingRoom) {
            const room = await Room.create({
              roomId,
              language: 'javascript',
              code: '// Start coding here',
            });

            return room.toObject();
          }

          attempts++;
        } catch (error) {
          console.error('Error creating room:', error);
          attempts++;
          if (attempts === maxAttempts) {
            throw new Error('Failed to create room after multiple attempts');
          }
        }
      }

      throw new Error('Failed to generate unique room ID');
    } catch (error) {
      console.error('Error in RoomService.create:', error);
      throw error;
    }
  }

  static async findByRoomId(roomId: string): Promise<RoomData | null> {
    try {
      await connectDB();
      const room = await Room.findOne({ roomId });
      return room ? room.toObject() : null;
    } catch (error) {
      console.error('Error in RoomService.findByRoomId:', error);
      throw error;
    }
  }

  static async update(
    roomId: string, 
    data: Partial<Pick<RoomData, 'language' | 'code'>>
  ): Promise<RoomData | null> {
    try {
      await connectDB();
      const room = await Room.findOneAndUpdate(
        { roomId },
        { $set: data },
        { new: true }
      );
      
      return room ? room.toObject() : null;
    } catch (error) {
      console.error('Error in RoomService.update:', error);
      throw error;
    }
  }
}