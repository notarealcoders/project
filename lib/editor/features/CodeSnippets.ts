import { editor } from 'monaco-editor';

export interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
}

export class CodeSnippetsManager {
  private snippets: Map<string, CodeSnippet> = new Map();

  saveSnippet(name: string, code: string, language: string): CodeSnippet {
    const id = Date.now().toString();
    const snippet = { id, name, code, language };
    this.snippets.set(id, snippet);
    this.persistSnippets();
    return snippet;
  }

  getSnippets(): CodeSnippet[] {
    return Array.from(this.snippets.values());
  }

  insertSnippet(editor: editor.IStandaloneCodeEditor, snippetId: string) {
    const snippet = this.snippets.get(snippetId);
    if (snippet) {
      editor.trigger('keyboard', 'type', { text: snippet.code });
    }
  }

  private persistSnippets() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('codeSnippets', JSON.stringify(Array.from(this.snippets.entries())));
    }
  }

  loadSnippets() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codeSnippets');
      if (saved) {
        this.snippets = new Map(JSON.parse(saved));
      }
    }
  }
}