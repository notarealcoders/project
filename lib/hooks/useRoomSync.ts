"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/utils/notifications";
import { RoomData } from "@/lib/mongodb/types";
import { useDebounce } from "./useDebounce";
import { useInterval } from "./useInterval";
import { fetchRoom, updateRoom } from "@/lib/api/roomApi";

const SYNC_INTERVAL = 5000;
const DEBOUNCE_DELAY = 1000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useRoomSync(roomId: string) {
  const router = useRouter();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pendingChangesRef = useRef<Partial<RoomData>>({});
  const lastSyncTimeRef = useRef<number>(Date.now());
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  const handleFetchRoom = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      const data = await fetchRoom(roomId);
      setRoom((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return data;
        }
        return prev;
      });
      lastSyncTimeRef.current = Date.now();
      retryCountRef.current = 0;
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room:", error);
      if (error instanceof Error && error.message.includes("404")) {
        router.push("/");
        notify.error("Room not found");
      } else if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++;
        setTimeout(handleFetchRoom, RETRY_DELAY);
      } else {
        notify.error("Failed to connect to room");
        setIsLoading(false);
      }
    }
  }, [roomId, router]);

  const handleUpdateRoom = useCallback(async () => {
    if (
      !isMountedRef.current ||
      Object.keys(pendingChangesRef.current).length === 0
    )
      return;

    let changes: Partial<RoomData> = {};

    try {
      changes = { ...pendingChangesRef.current };
      pendingChangesRef.current = {};

      const updatedRoom = await updateRoom(roomId, changes);
      setRoom(updatedRoom);
      lastSyncTimeRef.current = Date.now();
    } catch (error) {
      console.error("Error updating room:", error);
      pendingChangesRef.current = { ...pendingChangesRef.current, ...changes };
      notify.error("Failed to save changes");
    }
  }, [roomId]);

  const debouncedUpdate = useDebounce(handleUpdateRoom, DEBOUNCE_DELAY);

  const handleRoomUpdate = useCallback(
    (updates: Partial<RoomData>) => {
      pendingChangesRef.current = { ...pendingChangesRef.current, ...updates };
      debouncedUpdate();
    },
    [debouncedUpdate]
  );

  useInterval(() => {
    const timeSinceLastSync = Date.now() - lastSyncTimeRef.current;
    if (
      timeSinceLastSync >= SYNC_INTERVAL &&
      Object.keys(pendingChangesRef.current).length === 0
    ) {
      handleFetchRoom();
    }
  }, SYNC_INTERVAL);

  useEffect(() => {
    handleFetchRoom();
    return () => {
      isMountedRef.current = false;
    };
  }, [handleFetchRoom]);

  return {
    room,
    updateRoom: handleRoomUpdate,
    isLoading,
  };
}