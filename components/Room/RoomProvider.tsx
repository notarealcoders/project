"use client";

import { createContext, useContext } from "react";
import { useRoomSync } from "@/lib/hooks/useRoomSync";
import { RoomData } from "@/lib/mongodb/types";

interface RoomContextType {
  room: RoomData | null;
  updateRoom: (updates: Partial<RoomData>) => void;
  isLoading: boolean;
}

const RoomContext = createContext<RoomContextType | null>(null);

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}

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
