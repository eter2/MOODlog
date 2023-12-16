import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Calendar.css';
import emotionService from '../Services/emotion.js'

const MyCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchAllEmotions = async () => {
      try {
        const data = await emotionService.getMonthlyEmotion();
        console.log(data);
        if (data.length > 0) {
          const formattedData = data.map(item => {
            return {
              date: item._id,
              color: item.moods[0].color,
            };
          });
          setCalendarData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };
  
    fetchAllEmotions();
  }, []);

  const renderDotForDate = (date) => {
    const matchedDates = calendarData.filter(item => moment(item.date).isSame(date, 'day'));
    if (matchedDates.length > 0) {
      return matchedDates.map((item, index) => (
        <div
          key={index}
          className="dot"
          style={{ backgroundColor: item.color }}
        ></div>
      ));
    } else {
      return (
        <div
          className="dot"
        ></div>
      );
    }
  };

  return (
    <div className="calendar flex items-center justify-center py-8 px-4">
      <div className="max-w-sm w-full">
        <Calendar
          prevLabel={null} prev2Label={null} nextLabel={null} next2Label={null}
          formatDay={(locale, date) => moment(date).format('DD')}
          minDetail="month" maxDetail="month" showNeighboringMonth={false}
          tileContent={({ date, view }) => (
            <div className="flex justify-center items-center absoluteDiv">
              {renderDotForDate(date)}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
