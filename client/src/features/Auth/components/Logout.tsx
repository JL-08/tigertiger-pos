import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Link } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      navigate('/auth', { replace: true });
    }, 0);
  };

  return (
    <Link
      component='button'
      onClick={handleLogout}
      sx={(theme) => ({
        backgroundColor: theme.vars.palette.yellow[100],
        '&:hover': {
          color: theme.vars.palette.primary[900],
        },
        border: `1px solid ${theme.vars.palette.primary[900]}`,
      })}
      justifyContent={'center'}
      fontSize={'150%'}
    >
      <LogoutIcon />
    </Link>
  );
};

export default Logout;
