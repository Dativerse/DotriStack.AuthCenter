
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <div className="space-x-4">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
        
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;