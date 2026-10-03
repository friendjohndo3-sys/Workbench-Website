import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center font-mono text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 border-2 border-[#0e3052] border-t-transparent rounded-full animate-spin" />
          <span>Verifying developer session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/dev/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
