// App.tsx

import './App.css';
import React , { useState, useEffect} from 'react';
import WeekdayDateRangePicker from './WeekdayDateRangePicker';
import { colorSchemas } from './theme/colorSchemas';
import ThemePicker from './themePicker';
import { ThemeProvider, useTheme } from './themContext'
function App() {
  const handleRangeChange = (range: [string[], string[]]) => {
    console.log('Selected Range:', range[0]);
    console.log('Weekend Dates:', range[1]);
  };

  const predefinedRanges: [Date, Date][] = [
    [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
  ];
  const [theme, setTheme] = useState<any>(colorSchemas.Material);
  useEffect(() => {
    console.log(theme)
  }, [theme])
  return (
    <ThemeProvider>
      <div className="App">
      <ThemePicker onChange={setTheme} />
        <h1>Week Date Range Picker</h1>
        <WeekdayDateRangePicker
          title="Custom Date Range Picker"
          onChange={handleRangeChange}
          selectedTheme={theme}
          predefinedRanges={predefinedRanges}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
