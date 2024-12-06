'use client';

import { languages } from '@/lib/constants/languages';
import LanguageSelector from './LanguageSelector';
import MonacoEditor from './MonacoEditor';
import { useRoom } from '@/lib/contexts/RoomContext';

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
        <MonacoEditor
          language={language}
          value={code}
          onChange={setCode}
        />
      </div>
    </div>
  );
}