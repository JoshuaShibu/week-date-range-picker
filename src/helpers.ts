type DateRange = [Date, Date];

type colorSchemaTypes = {
  primary: string;
  secondary: string;
  highlight: string;
  hoverHighlight: string;
  weekend: {
    color: string,
    backgroundColor: string;          
  };
  todayColor: string;
  usePlaceboShadow?: boolean;
};

// Helper function: Check if a date is a weekend
export const isWeekend = (date: Date | null) => date ? date.getDay() === 0 || date.getDay() === 6 : false;

// Function to calculate weekdays and weekends between two dates
export const calculateWeekdaysAndWeekends = (start: Date, end: Date) => {
  const weekdays: Date[] = [];
  const weekends: Date[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const newDate = new Date(d);
    if (isWeekend(newDate)) {
      weekends.push(newDate);
    } else {
      weekdays.push(newDate);
    }
  }
  return { weekdays, weekends };
};

// Function to generate an array of years
export const generateYearOptions = (startYear: number, length: number) => {
  return Array.from({ length }, (_, index) => startYear + index);
};

// Function to generate days for a given month
export const generateDays = (startOfMonth: Date, endOfMonth: Date, weekStart: 0 | 1 = 0) => {
  const days = [];
  const firstDay = startOfMonth.getDay();
  const offset = (firstDay - weekStart + 7) % 7;
  const totalDays = endOfMonth.getDate();

  for (let i = 0; i < offset; i++) {
    days.push(null); // Fill empty slots at the beginning of the month
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day));
  }

  return days;
};

export const getIsoWeekRange = (date: Date) => {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  const isoDay = (current.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  const start = new Date(current);
  start.setDate(current.getDate() - isoDay);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};

export const getWeekRange = (date: Date, weekStart: 0 | 1) => {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  const dayIndex = current.getDay();
  const offset =
    weekStart === 1
      ? (dayIndex + 6) % 7
      : dayIndex;
  const start = new Date(current);
  start.setDate(current.getDate() - offset);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};

export const getFiscalWeekRange = (
  date: Date,
  weekStart: 0 | 1,
  fiscalYearStartMonth: number,
  fiscalYearStartDay: number
) => {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  const currentYear = current.getFullYear();

  const fiscalStartThisYear = new Date(currentYear, fiscalYearStartMonth, fiscalYearStartDay);
  const fiscalYearStart =
    current >= fiscalStartThisYear
      ? fiscalStartThisYear
      : new Date(currentYear - 1, fiscalYearStartMonth, fiscalYearStartDay);

  const fiscalStartWeek = getWeekRange(fiscalYearStart, weekStart).start;
  const diffMs = current.getTime() - fiscalStartWeek.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weekIndex = Math.floor(diffDays / 7);

  const start = new Date(fiscalStartWeek);
  start.setDate(fiscalStartWeek.getDate() + weekIndex * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};

export const predefinedRangesList: { label: string; range: DateRange }[] = [
  {
    label: 'Today',
    range: [new Date(), new Date()], // Both start and end are today's date
  },
  {
    label: 'Yesterday',
    range: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ], // Both start and end are yesterday's date
  },
  {
    label: 'Last 7 Days',
    range: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()], // Tuple with exactly 2 Dates
  },
  {
    label: 'Last 30 Days',
    range: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()], // Tuple with exactly 2 Dates
  },
  {
    label: 'This Month',
    range: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of the current month
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Last day of the current month
    ],
  },
  {
    label: 'Last Month',
    range: [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
  },
  {
    label: 'This Year',
    range: [
      new Date(new Date().getFullYear(), 0, 1), // January 1st of the current year
      new Date(new Date().getFullYear(), 11, 31), // December 31st of the current year
    ], // Tuple with exactly 2 Dates
  },
  {
    label: 'Last Year',
    range: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear() - 1, 11, 31),
    ], // Tuple with exactly 2 Dates
  },
  {
    label: 'All Time',
    range: [new Date(1970, 0, 1), new Date()], // Tuple with exactly 2 Dates
  },
];


// Utility function that applies styles based on the color schema
export const getDayStyles = (colorSchema: colorSchemaTypes) => {
  return (
    day: Date,
    today: Date,
    isInRange: boolean | null,
    isSelected: boolean,
    startDate: Date | null,
    endDate: Date | null,
    isWeekend: boolean,
    allowWeekendSelection: boolean = false,
    isFiscalStartDate: boolean = false
  ) => {
    const styles: React.CSSProperties = {};
    const boxShadows: string[] = [];
    const isStart = Boolean(startDate && day.getTime() === startDate.getTime());
    const isEnd = Boolean(endDate && day.getTime() === endDate.getTime());

    // Weekend styling
    if (isWeekend) {
      styles.color = colorSchema.weekend.color;
      styles.backgroundColor = colorSchema.weekend.backgroundColor;
    }

    // Today styling
    if (day && today.toDateString() === day.toDateString()) {
      styles.backgroundColor = colorSchema.todayColor;
      styles.color = '#fff'; // Assuming white text for today
      if (colorSchema.usePlaceboShadow && !isInRange) {
        boxShadows.push(`0 5px 10px 0 ${colorSchema.todayColor}`);
      }
    }

    // Range highlight
    if (isInRange) {
      styles.backgroundColor = colorSchema.highlight;
      const rangeShadow = colorSchema.usePlaceboShadow
        ? `0 5px 10px 0 ${colorSchema.highlight}`
        : `1px 0 0 0 ${colorSchema.highlight}`;
      boxShadows.push(rangeShadow);
    }

    // Start date styling
    if (isStart) {
      styles.backgroundColor = colorSchema.primary; // Primary color for start date
      styles.color = '#fff'; // Assuming white text for the start date
      if (colorSchema.usePlaceboShadow) {
        boxShadows.push(`0 5px 10px 0 ${colorSchema.primary}`);
      }
    }

    // End date styling
    if (isEnd) {
      styles.backgroundColor = colorSchema.secondary; // Secondary color for end date
      styles.color = '#fff'; // Assuming white text for the end date
      // End date should override any range/hover shadows
      boxShadows.length = 0;
      boxShadows.push(`0 0 0 0 ${colorSchema.highlight}`);
      if (colorSchema.usePlaceboShadow) {
        boxShadows.push(`0 5px 10px 0 ${colorSchema.secondary}`);
      }
    }

    // Selected day styling for other selected days
    if (
      isSelected &&
      (allowWeekendSelection || !isWeekend) &&
      !(startDate && day.getTime() === startDate.getTime()) &&
      !(endDate && day.getTime() === endDate.getTime())
    ) {
      const dashColor = 'lightgray';
      // Use a repeating gradient to get dashed top/bottom lines.
      styles.backgroundImage = [
        `repeating-linear-gradient(90deg, ${dashColor} 0 6px, transparent 6px 10px)`,
        `repeating-linear-gradient(90deg, ${dashColor} 0 6px, transparent 6px 10px)`
      ].join(', ');
      styles.backgroundSize = '100% 2px, 100% 2px';
      styles.backgroundPosition = '0 0, 0 100%';
      styles.backgroundRepeat = 'repeat-x';
      if (!isInRange) {
        const hoverShadow = colorSchema.usePlaceboShadow
          ? `0 5px 10px 0px ${colorSchema.highlight}`
          : `1px 0 0 0 ${colorSchema.highlight}`;
        boxShadows.push(hoverShadow);
      }
    }

    if (isFiscalStartDate) {
      // Use theme palette to outline fiscal year start date
      boxShadows.push(`inset 0 0 0 2px ${colorSchema.hoverHighlight}`);
    }

    if (boxShadows.length) {
      styles.boxShadow = boxShadows.join(', ');
    }

    return styles;
  };
};
 