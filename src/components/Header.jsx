// src/components/Header.js
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import bgImg from '../assets/bgimg.jpg';
const Header = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Effect to get user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout failed: ", error));
  };

  // Effect to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <header className=" items-center justify-between flex flex-col sm:flex-row p-2 sm:p-4 bg-white shadow-md" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div>
        <h2 className="text-sm sm:text-lg font-bold">
          {user ? `Welcome, ${user.displayName || user.email}` : 'CRM'}
        </h2>
        <span className="text-gray-600">{currentTime}</span>
      </div>
      {user && (
        <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors duration-200">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
