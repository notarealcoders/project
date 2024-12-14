export function downloadCode(code: string, language: string): void {
  try {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.style.display = 'none'; // Hide the element
    a.href = url;
    a.download = `code.${getFileExtension(language)}`;
    
    // Append, click, and remove in a safer way
    document.body.appendChild(a);
    requestAnimationFrame(() => {
      a.click();
      requestAnimationFrame(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    });
  } catch (error) {
    console.error('Error downloading code:', error);
    throw new Error('Failed to download code');
  }
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    csharp: 'cs',
    cpp: 'cpp',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    go: 'go',
    rust: 'rs',
    sql: 'sql',
    html: 'html',
    css: 'css',
    json: 'json',
    markdown: 'md'
  };

  return extensions[language] || 'txt';
}