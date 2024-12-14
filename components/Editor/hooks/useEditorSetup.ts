import { useEffect, useRef } from 'react';
import { editor } from 'monaco-editor';
import { AutoCompletion, CodeSnippetsManager, VersionControl } from '@/lib/editor/features';
import { CollaborationManager } from '@/lib/editor/collaboration/CollaborationManager';

export function useEditorSetup(roomId?: string) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const collaborationRef = useRef<CollaborationManager | null>(null);
  const snippetsManager = useRef<CodeSnippetsManager | null>(null);
  const versionControl = useRef<VersionControl | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    snippetsManager.current = new CodeSnippetsManager();
    versionControl.current = new VersionControl();
    
    if (editorRef.current) {
      new AutoCompletion(editorRef.current);
      snippetsManager.current.loadSnippets();
      versionControl.current.loadVersions();
    }

    return () => {
      collaborationRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && roomId && typeof window !== 'undefined') {
      collaborationRef.current = new CollaborationManager(roomId);
      collaborationRef.current.setupCollaboration(editorRef.current);
    }
  }, [roomId]);

  return {
    editorRef,
    snippetsManager: snippetsManager.current,
    versionControl: versionControl.current,
  };
}