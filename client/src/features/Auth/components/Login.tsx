import { Button, CircularProgress, FormLabel, Input, Stack } from '@mui/joy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login as LoginInput } from '../types/Login';
import { InputError } from '../../../components/InputError';
import { useLoginMutation } from '../api/authApi';
import { RequestError } from '../../../types/RequestError';
import toast from 'react-hot-toast';
import { Toast } from '../../../components/Toast';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    console.log(data);

    const res = await login(data);

    if ('error' in res && 'data' in res.error) {
      const error = res.error.data as RequestError;

      if (error.statusCode === 404 && !error.message.includes('Invalid')) {
        throw new Error(error.message);
      } else {
        toast.custom(
          <Toast
            variant='error'
            title='Error Logging-In'
            message={error.message}
          />
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <div>
          <FormLabel>Username</FormLabel>
          <Input
            disabled={isLoading}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <InputError text={errors.username.message} />}
        </div>
        <div>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            disabled={isLoading}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <InputError text={errors.password.message} />}
        </div>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <CircularProgress variant='solid' size='sm' /> : 'LOGIN'}
        </Button>
      </Stack>
    </form>
  );
};
