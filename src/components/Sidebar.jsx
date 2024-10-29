// src/components/Sidebar.js
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaRegChartBar, FaComments, FaCalendarAlt, FaUserCircle, FaTasks, FaUserPlus } from 'react-icons/fa';
import bgImg from '../assets/bgimg.jpg'; // Make sure this path is correct

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`shadow-md transition-width duration-300 ${isExpanded ? 'w-64' : 'w-16'} min-w-[80px] min-h-[700px] sm:min-w-[100px] overflow-hidden`}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-between h-16 border-b p-4 bg-white bg-opacity-70">
        <h1 className={`text-lg font-bold ${isExpanded ? 'block' : 'hidden'}`}>CRM</h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            {isExpanded ? '←' : '→'}
          </span>
        </button>
      </div>
      <nav className="flex flex-col p-4 bg-white bg-opacity-70">
        <Link to="/dashboard" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaHome className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Dashboard</span>
        </Link>
        <Link to="/feed" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaRegChartBar className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Feed</span>
        </Link>
        <Link to="/chats" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaComments className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Chats</span>
        </Link>
        <Link to="/calendar" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaCalendarAlt className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Calendar</span>
        </Link>
        <Link to="/profile" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaUserCircle className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Profile</span>
        </Link>
        <Link to="/tasks" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaTasks className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Tasks</span>
        </Link>
        <Link to="/customers" className="flex items-center py-2 hover:bg-gray-200 transition-colors duration-200">
          <FaUserPlus className="text-lg" />
          <span className={`ml-2 ${isExpanded ? 'block' : 'hidden'}`}>Customers</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
