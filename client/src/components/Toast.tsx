import { Close, Warning } from '@mui/icons-material';
import { Alert, Box, CircularProgress, Typography, IconButton } from '@mui/joy';

export const Toast = ({ variant, message, title }) => {
  switch (variant) {
    case 'error':
      return (
        <Alert
          variant='soft'
          color='danger'
          invertedColors
          startDecorator={
            <CircularProgress size='lg' color='danger'>
              <Warning />
            </CircularProgress>
          }
          endDecorator={
            <IconButton
              variant='plain'
              sx={{
                '--IconButton-size': '32px',
                transform: 'translate(0.5rem, -0.5rem)',
              }}
            >
              <Close />
            </IconButton>
          }
          sx={{ alignItems: 'flex-start', gap: '1rem' }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography level='title-md'>{title}</Typography>
            <Typography level='body-md'>{message}</Typography>
          </Box>
        </Alert>
      );

    default:
      break;
  }
};
