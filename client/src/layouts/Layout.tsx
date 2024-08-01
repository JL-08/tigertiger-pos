import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Stack } from '@mui/joy';

export const Layout = () => {
  return (
    <>
      <Stack
        height={'100%'}
        direction={{ xs: 'column', md: 'row' }}
        padding={{ xs: '0', md: '1rem 1rem 1rem 0' }}
      >
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          width={{ xs: '100%', md: '5rem' }}
          padding={2}
        >
          <Navigation />
        </Stack>
        <Stack width={'100%'} height={{ xs: '100%' }}>
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
};
