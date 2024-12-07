import { editor, languages } from 'monaco-editor';

export class AutoCompletion {
  private editor: editor.IStandaloneCodeEditor;

  constructor(editor: editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.setupAutoCompletion();
  }

  private setupAutoCompletion() {
    languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        return {
          suggestions: [
            {
              label: 'console.log',
              kind: languages.CompletionItemKind.Function,
              insertText: 'console.log($1)',
              insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            },
            // Add more suggestions as needed
          ],
        };
      },
    });
  }
}