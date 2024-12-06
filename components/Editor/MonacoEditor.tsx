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
  value: string;
  onChange: (value: string) => void;
}

export default function MonacoEditor({ language, value, onChange }: MonacoEditorProps) {
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
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
      }}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      loading={<div className="text-center p-4">Loading editor...</div>}
    />
  );
}