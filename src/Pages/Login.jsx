// src/pages/Login.js
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import bgImg from '../assets/bgimg.jpg';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </p>
        <p className="mt-4 text-sm">
  Forgot your password? <Link to="/forgot-password" className="text-blue-500">Reset it here</Link>
</p>

      </form>
    </div>
  );
}

export default Login;
