import { Outlet } from 'react-router-dom';
import { AuthImg } from '../features/Auth/components/AuthImg';
import { Box, Typography } from '@mui/joy';

export const Auth = () => {
  return (
    <Box sx={{ height: '100vh', p: 5 }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          boxShadow: '3px 5px 6px 5px #a8a8a8',
        }}
      >
        <AuthImg />
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'yellow.100',
          }}
        >
          <Typography
            level='h1'
            sx={{ color: 'secondary.800', fontSize: '3.75rem', mb: 2 }}
          >
            TIGER TIGER POS
          </Typography>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
