import React from 'react';
import { isAuthenticated } from '@/services/utils/auth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }


  

  return <Outlet />;
};

export default ProtectedRoute;