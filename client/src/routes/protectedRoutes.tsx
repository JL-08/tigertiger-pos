import { RouteObject } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { Error } from '../pages/Error';

type Route = RouteObject & { showOnMenu: boolean };

export const protectedRoutes: Route[] = [
  {
    path: '/',
    element: <Layout />,
    showOnMenu: false,
    children: [{ path: '/dashboard' }],
  },
  {
    path: '*',
    element: <Error />,
    showOnMenu: false,
  },
];
