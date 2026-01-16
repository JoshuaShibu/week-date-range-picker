import React, { useState } from 'react';
import { colorSchemas } from './theme/colorSchemas';
// Define a type for theme names
type ThemeNames = keyof typeof colorSchemas;

const ThemePicker: React.FC<{ onChange: (schema: any) => void }> = ({ onChange }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeNames>('Material'); // Use ThemeNames type

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = event.target.value as ThemeNames; // Assert the type here
    setSelectedTheme(theme);
    onChange(colorSchemas[theme]);
  };

  return (
    <div>
      <label htmlFor="theme-picker">Select Theme:</label><br/>
      <select id="theme-picker" value={selectedTheme} onChange={handleThemeChange}>
        {Object.keys(colorSchemas).map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemePicker;