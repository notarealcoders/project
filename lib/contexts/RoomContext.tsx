"use client";

import { createContext, useContext } from "react";

export interface RoomContextType {
  language: string;
  code: string;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  roomId: string;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
