import { RoomData } from "@/lib/mongodb/types";

export async function fetchRoom(roomId: string): Promise<RoomData> {
  const response = await fetch(`/api/rooms/${roomId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch room: ${response.statusText}`);
  }
  return response.json();
}

export async function updateRoom(
  roomId: string,
  updates: Partial<RoomData>
): Promise<RoomData> {
  const response = await fetch(`/api/rooms/${roomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update room: ${response.statusText}`);
  }

  return response.json();
}
