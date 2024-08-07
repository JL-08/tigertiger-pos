import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
};
