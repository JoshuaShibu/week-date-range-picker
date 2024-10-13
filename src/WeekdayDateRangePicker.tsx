import React, { useState, useEffect, useRef } from 'react';
import { isWeekend, calculateWeekdaysAndWeekends, generateYearOptions, generateDays, predefinedRangesList } from './helpers';


type DateRange = [Date, Date];
type WeekendDates = Date[];

interface WeekdayDateRangePickerProps {
  predefinedRanges?: DateRange[];
  onChange: (range: [string[], string[]]) => void;
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({ predefinedRanges = [], onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  // States to store weekdays and weekends will be used to supn out for UI or Arrays it needed.
  const [weekdays, setWeekdays] = useState<Date[]>([]);
  const [weekends, setWeekends] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(displayedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(displayedDate.getFullYear());
  const [nextMonth, setNextMonth] = useState(displayedDate.getMonth() + 1);
  const [nextYear, setNextYear] = useState(displayedDate.getFullYear());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedHoveringDates, setSelectedHoveringDates] = useState<Date[]>([]);

  // State vars for each calendar
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
    // Ensure that these dates are passed up to the parent component if necessary
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

  const handleDateClick = (selectedDate: any) => {
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

  const renderCalendar = () => {
    const currentMonthDays = generateDays(startOfCurrentMonth, endOfCurrentMonth);
    const nextMonthDays = generateDays(startOfNextMonth, endOfNextMonth);

    const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const today = new Date();


    const updateHoveringDates = (day: Date | null) => {
      if (startDate && day) {
        let newSelectedDates: Date[] = [];

        // Calculate the time difference from the start date
        const fiveYearsInMs = 5 * 365 * 24 * 60 * 60 * 1000; // Approximation of 5 years in milliseconds
        const startDateMs = startDate.getTime();
        const dayMs = day.getTime();

        // Check if the hovered day is more than 5 years back or in the future
        if (dayMs < (startDateMs - fiveYearsInMs) || dayMs > (startDateMs + fiveYearsInMs)) {
          console.log("Hovered date is out of the valid range.");
          return; // Exit early if the day is out of the 5-year range
        }

        const currentDate = new Date(startDate);

        // Forward selection
        if (day >= startDate) {
          while (currentDate <= day) {
            newSelectedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        // Reverse selection
        else {
          while (currentDate >= day) {
            newSelectedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() - 1);
          }
        }
        setSelectedHoveringDates(newSelectedDates);
      }
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
              <div className="calendar">
                <div className="day-labels">
                  {dayLabels.map((label) => (
                    <div key={label} className="day-label">{label}</div>
                  ))}
                </div>
                {currentMonthDays.map((day, index) => {
                  const isInRange = startDate && endDate && day &&
                    day >= startDate && day <= endDate && !isWeekend(day);
                  const isSelected = selectedHoveringDates.some(
                    (selectedDay) => selectedDay.toDateString() === day?.toDateString()
                  );
                  return (
                    <div
                      key={index}
                      className={`day ${isWeekend(day) ? 'weekend' : ''} 
                    ${isSelected ? 'hover-highlight' : ''}
                    ${day && startDate && day.getTime() === startDate.getTime() ? 'selected' : ''} 
                    ${day && endDate && day.getTime() === endDate.getTime() ? 'selected' : ''} 
                    ${day && isInRange ? 'range-highlight' : ''}  
                    ${day && today.toDateString() === day.toDateString() ? 'today' : ''}`}
                      onClick={() => day && handleDateClick(day!)}
                      onMouseEnter={() => updateHoveringDates(day)}
                      onMouseLeave={() => setSelectedHoveringDates([])}
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
              <div className="calendar">
                <div className="day-labels">
                  {dayLabels.map((label) => (
                    <div key={label} className="day-label">{label}</div>
                  ))}
                </div>
                {nextMonthDays.map((day, index) => {
                  const isInRange = startDate && endDate && day &&
                    day >= startDate && day <= endDate && !isWeekend(day);
                   const isSelected = selectedHoveringDates.some(
                    (selectedDay) => selectedDay.toDateString() === day?.toDateString()
                  );
                  return (
                    <div
                      key={index}
                      className={`day ${isWeekend(day) ? 'weekend' : ''} 
                    ${day && startDate && day.getTime() === startDate.getTime() ? 'selected' : ''} 
                    ${day && endDate && day.getTime() === endDate.getTime() ? 'selected' : ''} 
                    ${day && isInRange ? 'range-highlight' : ''} 
                    ${isSelected ? 'hover-highlight' : ''}
                    ${day && day.getMonth() !== startOfNextMonth.getMonth() ? 'inactive' : ''} 
                    ${day && today.toDateString() === day.toDateString() ? 'today' : ''}`}
                      onClick={() => day && handleDateClick(day!)}
                      onMouseEnter={() => updateHoveringDates(day)}
                      onMouseLeave={() => setSelectedHoveringDates([])}
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
    <div className="date-picker-container">
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