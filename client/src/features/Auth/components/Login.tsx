import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';

export const Login = () => {
  return (
    <>
      <FormControl>
        <Stack spacing={2}>
          <div>
            <FormLabel>Username</FormLabel>
            <Input />
          </div>
          <div>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </div>
          <Button>LOGIN</Button>
        </Stack>
      </FormControl>
    </>
  );
};
