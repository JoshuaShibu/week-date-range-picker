import React, { useState, useEffect, useRef } from 'react';
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
  getFiscalWeekRange
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
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges = [],
  onChange,
  title,
  selectedTheme,
  selectionMode = 'date-range',
  weekStart = 0,
  fiscalYearStartMonth = 0,
  fiscalYearStartDay = 1
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [weekdays, setWeekdays] = useState<Date[]>([]);
  const [weekends, setWeekends] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(displayedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(displayedDate.getFullYear());
  const [nextMonth, setNextMonth] = useState(displayedDate.getMonth() + 1);
  const [nextYear, setNextYear] = useState(displayedDate.getFullYear());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedHoveringDates, setSelectedHoveringDates] = useState<Date[]>([]);

  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState<Date>(
    new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1)
  );
  const [endOfCurrentMonth, setEndOfCurrentMonth] = useState<Date>(
    new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0)
  );

  const [startOfNextMonth, setStartOfNextMonth] = useState<Date>(
    new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1)
  );
  const [endOfNextMonth, setEndOfNextMonth] = useState<Date>(
    new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 2, 0)
  );

  const changeCurrentMonth = (month: React.SetStateAction<number>) => {
    setCurrentMonth(month);
  };

  const tenYearsBack = currentYear - 10;
  const currentMonthYearOptions = generateYearOptions(tenYearsBack, 11);
  const nextMonthYearOptions = generateYearOptions(currentYear, 21);

  const changeCurrentYear = (year: React.SetStateAction<number>) => {
    setCurrentYear(year);
  };

  const changeNextMonth = (month: React.SetStateAction<number>) => {
    setNextMonth(month);
  };

  const changeNextYear = (year: React.SetStateAction<number>) => {
    setNextYear(year);
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    const { weekdays, weekends } = calculateWeekdaysAndWeekends(startDate, endDate);
    setWeekdays(weekdays);
    setWeekends(weekends);
    onChange([weekdays.map(day => day.toLocaleDateString('en-GB')), weekends.map(day => day.toLocaleDateString('en-GB'))]);
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

  const handleDateClick = (selectedDate: Date) => {
    if (selectionMode === 'iso-week') {
      const { start, end } = getIsoWeekRange(selectedDate);
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (selectionMode === 'week') {
      const { start, end } = getWeekRange(selectedDate, weekStart);
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (selectionMode === 'fiscal-week') {
      const { start, end } = getFiscalWeekRange(
        selectedDate,
        weekStart,
        fiscalYearStartMonth,
        fiscalYearStartDay
      );
      setStartDate(start);
      setEndDate(end);
      return;
    }
    if (!startDate || endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else {
      if (selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
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
    const updateMonthBoundaries = () => {
      setStartOfCurrentMonth(new Date(currentYear, currentMonth, 1));
      setEndOfCurrentMonth(new Date(currentYear, currentMonth + 1, 0));
      setStartOfNextMonth(new Date(nextYear, nextMonth, 1));
      setEndOfNextMonth(new Date(nextYear, nextMonth + 1, 0));
    };

    updateMonthBoundaries();
  }, [currentMonth, currentYear, nextMonth, nextYear, displayedDate]);

  const renderCalendar = () => {
    const currentMonthDays = generateDays(startOfCurrentMonth, endOfCurrentMonth, weekStart);
    const nextMonthDays = generateDays(startOfNextMonth, endOfNextMonth, weekStart);

    const baseDayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const dayLabels = weekStart === 1
      ? [...baseDayLabels.slice(1), baseDayLabels[0]]
      : baseDayLabels;
    const today = new Date();

    const updateHoveringDates = (day: Date | null) => {
      if (selectionMode === 'iso-week' && day) {
        const { start, end } = getIsoWeekRange(day);
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
        const { start, end } = getWeekRange(day, weekStart);
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
          weekStart,
          fiscalYearStartMonth,
          fiscalYearStartDay
        );
        const cursor = new Date(start);
        const newSelectedDates: Date[] = [];
        while (cursor <= end) {
          newSelectedDates.push(new Date(cursor));
          cursor.setDate(cursor.getDate() + 1);
        }
        setSelectedHoveringDates(newSelectedDates);
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

        const currentDate = new Date(startDate);

        if (day >= startDate) {
          while (currentDate <= day) {
            newSelectedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } else {
          while (currentDate >= day) {
            newSelectedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() - 1);
          }
        }
        setSelectedHoveringDates(newSelectedDates);
      }
    };

    const selectedHoveringMin = selectedHoveringDates.length
      ? new Date(Math.min(...selectedHoveringDates.map((day) => day.getTime())))
      : null;
    const selectedHoveringMax = selectedHoveringDates.length
      ? new Date(Math.max(...selectedHoveringDates.map((day) => day.getTime())))
      : null;

    const getRangeClassName = (day: Date | null, isInRange: boolean, isSelected: boolean) => {
      if (!day) {
        return 'day';
      }
      const hasStart = Boolean(startDate);
      const hasConfirmedRange = Boolean(startDate && endDate);
      const isRangeStart = hasConfirmedRange
        ? startDate && day.toDateString() === startDate.toDateString()
        : hasStart && startDate && day.toDateString() === startDate.toDateString();
      const isRangeEnd = hasConfirmedRange
        ? endDate && day.toDateString() === endDate.toDateString()
        : false;
      const isSingleRange = isRangeStart && isRangeEnd;
      const isHoverRangeStart = selectedHoveringMin && day.toDateString() === selectedHoveringMin.toDateString();
      const isHoverRangeEnd = selectedHoveringMax && day.toDateString() === selectedHoveringMax.toDateString();

      const classes = ['day'];
      if (isInRange || isSelected) {
        classes.push(isSelected ? 'hover-range' : 'in-range');
      }
      if (isSingleRange) {
        classes.push('range-single');
      } else {
        if (isRangeStart) {
          classes.push('range-start');
        }
        if (isRangeEnd) {
          classes.push('range-end');
        }
      }
      if (isSelected && isHoverRangeStart) {
        classes.push('hover-range-start');
      }
      if (isSelected && isHoverRangeEnd) {
        classes.push('hover-range-end');
      }
      if (isSelected && isHoverRangeStart && isHoverRangeEnd) {
        classes.push('hover-range-single');
      }
      return classes.join(' ');
    };

    return (
      <div>
        <div className="calendar-header">
          <div className="calendar-grid">
            {/* Current Month Calendar */}
            <div className="month-main-wrapper" id="currentMonthCalendar">
              <div className="month-label">
                <select value={currentMonth} onChange={(e) => changeCurrentMonth(Number(e.target.value))}>
                  {monthOptions}
                </select>
                <select value={currentYear} onChange={(e) => changeCurrentYear(Number(e.target.value))}>
                  {currentMonthYearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="calendar" onMouseLeave={() => setSelectedHoveringDates([])}>
                <div className="day-labels">
                  {dayLabels.map((label) => (
                    <div key={label} className="day-label">{label}</div>
                  ))}
                </div>
                {currentMonthDays.map((day, index) => {
                  const isInRange = startDate && endDate && day &&
                    day >= startDate && day <= endDate;
                  const isSelected = selectedHoveringDates.some(
                    (selectedDay) => selectedDay.toDateString() === day?.toDateString()
                  );
                  const isFiscalStartDate = selectionMode === 'fiscal-week' && day
                    ? day.getMonth() === fiscalYearStartMonth && day.getDate() === fiscalYearStartDay
                    : false;
                  return (
                    <div
                      key={index}
                      className={getRangeClassName(day, Boolean(isInRange), isSelected)}
                      onClick={() => handleDateClick(day!)}
                      onMouseEnter={() => updateHoveringDates(day)}
                      style={day ? getDayStyles(selectedTheme)(
                        day,
                        today,
                        isInRange,
                        isSelected,
                        startDate,
                        endDate,
                        isWeekend(day),
                        true,
                        isFiscalStartDate
                      ) : {}}
                    >
                      {day ? day.getDate() : ''}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Month Calendar */}
            <div className="month-main-wrapper" id="nextMonthCalendar">
              <div className="month-label">
                <select value={nextMonth} onChange={(e) => changeNextMonth(Number(e.target.value))}>
                  {monthOptions}
                </select>
                <select value={nextYear} onChange={(e) => changeNextYear(Number(e.target.value))}>
                  {nextMonthYearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="calendar" onMouseLeave={() => setSelectedHoveringDates([])}>
                <div className="day-labels">
                  {dayLabels.map((label) => (
                    <div key={label} className="day-label">{label}</div>
                  ))}
                </div>
                {nextMonthDays.map((day, index) => {
                  const isInRange = startDate && endDate && day &&
                    day >= startDate && day <= endDate;
                  const isSelected = selectedHoveringDates.some(
                    (selectedDay) => selectedDay.toDateString() === day?.toDateString()
                  );
                  const isFiscalStartDate = selectionMode === 'fiscal-week' && day
                    ? day.getMonth() === fiscalYearStartMonth && day.getDate() === fiscalYearStartDay
                    : false;
                  return (
                    <div
                      key={index}
                      className={getRangeClassName(day, Boolean(isInRange), isSelected)}
                      onClick={() => day && handleDateClick(day!)}
                      onMouseEnter={() => updateHoveringDates(day)}
                      onMouseLeave={() => setSelectedHoveringDates([])}
                      style={day ? getDayStyles(selectedTheme)(
                        day,
                        today,
                        isInRange,
                        isSelected,
                        startDate,
                        endDate,
                        isWeekend(day),
                        true,
                        isFiscalStartDate
                      ) : {}}
                    >
                      {day ? day.getDate() : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="predefined-ranges">
            {predefinedRangesList.map(({ label, range }, index) => (
              <button key={index} onClick={() => handlePredefinedRange(range)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="calendar-footer">
          <button className="pick-button" onClick={handlePickClick} >Pick</button>
          <button className="reset-button" onClick={resetDates}>Reset Dates</button>
        </div>
      </div>

    );
  };

  const handlePredefinedRange = (range: DateRange) => {
    const [start, end] = range;
    setStartDate(start);
    setEndDate(end);
    setDisplayedDate(new Date(start.getFullYear(), start.getMonth(), 1));
    handleDateRangeChange(start, end);
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={i}>
      {new Date(0, i).toLocaleString('default', { month: 'long' })}
    </option>
  ));

  // Reset function to clear all dates
  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedHoveringDates([]);
    setCurrentMonth(displayedDate.getMonth());
    setCurrentYear(displayedDate.getFullYear());
    setNextMonth(displayedDate.getMonth() + 1);
    setNextYear(displayedDate.getFullYear());
    setDisplayedDate(new Date());
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

  useEffect(() => {
    const updateMonthBoundaries = () => {
      setStartOfCurrentMonth(new Date(currentYear, currentMonth, 1));
      setEndOfCurrentMonth(new Date(currentYear, currentMonth + 1, 0));
      setStartOfNextMonth(new Date(nextYear, nextMonth, 1));
      setEndOfNextMonth(new Date(nextYear, nextMonth + 1, 0));
    };

    updateMonthBoundaries();
  }, [currentMonth, currentYear, nextMonth, nextYear, displayedDate]);

  return (
    <div className="weekday-date-range-picker date-picker-container">
      <div className="input-wrapper">
        <div className="card-info">
          Please select your date range and hit pick to make a selection.
        </div>
        <div className="input-wrapper-main">
          <div className="input-group">
            <label>Start Date</label>
            <input
              type="text"
              readOnly={true}
              value={startDate ? startDate.toLocaleDateString('en-GB') : ''}
              placeholder="DD/MM/YY"
              onClick={handleTextFieldClick}
              className="date-range-input"
            />
          </div>
          <div className="input-group">
            <label>End Date</label>
            <input
              type="text"
              readOnly={true}
              value={endDate ? endDate.toLocaleDateString('en-GB') : ''}
              placeholder="DD/MM/YY"
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