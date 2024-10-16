// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaBookOpen, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-700 p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-white text-2xl font-extrabold tracking-wider flex items-center"
        >
          MyApp
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/"
                className="text-white text-lg flex items-center space-x-2 hover:text-gray-200 transition"
              >
                <FaHome className="h-5 w-5" />
                <span>Courses</span>
              </Link>
              <Link
                to="/add-course"
                className="text-white text-lg flex items-center space-x-2 hover:text-gray-200 transition"
              >
                <FaBookOpen className="h-5 w-5" />
                <span>Add Course</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
              >
                <FaSignOutAlt className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
            >
              <FaUserCircle className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
