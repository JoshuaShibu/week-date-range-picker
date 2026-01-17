## Week Date Range Picker
![alt text](https://github.com/JoshuaShibu/week-date-range-picker/blob/main/public/projectPick.png)

A React date range picker that splits weekdays and weekends, supports quick ranges, and provides theming.

### Install
```
npm install weekday-date-range-picker
```

### Usage
```tsx
import React, { useState } from 'react';
import {
  WeekdayDateRangePicker,
  colorSchemas
} from 'weekday-date-range-picker';

export default function Example() {
  const [theme, setTheme] = useState(colorSchemas.Material);

  return (
    <WeekdayDateRangePicker
      title="Custom Date Range Picker"
      selectedTheme={theme}
      selectionMode="iso-week"
      calendars={2}
      onChange={([weekdays, weekends]) => {
        console.log('Weekdays:', weekdays);
        console.log('Weekends:', weekends);
      }}
    />
  );
}
```

### Styles
Styles are included via the component import. If your bundler requires explicit CSS imports:
```
import 'weekday-date-range-picker/styles.css';
```

### Local Development
```
npm start
```

### Build Library
```
npm run build:lib
```

### Example App (Vite)
```
cd example
npm install
npm run dev
```

### Publish (Creation → Shipping)
1. Update `name` and `version` in `package.json`.
2. Create an npm account and run `npm login`.
3. Build the library: `npm run build:lib`.
4. Publish:
   - Unscoped: `npm publish`
   - Scoped (public): `npm publish --access public`
5. Verify on npm and install from a consumer app.
