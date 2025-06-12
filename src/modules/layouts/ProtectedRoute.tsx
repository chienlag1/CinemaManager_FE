import React, { type ReactNode, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useMongoUser } from '../../contexts/UserContext';
import LoadingSpinner from '../../components/loading/LoadingSpinner';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { mongoUser, isLoadingUser, isSignedIn } = useMongoUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoadingUser && isSignedIn && mongoUser) {
      if (
        mongoUser.role === 'admin' &&
        location.pathname === '/' &&
        !allowedRoles
      ) {
        navigate('/admin', { replace: true });
      }
    }
  }, [
    isLoadingUser,
    isSignedIn,
    mongoUser,
    location.pathname,
    allowedRoles,
    navigate,
  ]);

  if (isLoadingUser) {
    return <LoadingSpinner />;
  }

  if (isSignedIn === undefined) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn || !mongoUser) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(mongoUser.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
