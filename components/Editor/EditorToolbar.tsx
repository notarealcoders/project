import { languages } from '@/lib/constants/languages';
import { editorThemes } from '@/lib/constants/editorThemes';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import { formatCode } from '@/lib/utils/codeFormatter';
import { downloadCode } from '@/lib/utils/download';
import { notify } from '@/lib/utils/notifications';

interface EditorToolbarProps {
  language: string;
  theme: string;
  code: string;
  onLanguageChange: (value: string) => void;
  onThemeChange: (value: string) => void;
  onCodeChange: (value: string) => void;
}

export default function EditorToolbar({
  language,
  theme,
  code,
  onLanguageChange,
  onThemeChange,
  onCodeChange,
}: EditorToolbarProps) {
  const handleFormat = async () => {
    try {
      const formatted = await formatCode(code, language);
      onCodeChange(formatted);
      notify.success('Code formatted successfully');
    } catch (error) {
      notify.error('Failed to format code');
    }
  };

  const handleDownload = () => {
    try {
      downloadCode(code, language);
      notify.success('File downloaded successfully');
    } catch (error) {
      notify.error('Failed to download file');
    }
  };

  return (
    <div className="bg-white border-b p-4 flex items-center space-x-4">
      <LanguageSelector
        value={language}
        onChange={onLanguageChange}
        languages={languages}
      />
      <ThemeSelector
        value={theme}
        onChange={onThemeChange}
        themes={editorThemes}
      />
      <button
        onClick={handleFormat}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Format Code
      </button>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Download
      </button>
    </div>
  );
}