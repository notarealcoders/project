"use client";

import { useState } from "react";
import { RoomContext } from "@/lib/contexts/RoomContext";
import { RoomData } from "@/lib/mongodb/types";

export default function TemporaryRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [room, setRoom] = useState<Partial<RoomData>>({
    language: "javascript",
    code: "// Start coding here",
  });

  const updateRoom = (updates: Partial<RoomData>) => {
    setRoom((prev) => ({ ...prev, ...updates }));
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        updateRoom,
        isLoading: false,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}