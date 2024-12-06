'use client';

import { RoomContext } from '@/lib/contexts/RoomContext';
import { useTemporaryRoom } from '@/lib/hooks/useTemporaryRoom';

export default function TemporaryRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const room = useTemporaryRoom();

  return (
    <RoomContext.Provider value={room}>
      {children}
    </RoomContext.Provider>
  );
}