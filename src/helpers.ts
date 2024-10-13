type DateRange = [Date, Date];

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
export const generateDays = (startOfMonth: Date, endOfMonth: Date) => {
  const days = [];
  const firstDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Fill empty slots at the beginning of the month
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day));
  }

  return days;
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
    range: [new Date(new Date().getFullYear(), 0, 1), new Date()], // Tuple with exactly 2 Dates
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