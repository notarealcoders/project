import { editor } from "monaco-editor";

export const defaultEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  wordWrap: "on",
  automaticLayout: true,
  lineNumbers: "on",
  roundedSelection: true,
  scrollBeyondLastLine: false,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  smoothScrolling: true,
  multiCursorModifier: "ctrlCmd",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  formatOnPaste: true,
  formatOnType: true,
};