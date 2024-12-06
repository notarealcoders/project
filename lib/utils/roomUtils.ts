import { customAlphabet } from 'nanoid';

// Create a custom nanoid with a specific alphabet for readable IDs
const generateRoomId = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 6);

export { generateRoomId };