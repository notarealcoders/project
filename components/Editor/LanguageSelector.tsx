interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  languages: { id: string; name: string }[];
}

export default function LanguageSelector({
  value,
  onChange,
  languages,
}: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}