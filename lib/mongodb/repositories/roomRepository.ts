import { Model } from 'mongoose';
import Room from '../models/Room';
import { RoomData } from '../types';
import { dbConnection } from '../core/connection';
import { DatabaseError, RoomError } from '../core/errors';

export class RoomRepository {
  private model: Model<RoomData>;

  constructor() {
    this.model = Room;
  }

  async create(data: Partial<RoomData>): Promise<RoomData> {
    try {
      await dbConnection.connect();
      console.log('Creating room with data:', JSON.stringify(data));
      
      const room = await this.model.create(data);
      console.log('Room created successfully:', room.roomId);
      
      return room.toObject();
    } catch (error) {
      console.error('Error in RoomRepository.create:', error);
      throw new DatabaseError(
        'Failed to create room',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async findByRoomId(roomId: string): Promise<RoomData | null> {
    try {
      await dbConnection.connect();
      console.log('Finding room by ID:', roomId);
      
      const room = await this.model.findOne({ roomId }).lean();
      console.log('Room found:', room ? 'yes' : 'no');
      
      return room;
    } catch (error) {
      console.error('Error in RoomRepository.findByRoomId:', error);
      throw new DatabaseError(
        'Failed to find room',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async update(
    roomId: string,
    data: Partial<Pick<RoomData, 'language' | 'code'>>
  ): Promise<RoomData | null> {
    try {
      await dbConnection.connect();
      console.log('Updating room:', roomId, 'with data:', JSON.stringify(data));
      
      const room = await this.model.findOneAndUpdate(
        { roomId },
        { $set: data },
        { 
          new: true,
          lean: true,
          runValidators: true
        }
      );
      
      if (!room) {
        console.log('Room not found for update:', roomId);
        throw new RoomError('Room not found');
      }
      
      console.log('Room updated successfully:', roomId);
      return room;
    } catch (error) {
      console.error('Error in RoomRepository.update:', error);
      if (error instanceof RoomError) {
        throw error;
      }
      throw new DatabaseError(
        'Failed to update room',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}

export const roomRepository = new RoomRepository();