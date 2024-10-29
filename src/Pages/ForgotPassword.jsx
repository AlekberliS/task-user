// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path if necessary
import { Link } from "react-router-dom";
import bgImg from '../assets/bgimg.jpg';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      // Optionally redirect to login or home page
      // navigate("/");
    } catch (err) {
      console.error("Error sending password reset email:", err);
      if (err.code === 'auth/user-not-found') {
        setError("No user found with this email address.");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="mb-4">Enter your email address to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        {message && <div className="text-green-500 text-sm mb-2">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send Reset Link</button>
        <p className="mt-4 text-sm">
          Remembered your password? <Link to="/" className="text-blue-500">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
