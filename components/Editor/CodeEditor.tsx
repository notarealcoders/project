'use client';

import Editor from '@monaco-editor/react';
import { languages } from '@/lib/constants/languages';
import LanguageSelector from './LanguageSelector';
import { useRoom } from '@/components/Room/RoomProvider';

export default function CodeEditor() {
  const { language, code, setLanguage, setCode } = useRoom();

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <LanguageSelector
          value={language}
          onChange={setLanguage}
          languages={languages}
        />
        <div className="text-sm text-gray-500">
          Room ID: {window.location.pathname.split('/').pop()}
        </div>
      </div>
      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}