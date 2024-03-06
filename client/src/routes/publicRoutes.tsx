import { RouteObject } from 'react-router-dom';
import { Auth } from '../pages/Auth';
import { Error } from '../pages/Error';
import { Login } from '../features/Auth/components/Login';
import { AdminLogin } from '../features/Auth/components/AdminLogin';

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/admin',
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
];
