'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMonacoEditor } from '@/lib/editor/hooks/useMonacoEditor';
import { defaultEditorOptions } from '@/lib/editor/config/editorConfig';
import { notify } from '@/lib/utils/notifications';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  ),
});

interface MonacoEditorProps {
  language: string;
  theme: string;
  value: string;
  onChange: (value: string) => void;
  roomId?: string;
}

export default function MonacoEditor({
  language,
  theme,
  value,
  onChange,
  roomId,
}: MonacoEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { editorRef, versionControl } = useMonacoEditor(roomId);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    if (isInitialized) {
      onChange(newValue);
      try {
        versionControl?.saveVersion(newValue, language);
      } catch (error) {
        console.error('Error saving version:', error);
        notify.error('Failed to save version history');
      }
    }
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    setIsInitialized(true);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      theme={theme}
      value={value}
      onChange={handleEditorChange}
      options={defaultEditorOptions}
      onMount={handleEditorMount}
      loading={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }
    />
  );
}