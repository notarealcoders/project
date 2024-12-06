import { Metadata } from 'next';
import CodeEditor from '@/components/Editor/CodeEditor';
import RoomProvider from '@/components/Room/RoomProvider';

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export const metadata: Metadata = {
  title: 'CodeShare Room',
  description: 'Collaborative code editing room',
};

export default function RoomPage({ params }: RoomPageProps) {
  return (
    <div className="h-[calc(100vh-8rem)]">
      <RoomProvider roomId={params.roomId}>
        <CodeEditor />
      </RoomProvider>
    </div>
  );
}