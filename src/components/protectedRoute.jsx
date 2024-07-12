import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    
    if (!token) {
      localStorage.setItem('redirected', 'true'); 
      return <Navigate to="/" />;
    }
    
    localStorage.removeItem('redirected');
    
    return children;
};
  