import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';
import ProgressSection from './ProgressSection';



function App() {
  const timeRefs = useRef([]);
  const barRefs = useRef([]);

  const festivals = useMemo(() => ({
    "Fall Equinox": { date: new Date("09-23"), emoji: "🍂" },
    "Winter Solstice": { date: new Date("12-21"), emoji: "❄️" },
    "Spring Equinox": { date: new Date("03-20"), emoji: "🌸" },
    "Summer Solstice": { date: new Date("06-21"), emoji: "☀️" },
    "World Wildlife Day": { date: new Date("03-03"), emoji: "🐾" },
    "International Day Of Forests": { date: new Date("03-21"), emoji: "🌳" },
    "Community Supported Agriculture Day": { date: new Date("04-05"), emoji: "🌱" },
    "Earth Day": { date: new Date("04-22"), emoji: "🌍" },
    "World Fair Trade Day": { date: new Date("05-10"), emoji: "🤝" },
    "National Gardening Week": { date: new Date("06-01"), emoji: "🌻" },
    "Winter Olympics": { date: new Date("2026-02-06"), emoji: "❄️", year: 2026 },
    "Summer Olympics": { date: new Date("2028-07-14"), emoji: "☀️", year: 2028 },
    "My Birthday": { date: new Date("01-11"), emoji: "🎂" },
  }), []);

  const setTime = useCallback((timeLeft, bar, index) => {
    if (timeRefs.current[index]) {
      timeRefs.current[index].innerText = timeLeft;
    }
    if (barRefs.current[index]) {
      barRefs.current[index].style.width = bar + "%";
    }
  }, []);

  const nextMinute = useCallback(() => {
    let second = new Date().getSeconds();
    let secondsLeft = 60 - second;
    setTime(secondsLeft, (60 - secondsLeft) * 1.6667, 0);
  }, [setTime]);

  const nextHour = useCallback(() => {
    let minute = new Date().getMinutes();
    setTime(Math.floor(60 - minute), minute * 1.666, 1);
  }, [setTime]);

  const nextDay = useCallback(() => {
    let hours = new Date().getHours();
    setTime(Math.floor(24 - hours), hours * 4.16, 2);
  }, [setTime]);

  const nextWeek = useCallback(() => {
    let day = new Date().getDay();
    setTime(Math.floor(7 - day), day * 14.28, 3);
  }, [setTime]);

  const getDaysInCurrentMonth = useCallback(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    return lastDayOfCurrentMonth;
  }, []);

  const nextMonth = useCallback(() => {
    let hours = new Date().getUTCDate();
    setTime(
      Math.floor(getDaysInCurrentMonth() - hours),
      hours * (getDaysInCurrentMonth() === 31 ? 2.94 : 3.333),
      4
    );
  }, [setTime, getDaysInCurrentMonth]);

  const daysUntilNextEvent = useCallback((eventDate, index, eventYear) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextEventDate = new Date(eventDate);

    if (eventYear) {
      // For events with a specific year (like Olympics)
      nextEventDate.setFullYear(eventYear);
    } else {
      // For annual events
      nextEventDate.setFullYear(currentYear);
      if (today > nextEventDate) {
        nextEventDate.setFullYear(currentYear + 1);
      }
    }

    const timeDifference = nextEventDate - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate progress percentage
    let progressPercentage;
    if (eventYear) {
      // For events with a specific year, calculate progress since the start of the current year
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const totalDays = (nextEventDate - yearStart) / (1000 * 60 * 60 * 24);
      const daysPassed = (today - yearStart) / (1000 * 60 * 60 * 24);
      progressPercentage = (daysPassed / totalDays) * 100;
    } else {
      // For annual events, use the existing calculation
      progressPercentage = ((365 - daysLeft) / 365) * 100;
    }

    setTime(daysLeft, progressPercentage, index);
  }, [setTime]);

  useEffect(() => {
    const updateTimes = () => {
      nextMonth();
      nextWeek();
      nextDay();
      nextMinute();
      nextHour();
      Object.entries(festivals).forEach(([name, { date, year }], index) => {
        daysUntilNextEvent(date, index + 6, year);
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [nextMinute, nextHour, nextDay, nextWeek, nextMonth, daysUntilNextEvent, festivals]);

  return (
    <>
      <header>
        <h4>Solar Punk Progress</h4>
        <div class="wrapper">
          <div id="root"></div>
        </div>
      </header>
      <main>
        <ProgressSection title="Next Minute" timeUnit="seconds" emoji="🕑" index={0} timeRefs={timeRefs} barRefs={barRefs} />
        <ProgressSection title="Next Hour" timeUnit="minutes" emoji="🕑" index={1} timeRefs={timeRefs} barRefs={barRefs} />
        <ProgressSection title="Next Day" timeUnit="hours" emoji="🌅" index={2} timeRefs={timeRefs} barRefs={barRefs} />
        <ProgressSection title="Next Week" timeUnit="days" emoji="📆" index={3} timeRefs={timeRefs} barRefs={barRefs} />
        <ProgressSection title="Next Month" timeUnit="days" emoji="📅" index={4} timeRefs={timeRefs} barRefs={barRefs} />
        <ProgressSection title="Next Year" timeUnit="days" emoji="🎆" index={5} timeRefs={timeRefs} barRefs={barRefs} />
        <hr />
        {Object.entries(festivals).map(([name, { date, emoji }], index) => (
          <ProgressSection key={name} title={`Next ${name}`} timeUnit="days" emoji={emoji} index={index + 6} timeRefs={timeRefs} barRefs={barRefs} />
        ))}
      </main>
    </>
  );
}

export default App;
