import React, { ReactNode } from 'react';

type DateRange = [Date, Date];
type colorSchemaTypes$1 = {
    primary: string;
    secondary: string;
    highlight: string;
    hoverHighlight: string;
    weekend: {
        color: string;
        backgroundColor: string;
    };
    todayColor: string;
    usePlaceboShadow?: boolean;
};
interface WeekdayDateRangePickerProps {
    predefinedRanges?: DateRange[];
    onChange: (range: [string[], string[]]) => void;
    title?: string;
    selectedTheme: colorSchemaTypes$1;
    selectionMode?: 'date-range' | 'iso-week' | 'week' | 'fiscal-week';
    weekStart?: 0 | 1;
    fiscalYearStartMonth?: number;
    fiscalYearStartDay?: number;
    calendars?: 1 | 2 | 3;
    disableWeekends?: boolean;
    disabledDates?: Date[];
    minRangeDays?: number;
    maxRangeDays?: number;
    isDateDisabled?: (date: Date) => boolean;
    validateRange?: (start: Date, end: Date) => boolean;
    locale?: string;
    dateFormatOptions?: Intl.DateTimeFormatOptions;
    yearFormatOptions?: Pick<Intl.DateTimeFormatOptions, 'year' | 'calendar' | 'numberingSystem'>;
    useLocaleWeekStart?: boolean;
    rtl?: boolean;
    timeZone?: string;
    outputTimeZone?: string;
    showTimeZoneLabel?: boolean;
}
declare const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps>;

declare const ThemePicker: React.FC<{
    onChange: (schema: any) => void;
}>;

declare const colorSchemas: {
    Material: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
        dayBorderStyle: string;
    };
    Pastel: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    Ocean: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    Sunset: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    Forest: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    Neon: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    DarkModeSchema: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    PastelRainbowSchema: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    RetroSchema: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    EarthyTonesSchema: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
    };
    Placebo: {
        primary: string;
        secondary: string;
        highlight: string;
        hoverHighlight: string;
        weekend: {
            color: string;
            backgroundColor: string;
        };
        todayColor: string;
        usePlaceboShadow: boolean;
    };
};

type colorSchemaTypes = {
    primary: string;
    secondary: string;
    highlight: string;
    hoverHighlight: string;
    weekend: {
        color: string;
        backgroundColor: string;
    };
    todayColor: string;
    usePlaceboShadow?: boolean;
};
interface ThemeContextType {
    theme: colorSchemaTypes;
    setTheme: (theme: any) => void;
}
declare const ThemeProvider: React.FC<{
    children: ReactNode;
}>;
declare const useTheme: () => ThemeContextType;

export { ThemePicker, ThemeProvider, WeekdayDateRangePicker, type WeekdayDateRangePickerProps, colorSchemas, useTheme };
