// src/components/Chats.js
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import bgImg from '../assets/bgimg.jpg';
const Chats = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hello, how can I help you today?' },
    { id: 2, user: 'You', text: 'I need assistance with my account.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="p-1 sm:p-4 bg-gray-100 shadow-lg rounded-lg h-full flex flex-col max-w-[300px]  sm:max-w-lg mx-auto" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 text-center">Chats</h2>
      <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-4 p-1 sm:p-2">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-2 sm:p-3 rounded-md ${message.user === 'You' ? 'bg-blue-200 text-blue-800 self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
          >
            <p><strong>{message.user}:</strong> {message.text}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-2 sm:mt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={handleSend} className="p-1 sm:p-3 bg-blue-600 w-14 sm:w-24 text-white rounded-r-md flex items-center">
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
