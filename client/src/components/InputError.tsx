import { Typography } from '@mui/joy';

interface Props {
  text: string | undefined;
}
export const InputError = ({ text }: Props) => {
  return (
    <Typography fontSize='xs' textColor='danger.500'>
      {text}
    </Typography>
  );
};
