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
  const [selectionMode, setSelectionMode] = useState<'date-range' | 'iso-week'>('date-range');
  useEffect(() => {
    console.log(theme)
  }, [theme])
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Week Date Range Picker</h1>
        <div className="app-shell">
          <aside className="config-card">
            <h2>Configs</h2>
            <div className="config-field">
              <label htmlFor="selection-mode">WeekdaySelectionType</label>
              <select
                id="selection-mode"
                value={selectionMode}
                onChange={(event) => setSelectionMode(event.target.value as 'date-range' | 'iso-week')}
              >
                <option value="date-range">Date Range</option>
                <option value="iso-week">ISO Week</option>
              </select>
            </div>
            <div className="config-field">
              <ThemePicker onChange={setTheme} />
            </div>
          </aside>
          <main className="picker-area">
            <WeekdayDateRangePicker
              title="Custom Date Range Picker"
              onChange={handleRangeChange}
              selectedTheme={theme}
              predefinedRanges={predefinedRanges}
              selectionMode={selectionMode}
              onSelectionModeChange={setSelectionMode}
              showSelectionModeSelect={true}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
