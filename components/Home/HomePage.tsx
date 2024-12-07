"use client";

import { useRouter } from 'next/navigation';
import CustomRoomForm from '@/components/Room/CustomRoomForm';
import { notify } from '@/lib/utils/notifications';

export function HomePage() {
  const router = useRouter();

  const createNewRoom = async () => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create room');
      }
      
      const { roomId } = await response.json();
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      notify.error('Failed to create room. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Collaborative Code Editor
        </h1>
        <div className="space-y-8">
          <div>
            <button
              onClick={createNewRoom}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Room
            </button>
          </div>
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Join Existing Room
            </h2>
            <CustomRoomForm />
          </div>
        </div>
      </div>
    </div>
  );
}