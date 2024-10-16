
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
