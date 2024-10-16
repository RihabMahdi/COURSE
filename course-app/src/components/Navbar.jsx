// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaBookOpen, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../slices/authSlice'; // Importez l'action de déconnexion

const Navbar = () => {
  const dispatch = useDispatch(); // Créez un hook pour le dispatch
  const user = useSelector((state) => state.auth.user); // Vérifier si l'utilisateur est connecté

  const handleLogout = () => {
    dispatch(logout()); // Déclenche l'action de déconnexion
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg flex items-center">
          <span className="font-bold text-xl">MyApp</span> {/* Marque de navigation */}
        </Link>
        <div className="flex items-center">
          {user ? ( // Si l'utilisateur est connecté, affichez les liens correspondants
            <>
              <Link to="/" className="text-white text-lg flex items-center mr-4">
                <FaHome className="h-6 w-6 mr-1" />
                Home
              </Link>
              <Link to="/add-course" className="text-white text-lg flex items-center mr-4">
                <FaBookOpen className="h-6 w-6 mr-1" />
                Add Course
              </Link>
              <button onClick={handleLogout} className="text-white text-lg flex items-center">
                <FaSignOutAlt className="h-6 w-6 mr-1" />
                Logout
              </button>
            </>
          ) : ( // Si l'utilisateur n'est pas connecté, affichez le lien de connexion
            <Link to="/login" className="text-white text-lg flex items-center">
              <FaUserCircle className="h-6 w-6 mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
