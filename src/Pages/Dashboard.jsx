import bgImg from '../assets/bgimg.jpg';
const Dashboard = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen" style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 flex flex-col justify-between">
            <h2 className="font-semibold text-lg">Total Clients</h2>
            <p className="text-4xl font-bold">250</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-200 flex flex-col justify-between">
            <h2 className="font-semibold text-lg">Active Projects</h2>
            <p className="text-4xl font-bold">12</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200 flex flex-col justify-between">
            <h2 className="font-semibold text-lg">Pending Tasks</h2>
            <p className="text-4xl font-bold">8</p>
          </div>
          {/* Add more cards if necessary */}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  