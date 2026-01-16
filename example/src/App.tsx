import { useState } from 'react';
import {
  WeekdayDateRangePicker,
  ThemePicker,
  colorSchemas
} from 'weekday-date-range-picker';
import 'weekday-date-range-picker/styles.css';

export default function App() {
  const [theme, setTheme] = useState(colorSchemas.Material);

  return (
    <div className="app">
      <ThemePicker onChange={setTheme} />
      <h1>Week Date Range Picker</h1>
      <WeekdayDateRangePicker
        title="Custom Date Range Picker"
        selectedTheme={theme}
        onChange={([weekdays, weekends]) => {
          console.log('Weekdays:', weekdays);
          console.log('Weekends:', weekends);
        }}
      />
    </div>
  );
}
