// src/components/CalendarPage.js
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import bgImg from '../assets/bgimg.jpg';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [notification, setNotification] = useState('');
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setNotification(`You selected ${newDate.toDateString()}`);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventText) return;

    const dateKey = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventText],
    }));

    setEventText('');
    setNotification(`Event added for ${dateKey}`);
  };

  // Function to add red circle on days with events
  const tileContent = ({ date, view }) => {
    const dateKey = date.toDateString();
    return (
      view === 'month' && events[dateKey]?.length > 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
        </div>
      ) : null
    );
  };

  return (
    <div
      className="flex flex-col items-center p-2 sm:p-4 bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-gray-800 text-center">Calendar</h2>
      <div className="bg-white shadow-lg rounded-lg p-2 sm:p-4 w-full max-w-xs sm:max-w-md">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded-lg"
          tileContent={tileContent} // Show indicator on days with events
        />
        <p className="mt-2 sm:mt-4 text-md sm:text-lg text-gray-600 text-center">
          Selected date: <span className="font-semibold">{date.toDateString()}</span>
        </p>

        {/* Event Form */}
        <form onSubmit={handleEventSubmit} className="mt-2 sm:mt-4">
          <input
            type="text"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="Add an event"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            type="submit"
            className="w-full mt-2 sm:mt-3 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200"
          >
            Add Event
          </button>
        </form>

        {/* Event List for Selected Date */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Events on {date.toDateString()}:</h3>
          {events[date.toDateString()] ? (
            <ul className="mt-2 text-gray-600">
              {events[date.toDateString()].map((event, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded-lg my-1">{event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No events for this date.</p>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-2 sm:mb-4 p-2 sm:p-4 bg-blue-500 text-white rounded-lg shadow-md text-center">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
