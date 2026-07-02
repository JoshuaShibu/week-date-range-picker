import React, { useState, useEffect, useRef, useId } from 'react';
import './styles.css';
import {
  isWeekend,
  calculateWeekdaysAndWeekends,
  generateYearOptions,
  generateDays,
  predefinedRangesList,
  getDayStyles,
  getIsoWeekRange,
  getWeekRange,
  getFiscalWeekRange,
  getLocaleWeekStart,
  formatYear,
  getDatePlaceholder,
  defaultDateFormatOptions,
  defaultYearFormatOptions,
  normalizeDateRange,
  isSameCalendarDay,
  isWeekRowStart,
  isWeekRowEnd
} from './helpers';

type DateRange = [Date, Date];
type WeekendDates = Date[];
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

export interface WeekdayDateRangePickerProps {
  predefinedRanges?: DateRange[];
  onChange: (range: [string[], string[]]) => void;
  title?: string;
  selectedTheme: colorSchemaTypes;
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

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges = [],
  onChange,
  title,
  selectedTheme,
  selectionMode = 'date-range',
  weekStart = 0,
  fiscalYearStartMonth = 0,
  fiscalYearStartDay = 1,
  calendars = 2,
  disableWeekends = false,
  disabledDates = [],
  minRangeDays,
  maxRangeDays,
  isDateDisabled,
  validateRange,
  locale = 'en-GB',
  dateFormatOptions,
  yearFormatOptions,
  useLocaleWeekStart = false,
  rtl = false,
  timeZone,
  outputTimeZone,
  showTimeZoneLabel = false
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [weekdays, setWeekdays] = useState<Date[]>([]);
  const [weekends, setWeekends] = useState<Date[]>([]);
  const [calendarMonths, setCalendarMonths] = useState<number[]>([]);
  const [calendarYears, setCalendarYears] = useState<number[]>([]);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedHoveringDates, setSelectedHoveringDates] = useState<Date[]>([]);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const instructionsId = useId();

  const maxCalendars = Math.min(Math.max(calendars, 1), 3);
  const resolvedWeekStart = useLocaleWeekStart ? getLocaleWeekStart(locale) : weekStart;
  const resolvedTimeZone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const outputResolvedTimeZone = outputTimeZone ?? resolvedTimeZone;
  const resolvedDateFormatOptions = dateFormatOptions ?? defaultDateFormatOptions;
  const resolvedYearFormatOptions = yearFormatOptions ?? defaultYearFormatOptions;
  const displayFormatter = new Intl.DateTimeFormat(
    locale,
    { ...resolvedDateFormatOptions, timeZone: resolvedTimeZone }
  );
  const outputFormatter = new Intl.DateTimeFormat(
    locale,
    { ...resolvedDateFormatOptions, timeZone: outputResolvedTimeZone }
  );
  const datePlaceholder = getDatePlaceholder(locale, resolvedDateFormatOptions, resolvedTimeZone);
  const numberFormatter = new Intl.NumberFormat(locale);
  const timeZoneOffset = new Intl.DateTimeFormat(locale, { timeZone: resolvedTimeZone, timeZoneName: 'shortOffset' })
    .formatToParts(new Date())
    .find((part) => part.type === 'timeZoneName')?.value;

  const buildCalendarSeeds = () => {
    return Array.from({ length: maxCalendars }, (_, index) => {
      const date = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + index, 1);
      return { month: date.getMonth(), year: date.getFullYear() };
    });
  };

  useEffect(() => {
    if (calendarMonths.length === maxCalendars && calendarYears.length === maxCalendars) {
      return;
    }
    const seeds = buildCalendarSeeds();
    setCalendarMonths(seeds.map((seed) => seed.month));
    setCalendarYears(seeds.map((seed) => seed.year));
  }, [maxCalendars, displayedDate]);

  const changeCalendarMonth = (index: number, month: number) => {
    setCalendarMonths((prev) => {
      const next = [...prev];
      next[index] = month;
      return next;
    });
  };

  const changeCalendarYear = (index: number, year: number) => {
    setCalendarYears((prev) => {
      const next = [...prev];
      next[index] = year;
      return next;
    });
  };

  const alignCalendarsToMonth = (date: Date) => {
    setDisplayedDate(new Date(date.getFullYear(), date.getMonth(), 1));
    const seeds = Array.from({ length: maxCalendars }, (_, index) => {
      const monthDate = new Date(date.getFullYear(), date.getMonth() + index, 1);
      return { month: monthDate.getMonth(), year: monthDate.getFullYear() };
    });
    setCalendarMonths(seeds.map((seed) => seed.month));
    setCalendarYears(seeds.map((seed) => seed.year));
  };

  const commitDateRangeSelection = (first: Date, second: Date) => {
    const [normalizedStart, normalizedEnd] = normalizeDateRange(first, second);
    setStartDate(normalizedStart);
    setEndDate(normalizedEnd);
    setSelectedHoveringDates([]);
    alignCalendarsToMonth(normalizedStart);
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    const { weekdays, weekends } = calculateWeekdaysAndWeekends(startDate, endDate);
    setWeekdays(weekdays);
    setWeekends(weekends);
    onChange([
      weekdays.map(day => outputFormatter.format(day)),
      weekends.map(day => outputFormatter.format(day))
    ]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsCalendarVisible(false);
        setIsFadingOut(false);
        setSelectedHoveringDates([]);
        resetDates();
      }, 300);
    }
  };

  const normalizeDateKey = (date: Date) => date.toDateString();
  const getDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const disabledDateKeys = new Set(disabledDates.map(normalizeDateKey));
  const isDayDisabled = (date: Date) => {
    if (disableWeekends && isWeekend(date)) {
      return true;
    }
    if (disabledDateKeys.has(normalizeDateKey(date))) {
      return true;
    }
    if (isDateDisabled?.(date)) {
      return true;
    }
    return false;
  };

  const rangeHasDisabledDates = (start: Date, end: Date) => {
    const cursor = new Date(start);
    while (cursor <= end) {
      if (isDayDisabled(cursor)) {
        return true;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  };

  const isRangeValid = (start: Date, end: Date) => {
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const rangeDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    if (minRangeDays && rangeDays < minRangeDays) {
      return false;
    }
    if (maxRangeDays && rangeDays > maxRangeDays) {
      return false;
    }
    if (rangeHasDisabledDates(start, end)) {
      return false;
    }
    if (validateRange && !validateRange(start, end)) {
      return false;
    }
    return true;
  };

  const handleDateClick = (selectedDate: Date) => {
    if (isDayDisabled(selectedDate)) {
      return;
    }
    if (selectionMode === 'iso-week') {
      const { start, end } = getIsoWeekRange(selectedDate);
      if (!isRangeValid(start, end)) {
        return;
      }
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (selectionMode === 'week') {
      const { start, end } = getWeekRange(selectedDate, resolvedWeekStart);
      if (!isRangeValid(start, end)) {
        return;
      }
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (selectionMode === 'fiscal-week') {
      const { start, end } = getFiscalWeekRange(
        selectedDate,
        resolvedWeekStart,
        fiscalYearStartMonth,
        fiscalYearStartDay
      );
      if (!isRangeValid(start, end)) {
        return;
      }
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (!startDate || endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectedHoveringDates([]);
    } else if (isRangeValid(startDate, selectedDate)) {
      commitDateRangeSelection(startDate, selectedDate);
    }
  };

  const handleTextFieldClick = () => {
    if (!isCalendarVisible) {
      setIsCalendarVisible(true);
    }
  };

  const handlePickClick = () => {
    if (startDate && endDate) {
      handleDateRangeChange(startDate, endDate);
    }
    setIsCalendarVisible(false);
  };
 

  useEffect(() => {
    console.log('selected theme is .', selectedTheme)
    if (isCalendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarVisible]);

  useEffect(() => {
    if (!isCalendarVisible) {
      return;
    }
    if (!focusedDate) {
      setFocusedDate(startDate ?? new Date());
      return;
    }
    const key = getDateKey(focusedDate);
    const element = calendarRef.current?.querySelector<HTMLElement>(`[data-date="${key}"]`);
    element?.focus();
  }, [isCalendarVisible, focusedDate, startDate]);

  const renderCalendar = () => {
    const monthConfigs = Array.from({ length: maxCalendars }, (_, index) => {
      const month = calendarMonths[index] ?? displayedDate.getMonth() + index;
      const year = calendarYears[index] ?? displayedDate.getFullYear();
      const date = new Date(year, month, 1);
      return {
        month: date.getMonth(),
        year: date.getFullYear(),
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      };
    });

    const baseDayLabels = Array.from({ length: 7 }, (_, i) => {
      const base = new Date(Date.UTC(2021, 7, 1 + i, 12)); // Sunday start, avoid TZ drift
      return new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: resolvedTimeZone }).format(base);
    });
    const dayLabels = resolvedWeekStart === 1
      ? [...baseDayLabels.slice(1), baseDayLabels[0]]
      : baseDayLabels;
    const today = new Date();

    const updateHoveringDates = (day: Date | null) => {
      if (day && isDayDisabled(day)) {
        return;
      }
      if (selectionMode === 'iso-week' && day) {
        const { start, end } = getIsoWeekRange(day);
        if (!isRangeValid(start, end)) {
          return;
        }
        const cursor = new Date(start);
        const newSelectedDates: Date[] = [];
        while (cursor <= end) {
          newSelectedDates.push(new Date(cursor));
          cursor.setDate(cursor.getDate() + 1);
        }
        setSelectedHoveringDates(newSelectedDates);
        return;
      }
      if (selectionMode === 'week' && day) {
        const { start, end } = getWeekRange(day, resolvedWeekStart);
        if (!isRangeValid(start, end)) {
          return;
        }
        const cursor = new Date(start);
        const newSelectedDates: Date[] = [];
        while (cursor <= end) {
          newSelectedDates.push(new Date(cursor));
          cursor.setDate(cursor.getDate() + 1);
        }
        setSelectedHoveringDates(newSelectedDates);
        return;
      }
      if (selectionMode === 'fiscal-week' && day) {
        const { start, end } = getFiscalWeekRange(
          day,
          resolvedWeekStart,
          fiscalYearStartMonth,
          fiscalYearStartDay
        );
        if (!isRangeValid(start, end)) {
          return;
        }
        const cursor = new Date(start);
        const newSelectedDates: Date[] = [];
        while (cursor <= end) {
          newSelectedDates.push(new Date(cursor));
          cursor.setDate(cursor.getDate() + 1);
        }
        setSelectedHoveringDates(newSelectedDates);
        return;
      }

      if (startDate && endDate) {
        return;
      }

      if (startDate && day) {
        let newSelectedDates: Date[] = [];

        const fiveYearsInMs = 5 * 365 * 24 * 60 * 60 * 1000;
        const startDateMs = startDate.getTime();
        const dayMs = day.getTime();

        if (dayMs < (startDateMs - fiveYearsInMs) || dayMs > (startDateMs + fiveYearsInMs)) {
          return;
        }

        const [previewStart, previewEnd] = normalizeDateRange(startDate, day);
        const currentDate = new Date(previewStart);

        while (currentDate <= previewEnd) {
          if (!isDayDisabled(currentDate)) {
            newSelectedDates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setSelectedHoveringDates(newSelectedDates);
      }
    };

    const getNextFocusableDate = (base: Date, deltaDays: number) => {
      const candidate = new Date(base);
      candidate.setDate(candidate.getDate() + deltaDays);
      let attempts = 0;
      while (attempts < 370 && isDayDisabled(candidate)) {
        candidate.setDate(candidate.getDate() + Math.sign(deltaDays || 1));
        attempts += 1;
      }
      return candidate;
    };

    const handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!focusedDate) {
        return;
      }
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, -1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, -7));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, 7));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, -((focusedDate.getDay() - resolvedWeekStart + 7) % 7)));
          break;
        case 'End':
          event.preventDefault();
          setFocusedDate(getNextFocusableDate(focusedDate, 6 - ((focusedDate.getDay() - resolvedWeekStart + 7) % 7)));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleDateClick(focusedDate);
          break;
        case 'Escape':
          event.preventDefault();
          setIsCalendarVisible(false);
          break;
        default:
          break;
      }
    };

    const selectedHoveringMin = selectedHoveringDates.length
      ? new Date(Math.min(...selectedHoveringDates.map((day) => day.getTime())))
      : null;
    const selectedHoveringMax = selectedHoveringDates.length
      ? new Date(Math.max(...selectedHoveringDates.map((day) => day.getTime())))
      : null;
    const hasPreviewRange = Boolean(startDate && !endDate && selectedHoveringDates.length);
    const rangeStartDay = startDate && endDate
      ? startDate
      : hasPreviewRange
        ? selectedHoveringMin
        : startDate;
    const rangeEndDay = startDate && endDate
      ? endDate
      : hasPreviewRange
        ? selectedHoveringMax
        : null;

    const getRangeClassName = (day: Date | null, isInRange: boolean, isSelected: boolean) => {
      if (!day) {
        return 'day';
      }
      const hasConfirmedRange = Boolean(startDate && endDate);
      const isRangeStart = Boolean(rangeStartDay && isSameCalendarDay(day, rangeStartDay));
      const isRangeEnd = Boolean(rangeEndDay && isSameCalendarDay(day, rangeEndDay));
      const isSingleRange = isRangeStart && isRangeEnd;
      const isHoverRangeStart = hasPreviewRange && selectedHoveringMin && isSameCalendarDay(day, selectedHoveringMin);
      const isHoverRangeEnd = hasPreviewRange && selectedHoveringMax && isSameCalendarDay(day, selectedHoveringMax);
      const isSegmentStart = Boolean(
        isInRange && !isRangeStart && isWeekRowStart(day, resolvedWeekStart)
      );
      const isSegmentEnd = Boolean(
        isInRange && !isRangeEnd && isWeekRowEnd(day, resolvedWeekStart)
      );

      const classes = ['day'];
      if (isDayDisabled(day)) {
        classes.push('disabled');
      }
      if (isInRange || isSelected) {
        classes.push(isSelected && hasPreviewRange ? 'hover-range' : 'in-range');
      }
      if (isSingleRange) {
        classes.push('range-single');
      } else {
        if (isRangeStart || isSegmentStart) {
          classes.push(rtl ? 'range-end' : 'range-start');
        }
        if (isRangeEnd || isSegmentEnd) {
          classes.push(rtl ? 'range-start' : 'range-end');
        }
      }
      if (isHoverRangeStart) {
        classes.push(rtl ? 'hover-range-end' : 'hover-range-start');
      }
      if (isHoverRangeEnd) {
        classes.push(rtl ? 'hover-range-start' : 'hover-range-end');
      }
      if (isHoverRangeStart && isHoverRangeEnd) {
        classes.push('hover-range-single');
      }
      return classes.join(' ');
    };

    return (
      <div>
        <div className="calendar-header">
          <div className="calendar-grid">
            {monthConfigs.map((config, calendarIndex) => {
              const days = generateDays(config.start, config.end, resolvedWeekStart);
              return (
                <div
                  key={`${config.year}-${config.month}`}
                  className="month-main-wrapper"
                  id={`calendar-${calendarIndex}`}
                >
                  {/* MONTH LABEL */}
                  <div className="month-label">
                    <select
                      value={config.month}
                      onChange={(e) => changeCalendarMonth(calendarIndex, Number(e.target.value))}
                    >
                      {monthOptions}
                    </select>
                    <select
                      value={config.year}
                      onChange={(e) => changeCalendarYear(calendarIndex, Number(e.target.value))}
                    >
                      {generateYearOptions(config.year - 10, 21).map((year) => (
                        <option key={year} value={year}>
                          {formatYear(year, locale, resolvedYearFormatOptions, resolvedTimeZone)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* CALENDAR */}
                  <div
                    className="calendar"
                    role="grid"
                    aria-label={`${new Intl.DateTimeFormat(locale, { month: 'long', ...resolvedYearFormatOptions, timeZone: resolvedTimeZone }).format(new Date(Date.UTC(config.year, config.month, 1, 12)))}`}
                    aria-describedby={instructionsId}
                    onMouseLeave={() => setSelectedHoveringDates([])}
                    onKeyDown={handleGridKeyDown}
                  >
                    {/* DAY LABELS */}
                    <div className="day-labels">
                      {dayLabels.map((label) => (
                        <div key={label} className="day-label" role="columnheader">{label}</div>
                      ))}
                    </div>
                    {/* DAYS */}
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={index} className="day empty" aria-hidden="true" />;
                      }
                      const isInRange = Boolean(
                        rangeStartDay &&
                        rangeEndDay &&
                        day >= rangeStartDay &&
                        day <= rangeEndDay
                      );
                      const isSelected = hasPreviewRange && selectedHoveringDates.some(
                        (selectedDay) => isSameCalendarDay(selectedDay, day)
                      );
                      const isFiscalStartDate = selectionMode === 'fiscal-week' && day
                        ? day.getMonth() === fiscalYearStartMonth && day.getDate() === fiscalYearStartDay
                        : false;
                      const isFocused = focusedDate?.toDateString() === day.toDateString();
                      const isDisabled = isDayDisabled(day);
                      return (
                        <div
                          key={index}
                          className={getRangeClassName(day, Boolean(isInRange), isSelected)}
                          role="gridcell"
                          aria-selected={Boolean(isInRange)}
                          aria-disabled={isDisabled}
                          tabIndex={isFocused ? 0 : -1}
                          data-date={getDateKey(day)}
                          onClick={() => handleDateClick(day)}
                          onMouseEnter={() => updateHoveringDates(day)}
                          onFocus={() => setFocusedDate(day)}
                          style={day ? getDayStyles(selectedTheme)(
                            day,
                            today,
                            isInRange,
                            isSelected,
                            rangeStartDay,
                            rangeEndDay,
                            isWeekend(day),
                            true,
                            isFiscalStartDate
                          ) : {}}
                        >
                          {numberFormatter.format(day.getDate())}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* PREDEFINED RANGES */}
          <div className="predefined-ranges">
            {predefinedRangesList.map(({ label, range }, index) => (
              <button key={index} onClick={() => handlePredefinedRange(range)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="calendar-footer">
          <button className="pick-button" onClick={handlePickClick} >Pick</button>
          <button className="reset-button" onClick={resetDates}>Reset Dates</button>
        </div>
      </div>

    );
  };

  const handlePredefinedRange = (range: DateRange) => {
    const [normalizedStart, normalizedEnd] = normalizeDateRange(range[0], range[1]);
    setStartDate(normalizedStart);
    setEndDate(normalizedEnd);
    setSelectedHoveringDates([]);
    alignCalendarsToMonth(normalizedStart);
    handleDateRangeChange(normalizedStart, normalizedEnd);
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={i}>
      {new Intl.DateTimeFormat(locale, { month: 'long', timeZone: resolvedTimeZone }).format(new Date(Date.UTC(2021, i, 1, 12)))}
    </option>
  ));

  // Reset function to clear all dates
  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedHoveringDates([]);
    setDisplayedDate(new Date());
    const seeds = buildCalendarSeeds();
    setCalendarMonths(seeds.map((seed) => seed.month));
    setCalendarYears(seeds.map((seed) => seed.year));
  };


  useEffect(() => {
    if (isCalendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarVisible]);

  return (
    <div
      className={`weekday-date-range-picker date-picker-container${selectedTheme.usePlaceboShadow ? ' placebo-theme' : ''}${rtl ? ' rtl' : ''}`}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="input-wrapper">
        <p id={instructionsId} className="sr-only">
          Use arrow keys to move between dates. Press Enter or Space to select. Press Escape to close.
        </p>
        {showTimeZoneLabel && (
          <div className="time-zone-label">
            Time zone: {resolvedTimeZone}{timeZoneOffset ? ` (${timeZoneOffset})` : ''}
          </div>
        )}
        <div className="card-info">
          Please select your date range and hit pick to make a selection.
        </div>
        <div className="input-wrapper-main">
          <div className="input-group">
            <label>Start Date</label>
            <input
              type="text"
              readOnly={true}
              value={startDate ? displayFormatter.format(startDate) : ''}
              placeholder={datePlaceholder}
              onClick={handleTextFieldClick}
              className="date-range-input"
            />
          </div>
          <div className="input-group">
            <label>End Date</label>
            <input
              type="text"
              readOnly={true}
              value={endDate ? displayFormatter.format(endDate) : ''}
              placeholder={datePlaceholder}
              onClick={handleTextFieldClick}
              className="date-range-input"
            />
          </div>
        </div>
      </div>
      {isCalendarVisible && (
        <div ref={calendarRef} className={`calendar-wrapper ${isFadingOut ? 'fade-out' : ''}`}>
          {renderCalendar()} {/* Render calendar content */}
        </div>
      )}
    </div>
  );
};

export default WeekdayDateRangePicker;