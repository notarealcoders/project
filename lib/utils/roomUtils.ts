import { customAlphabet } from 'nanoid';

const generateRoomId = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 6);

export const isValidRoomId = (roomId: string): boolean => {
  return /^[2-9A-HJ-NP-Z]{6}$/.test(roomId);
};

export { generateRoomId };