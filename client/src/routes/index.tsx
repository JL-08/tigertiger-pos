import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';

export const AppRoutes = () => {
  const user = false;
  const routes = user ? protectedRoutes : publicRoutes;

  return <>{useRoutes(routes)}</>;
};
