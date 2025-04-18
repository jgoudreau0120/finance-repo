import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authentication = localStorage.getItem('userData');

  if (authentication) {
    return children;
  } 
  else {
    return <Navigate to='/' />;
  }
};

export default ProtectedRoute;
