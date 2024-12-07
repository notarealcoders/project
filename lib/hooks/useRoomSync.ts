"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/utils/notifications";
import { RoomData } from "@/lib/mongodb/types";

const SYNC_INTERVAL = 5000; // 5 seconds
const DEBOUNCE_DELAY = 1000; // 1 second

export function useRoomSync(roomId: string) {
  const router = useRouter();
  const [room, setRoom] = useState<RoomData | null>(null);
  const pendingChangesRef = useRef<Partial<RoomData>>({});
  const lastSyncTimeRef = useRef<number>(Date.now());
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Fetch room data
  const fetchRoom = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      const response = await fetch(`/api/rooms/${roomId}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push("/");
          notify.error("Room not found");
          return;
        }
        throw new Error("Failed to fetch room");
      }
      const data = await response.json();
      setRoom((prev) => {
        // Only update if data has changed
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return data;
        }
        return prev;
      });
      lastSyncTimeRef.current = Date.now();
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, [roomId, router]);

  // Update room data
  const updateRoom = useCallback(async () => {
    if (
      !isMountedRef.current ||
      Object.keys(pendingChangesRef.current).length === 0
    )
      return;

    try {
      const changes = { ...pendingChangesRef.current };
      pendingChangesRef.current = {}; // Clear pending changes before the request

      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });

      if (!response.ok) {
        throw new Error("Failed to update room");
      }

      const updatedRoom = await response.json();
      setRoom(updatedRoom);
      lastSyncTimeRef.current = Date.now();
    } catch (error) {
      console.error("Error updating room:", error);
      // Restore pending changes on error
      pendingChangesRef.current = {
        ...pendingChangesRef.current,
        ...pendingChangesRef.current,
      };
    }
  }, [roomId]);

  // Handle room updates with debouncing
  const handleRoomUpdate = useCallback(
    (updates: Partial<RoomData>) => {
      pendingChangesRef.current = { ...pendingChangesRef.current, ...updates };

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        updateRoom();
      }, DEBOUNCE_DELAY);
    },
    [updateRoom]
  );

  // Initial fetch
  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  // Periodic sync with optimized interval
  useEffect(() => {
    const syncInterval = setInterval(() => {
      const timeSinceLastSync = Date.now() - lastSyncTimeRef.current;
      if (
        timeSinceLastSync >= SYNC_INTERVAL &&
        Object.keys(pendingChangesRef.current).length === 0
      ) {
        fetchRoom();
      }
    }, SYNC_INTERVAL);

    return () => {
      clearInterval(syncInterval);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [fetchRoom]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return {
    room,
    updateRoom: handleRoomUpdate,
    isLoading: !room,
  };
}
