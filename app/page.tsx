'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const createNewRoom = async () => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
      
      const { roomId } = await response.json();
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Collaborative Code Editor
        </h1>
        <div className="space-x-4">
          <button
            onClick={createNewRoom}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Room
          </button>
        </div>
      </div>
    </div>
  );
}