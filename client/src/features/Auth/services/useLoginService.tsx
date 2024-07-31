import { useLoginMutation } from '../api/authApi';
import { RequestError } from '../../../types/RequestError';
import toast from 'react-hot-toast';
import { Toast } from '../../../components/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { Login as LoginInput } from '../types/Login';

const useLoginService = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const loginService = async (data: LoginInput): Promise<boolean> => {
    const res = await login(data);
    if ('error' in res && 'data' in res.error) {
      const error = res.error.data as RequestError;

      if (error.statusCode === 404) {
        toast.custom(
          <Toast
            variant='error'
            title='Error Logging-In'
            message='Please try again or contact the administrator.'
          />
        );
      } else {
        toast.custom(
          <Toast
            variant='error'
            title='Error Logging-In'
            message={error.message}
          />
        );
      }

      return false;
    }

    if ('data' in res) {
      dispatch(setUser(res.data));
    }

    return true;
  };

  return { loginService, isLoading };
};

export default useLoginService;
