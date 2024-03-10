import { Box } from '@mui/joy';
import BackgroundImg from '../assets/background_1.jpg';

export const AuthImg = () => {
  return (
    <Box sx={{ width: '50%' }}>
      <img width={'100%'} height={'100%'} src={BackgroundImg} />
    </Box>
  );
};
