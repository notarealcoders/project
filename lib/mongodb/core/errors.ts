export class DatabaseError extends Error {
  constructor(
    message: string,
    public readonly originalError?: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class RoomError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'RoomError';
  }
}