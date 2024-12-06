'use client';

import { useEffect, useRef } from 'react';
import Editor, { loader } from '@monaco-editor/react';

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs',
  },
});

interface MonacoEditorProps {
  language: string;
  theme: string;
  value: string;
  onChange: (value: string) => void;
}

export default function MonacoEditor({
  language,
  theme,
  value,
  onChange,
}: MonacoEditorProps) {
  const editorRef = useRef(null);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.dispose();
      }
    };
  }, []);

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      theme={theme}
      value={value}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: true,
        smoothScrolling: true,
      }}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      loading={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }
    />
  );
}