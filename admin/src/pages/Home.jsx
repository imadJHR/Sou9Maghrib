import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full mx-auto">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your website, monitor activity, and access administrative
            features all in one place.
          </p>
          <Link to="list">
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Explore Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
