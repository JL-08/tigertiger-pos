import { useRefreshTokenMutation } from '../api/authApi';
import { RequestError } from '../../../types/RequestError';
import toast from 'react-hot-toast';
import { Toast } from '../../../components/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';

const useRefreshTokenService = () => {
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const dispatch = useDispatch();

  const refreshService = async (): Promise<boolean> => {
    const res = await refreshToken(null);
    if ('error' in res && 'data' in res.error) {
      const error = res.error.data as RequestError;

      if (error.statusCode === 404) {
        toast.custom(
          <Toast
            variant='error'
            title='Error Refreshing Session'
            message='Please try again or contact the administrator.'
          />
        );
      } else {
        toast.custom(
          <Toast
            variant='error'
            title='Error Refreshing Session'
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

  return { refreshService, isLoading };
};

export default useRefreshTokenService;
