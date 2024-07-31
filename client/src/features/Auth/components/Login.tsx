import { Button, CircularProgress, FormLabel, Input, Stack } from '@mui/joy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login as LoginInput } from '../types/Login';
import { InputError } from '../../../components/InputError';
import useLoginService from '../services/useLoginService';
import { useNavigate } from 'react-router-dom';
import { TokenType } from '../types/TokenType';
import { getToken } from '../../utils/authUtils';

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const { loginService, isLoading } = useLoginService();
  const token = getToken(TokenType.ACCESS);

  if (token) {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  }

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const isSuccess = await loginService(data);

    if (isSuccess) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 0);
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
