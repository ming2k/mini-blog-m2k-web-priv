import React, { useState } from 'react';
import styles from './Calendar.module.css';

const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  // 0 = Sunday, 1 = Monday, ...
  let day = new Date(year, month, 1).getDay();
  // Convert so Monday is 0, Sunday is 6
  return (day + 6) % 7;
}

function getToday() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

export default function Calendar() {
  const today = getToday();
  const [current, setCurrent] = useState({ year: today.year, month: today.month });
  const [selected, setSelected] = useState(today);

  const daysInMonth = getDaysInMonth(current.year, current.month);
  const prevMonth = current.month === 0 ? 11 : current.month - 1;
  const prevYear = current.month === 0 ? current.year - 1 : current.year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  const firstDayOfWeek = getFirstDayOfWeek(current.year, current.month);

  // Build calendar grid
  let days = [];
  // Days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      day: daysInPrevMonth - firstDayOfWeek + i + 1,
      outside: true,
      date: new Date(prevYear, prevMonth, daysInPrevMonth - firstDayOfWeek + i + 1),
    });
  }
  // Days in current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      outside: false,
      date: new Date(current.year, current.month, i),
    });
  }
  // Days from next month
  while (days.length % 7 !== 0) {
    days.push({
      day: days.length - (firstDayOfWeek + daysInMonth) + 1,
      outside: true,
      date: new Date(current.year, current.month + 1, days.length - (firstDayOfWeek + daysInMonth) + 1),
    });
  }

  function handlePrev() {
    setCurrent(cur => cur.month === 0 ? { year: cur.year - 1, month: 11 } : { year: cur.year, month: cur.month - 1 });
  }
  function handleNext() {
    setCurrent(cur => cur.month === 11 ? { year: cur.year + 1, month: 0 } : { year: cur.year, month: cur.month + 1 });
  }
  function handleSelect(dayObj) {
    if (!dayObj.outside) {
      setSelected({ year: current.year, month: current.month, day: dayObj.day });
    }
  }

  return (
    <div className={styles.calendarSection}>
      <div className={styles.calendarHeader}>
        <button className={styles.arrow} onClick={handlePrev} aria-label="Previous month">&#60;</button>
        <span className={styles.monthYear}>
          {new Date(current.year, current.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button className={styles.arrow} onClick={handleNext} aria-label="Next month">&#62;</button>
      </div>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            {WEEK_DAYS.map(d => <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: days.length / 7 }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((dayObj, i) => {
                const isToday =
                  dayObj.day === today.day &&
                  current.month === today.month &&
                  current.year === today.year &&
                  !dayObj.outside;
                const isSelected =
                  selected.day === dayObj.day &&
                  selected.month === current.month &&
                  selected.year === current.year &&
                  !dayObj.outside;
                return (
                  <td
                    key={i}
                    className={
                      `${dayObj.outside ? styles.outside : ''} ` +
                      `${isToday ? styles.today : ''} ` +
                      `${isSelected ? styles.selected : ''}`
                    }
                    onClick={() => handleSelect(dayObj)}
                  >
                    {dayObj.day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 