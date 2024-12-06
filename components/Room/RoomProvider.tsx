'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoomContext } from '@/lib/contexts/RoomContext';

export default function RoomProvider({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) {
  const router = useRouter();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding here');

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await fetch(`/api/rooms/${roomId}`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const room = await response.json();
        setLanguage(room.language);
        setCode(room.code);
      } catch (error) {
        router.push('/');
      }
    }

    fetchRoom();
  }, [roomId, router]);

  useEffect(() => {
    const saveRoom = async () => {
      try {
        await fetch(`/api/rooms/${roomId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ language, code }),
        });
      } catch (error) {
        console.error('Failed to save room:', error);
      }
    };

    const debounceTimer = setTimeout(saveRoom, 1000);
    return () => clearTimeout(debounceTimer);
  }, [roomId, language, code]);

  return (
    <RoomContext.Provider value={{ roomId, language, code, setLanguage, setCode }}>
      {children}
    </RoomContext.Provider>
  );
}