'use client';

let Y: any;
let WebsocketProvider: any;
let MonacoBinding: any;

if (typeof window !== 'undefined') {
  Y = require('yjs');
  WebsocketProvider = require('y-websocket').WebsocketProvider;
  MonacoBinding = require('y-monaco').MonacoBinding;
}

export class CollaborationManager {
  private doc: any;
  private provider: any;
  private binding: any = null;

  constructor(roomId: string) {
    if (typeof window === 'undefined') {
      throw new Error('CollaborationManager can only be instantiated in browser environment');
    }
    
    this.doc = new Y.Doc();
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://demos.yjs.dev';
    this.provider = new WebsocketProvider(wsUrl, roomId, this.doc);
  }

  setupCollaboration(editor: any) {
    try {
      const yText = this.doc.getText('monaco');
      this.binding = new MonacoBinding(
        yText,
        editor.getModel()!,
        new Set([editor]),
        this.provider.awareness
      );
    } catch (error) {
      console.error('Failed to setup collaboration:', error);
    }
  }

  destroy() {
    try {
      if (this.binding?.destroy) this.binding.destroy();
      if (this.provider?.destroy) this.provider.destroy();
      if (this.doc?.destroy) this.doc.destroy();
    } catch (error) {
      console.error('Error destroying collaboration:', error);
    }
  }
}