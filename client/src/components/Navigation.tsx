import { Box, Link, Stack } from '@mui/joy';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import Logout from '../features/Auth/components/Logout';

export const Navigation = () => {
  return (
    <>
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        flexGrow={1}
        spacing={1}
        justifyContent={'center'}
      >
        <Link
          justifyContent={'center'}
          fontSize={'150%'}
          sx={(theme) => ({
            backgroundColor: theme.vars.palette.yellow[100],
            '&:hover': {
              color: theme.vars.palette.primary[900],
            },
            border: `1px solid ${theme.vars.palette.primary[900]}`,
          })}
        >
          <ShoppingCartIcon />
        </Link>

        <Link
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
          <HistoryIcon />
        </Link>
      </Stack>
      <Stack>
        <Logout />
      </Stack>
    </>
  );
};
