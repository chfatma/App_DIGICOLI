import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, addYears, subYears } from 'date-fns';
import './Calendrier.css';

// Fetch holidays from a public API
const fetchHolidays = async (year) => {
  // Example API, replace with actual API
  const response = await axios.get(`https://date.nager.at/Api/v2/PublicHolidays/${year}/TN`);
  return response.data.map(holiday => format(new Date(holiday.date), 'dd-MM'));
};

const generateCalendar = (year, month, holidays) => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start, end });

  return days.map(day => {
    const dayStr = format(day, 'dd-MM');
    const isSunday = getDay(day) === 0;
    const isHoliday = holidays.includes(dayStr);
    return {
      date: format(day, 'd'),
      isSunday,
      isHoliday,
    };
  });
};

const Calendrier = () => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateCalendar = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const holidays = await fetchHolidays(year);
    setHolidays(holidays);
    setCalendarDays(generateCalendar(year, month, holidays));
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const handleNextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation">
        <button onClick={handlePrevYear}>Previous Year</button>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}>Next Month</button>
        <button onClick={handleNextYear}>Next Year</button>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-day-name">Sun</div>
          <div className="calendar-day-name">Mon</div>
          <div className="calendar-day-name">Tue</div>
          <div className="calendar-day-name">Wed</div>
          <div className="calendar-day-name">Thu</div>
          <div className="calendar-day-name">Fri</div>
          <div className="calendar-day-name">Sat</div>
        </div>
        <div className="calendar-body">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.isSunday ? 'sunday' : ''} ${day.isHoliday ? 'holiday' : ''}`}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendrier;
