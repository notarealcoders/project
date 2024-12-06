interface ThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  themes: { id: string; name: string }[];
}

export default function ThemeSelector({
  value,
  onChange,
  themes,
}: ThemeSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}