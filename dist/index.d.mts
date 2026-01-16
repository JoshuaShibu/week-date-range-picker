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
};
interface WeekdayDateRangePickerProps {
    predefinedRanges?: DateRange[];
    onChange: (range: [string[], string[]]) => void;
    title?: string;
    selectedTheme: colorSchemaTypes$1;
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
