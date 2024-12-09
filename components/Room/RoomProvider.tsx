"use client";

import { useRoomSync } from "@/lib/hooks/useRoomSync";
import { RoomContext } from "@/lib/contexts/RoomContext";

export default function RoomProvider({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) {
  const roomSync = useRoomSync(roomId);

  return (
    <RoomContext.Provider value={roomSync}>
      {roomSync.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </RoomContext.Provider>
  );
}