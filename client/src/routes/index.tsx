import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import { Auth } from '../pages/Auth';
import { AdminLogin } from '../features/Auth/components/AdminLogin';
import { Order } from '../pages/Order';
import { Error } from '../pages/Error';
import { Login } from '../features/Auth/components/Login';
import { TokenType } from '../features/Auth/types/TokenType';
import { getToken } from '../features/utils/authUtils';

export const AppRoutes = () => {
  const navigate = useNavigate();
  const token = getToken(TokenType.ACCESS);
  const isAuthenticated = token !== null;

  if (!isAuthenticated && window.location.pathname !== '/auth') {
    setTimeout(() => {
      navigate('/auth', { replace: true });
    }, 0);
  }

  console.log('rendering routes');
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={true} />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Order />} />
          </Route>
        </Route>
        <Route path='auth' element={<Auth />}>
          <Route index element={<Login />} />
          <Route path='admin' element={<AdminLogin />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
};
