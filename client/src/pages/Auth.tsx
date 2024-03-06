import { Outlet } from 'react-router-dom';
import { AuthImg } from '../features/Auth/components/AuthImg';

export const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth__box'>
        <AuthImg />
        <div className='auth__form'>
          <h1 className='auth__title'>TIGER TIGER POS</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
