export interface CodeSession {
  id: string;
  title: string;
  code: string;
  language: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CodeChange {
  sessionId: string;
  code: string;
  userId: string;
}