import { RoomData } from "@/lib/mongodb/types";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

export async function fetchRoom(roomId: string): Promise<RoomData> {
  const response = await fetch(`/api/rooms/${roomId}`);
  return handleResponse(response);
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

  return handleResponse(response);
}

export async function createRoom(): Promise<{ roomId: string }> {
  const response = await fetch("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(response);
}