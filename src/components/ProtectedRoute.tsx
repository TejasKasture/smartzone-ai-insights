
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  managerOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, managerOnly = false }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Check if we're coming from a direct access bypass
  const isDirectAccess = location.state?.directAccess;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071ce] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  // Allow direct access for demo purposes
  if (!user && !isDirectAccess) {
    return <Navigate to="/auth" replace />;
  }

  // If we have a user but it's manager-only and they're not a manager
  if (user && managerOnly && profile?.role !== 'manager') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need manager privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
