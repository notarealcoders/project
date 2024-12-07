"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidRoomId } from '@/lib/utils/roomUtils';
import { notify } from '@/lib/utils/notifications';

export default function CustomRoomForm() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidRoomId(roomId)) {
      notify.error('Invalid room ID format');
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}`);
      if (response.ok) {
        router.push(`/room/${roomId}`);
      } else {
        notify.error('Room not found');
      }
    } catch (error) {
      notify.error('Failed to join room');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="roomId" className="text-sm font-medium text-gray-700">
          Enter Room ID
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="Enter 6-character room ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={6}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Join Room
          </button>
        </div>
      </div>
    </form>
  );
}