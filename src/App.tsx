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
  const [selectionMode, setSelectionMode] = useState<'date-range' | 'iso-week' | 'week' | 'fiscal-week'>('date-range');
  const [weekStart, setWeekStart] = useState<0 | 1>(0);
  const [fiscalStartMonth, setFiscalStartMonth] = useState<number>(0);
  const [fiscalStartDay, setFiscalStartDay] = useState<number>(1);
  const [calendars, setCalendars] = useState<1 | 2 | 3>(2);
  const [locale, setLocale] = useState<string>('en-GB');
  const [useLocaleWeekStart, setUseLocaleWeekStart] = useState<boolean>(true);
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
                onChange={(event) => setSelectionMode(event.target.value as 'date-range' | 'iso-week' | 'week' | 'fiscal-week')}
              >
                <option value="date-range">Date Range</option>
                <option value="iso-week">ISO Week</option>
                <option value="week">Week (Custom Start)</option>
                <option value="fiscal-week">Fiscal Week</option>
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="week-start">Week Start</label>
              <select
                id="week-start"
                value={weekStart}
                onChange={(event) => setWeekStart(event.target.value === '1' ? 1 : 0)}
                disabled={selectionMode !== 'week' && selectionMode !== 'fiscal-week'}
              >
                <option value={0}>Sunday</option>
                <option value={1}>Monday</option>
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="fiscal-start-month">Fiscal Start Month</label>
              <select
                id="fiscal-start-month"
                value={fiscalStartMonth}
                onChange={(event) => setFiscalStartMonth(Number(event.target.value))}
                disabled={selectionMode !== 'fiscal-week'}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index} value={index}>
                    {new Date(0, index).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="fiscal-start-day">Fiscal Start Day</label>
              <select
                id="fiscal-start-day"
                value={fiscalStartDay}
                onChange={(event) => setFiscalStartDay(Number(event.target.value))}
                disabled={selectionMode !== 'fiscal-week'}
              >
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="calendar-count"> No of calendars</label>
              <select
                id="calendar-count"
                value={calendars}
                onChange={(event) => setCalendars(Number(event.target.value) as 1 | 2 | 3)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="locale-select">Locale</label>
              <select
                id="locale-select"
                value={locale}
                onChange={(event) => {
                  const nextLocale = event.target.value;
                  setLocale(nextLocale);
                }}
              >
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
                <option value="fr-FR">Français</option>
                <option value="de-DE">Deutsch</option>
                <option value="es-ES">Español</option>
                <option value="ar-SA">العربية</option>
                <option value="he-IL">עברית</option>
                <option value="fa-IR">فارسی</option>
                <option value="ur-PK">اردو</option>
              </select>
            </div>
            <div className="config-field">
              <label htmlFor="locale-week-start">Locale Week Start</label>
              <select
                id="locale-week-start"
                value={useLocaleWeekStart ? 'true' : 'false'}
                onChange={(event) => setUseLocaleWeekStart(event.target.value === 'true')}
              >
                <option value="true">Use Locale</option>
                <option value="false">Use Week Start</option>
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
              weekStart={weekStart}
              fiscalYearStartMonth={fiscalStartMonth}
              fiscalYearStartDay={fiscalStartDay}
              calendars={calendars}
              locale={locale}
              useLocaleWeekStart={useLocaleWeekStart}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
