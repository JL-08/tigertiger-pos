import { Stack } from '@mui/joy';
import Products from '../features/Order/components/Products';
import Cart from '../features/Order/components/Cart';

export const Order = () => {
  return (
    <Stack height={'100%'} direction={'row'}>
      <Stack
        flexGrow={1}
        padding={2}
        bgcolor={'yellow.100'}
        border={'yellow.100'}
        borderRadius={{ xs: 0, md: '2rem 0 0 2rem' }}
      >
        <Products />
      </Stack>
      <Stack padding={2} border={'1px solid black'}>
        <Cart />
      </Stack>
    </Stack>
  );
};
