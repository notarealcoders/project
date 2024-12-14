import { RoomData } from '../types';
import { roomRepository } from '../repositories/roomRepository';
import { generateRoomId } from '@/lib/utils/roomUtils';
import { DatabaseError, RoomError } from '../core/errors';

export class RoomService {
  static async create(): Promise<RoomData> {
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    while (attempts < maxAttempts) {
      try {
        const roomId = generateRoomId();
        const existingRoom = await roomRepository.findByRoomId(roomId);
        
        if (!existingRoom) {
          return await roomRepository.create({
            roomId,
            language: 'javascript',
            code: '// Start coding here',
          });
        }

        attempts++;
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempts + 1} failed:`, error);
        attempts++;
        
        if (attempts === maxAttempts) {
          throw new DatabaseError(
            'Failed to create room after multiple attempts',
            error instanceof Error ? error.message : 'Unknown error'
          );
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    throw lastError || new RoomError('Failed to generate unique room ID');
  }

  static async findByRoomId(roomId: string): Promise<RoomData | null> {
    return roomRepository.findByRoomId(roomId);
  }

  static async update(
    roomId: string,
    data: Partial<Pick<RoomData, 'language' | 'code'>>
  ): Promise<RoomData | null> {
    return roomRepository.update(roomId, data);
  }
}