import { RouteObject } from 'react-router-dom';
import { Loading } from '../pages/Loading';

export const loadingRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Loading />,
  },
];
