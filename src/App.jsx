// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Chats from "./pages/Chats";
import CalendarPage from "./pages/Calendar";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register"; 
import ForgotPassword from "./pages/ForgotPassword"; 
import CustomerManagement from "./Pages/CustomerManagment"; 
import bgImg from './assets/bgimg.jpg'
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div
        className="flex h-screen"
        style={{
          backgroundImage: `url(${bgImg})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {user && <Sidebar />}
        <div className="flex flex-col w-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm">
          {user && <Header />}
          <main className="flex-grow p-6 bg-transparent">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={<Register />} /> {/* Registration Route */}
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/feed" element={user ? <Feed /> : <Navigate to="/" />} />
              <Route path="/chats" element={user ? <Chats /> : <Navigate to="/" />} />
              <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/" />} />
              <Route path="/calendar" element={user ? <CalendarPage /> : <Navigate to="/" />} />

              <Route path="/customers" element={user ? <CustomerManagement /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
