"use client";

import { createContext, useContext } from "react";
import { RoomData } from "@/lib/mongodb/types";

export interface RoomContextType {
  room: Partial<RoomData> | null;
  updateRoom: (updates: Partial<RoomData>) => void;
  isLoading: boolean;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
