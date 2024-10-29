import bgImg from '../assets/bgimg.jpg';
const Feed = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md min-h-screen" style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Feed</h2>
        {/* Example Feed Content */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h3 className="font-semibold">Feed Item Title</h3>
            <p>This is a description of the feed item. It provides useful information.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
            <h3 className="font-semibold">Another Feed Item</h3>
            <p>Here is another piece of information worth noting in the feed.</p>
          </div>
          {/* More feed items can be added */}
        </div>
      </div>
    );
  };
  
  export default Feed;
  