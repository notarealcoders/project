'use client';

import CodeEditor from '@/components/Editor/CodeEditor';
import TemporaryRoomProvider from '@/components/Room/TemporaryRoomProvider';

export default function NewSession() {
  return (
    <div className="h-[calc(100vh-8rem)]">
      <TemporaryRoomProvider>
        <CodeEditor />
      </TemporaryRoomProvider>
    </div>
  );
}