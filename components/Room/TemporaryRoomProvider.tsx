"use client";

import { RoomContext } from "@/lib/contexts/RoomContext";
import { useTemporaryRoom } from "@/lib/hooks/useTemporaryRoom";

export default function TemporaryRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const roomId = useTemporaryRoom();

  return <RoomContext.Provider value={roomId}>{children}</RoomContext.Provider>;
}
