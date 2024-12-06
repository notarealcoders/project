'use client';

import { useState } from 'react';
import { useRoom } from '@/lib/contexts/RoomContext';
import MonacoEditor from './MonacoEditor';
import EditorToolbar from './EditorToolbar';
import { defaultTheme } from '@/lib/constants/editorThemes';
import { Toaster } from 'react-hot-toast';

export default function CodeEditor() {
  const { language, code, setLanguage, setCode } = useRoom();
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar
        language={language}
        theme={theme}
        code={code}
        onLanguageChange={setLanguage}
        onThemeChange={setTheme}
        onCodeChange={setCode}
      />
      <div className="flex-grow">
        <MonacoEditor
          language={language}
          theme={theme}
          value={code}
          onChange={setCode}
        />
      </div>
      <Toaster />
    </div>
  );
}