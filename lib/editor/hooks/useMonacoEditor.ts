'use client';

import { useEffect, useRef } from 'react';
import { editor } from 'monaco-editor';
import { CodeSnippetsManager } from '../features/CodeSnippets';
import { VersionControl } from '../features/VersionControl';

let CollaborationManager: any;
let AutoCompletion: any;

if (typeof window !== 'undefined') {
  CollaborationManager = require('../collaboration/CollaborationManager').CollaborationManager;
  AutoCompletion = require('../features/AutoCompletion').AutoCompletion;
}

export function useMonacoEditor(roomId?: string) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const collaborationRef = useRef<any>(null);
  const snippetsManager = useRef<CodeSnippetsManager | null>(null);
  const versionControl = useRef<VersionControl | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    snippetsManager.current = new CodeSnippetsManager();
    versionControl.current = new VersionControl();
    
    if (editorRef.current && AutoCompletion) {
      new AutoCompletion(editorRef.current);
      snippetsManager.current.loadSnippets();
      versionControl.current.loadVersions();
    }

    return () => {
      if (collaborationRef.current?.destroy) {
        collaborationRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && roomId && typeof window !== 'undefined' && CollaborationManager) {
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