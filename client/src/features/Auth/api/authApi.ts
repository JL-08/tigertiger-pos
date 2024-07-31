import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
import { Login } from '../types/Login';
import { TokenType } from '../types/TokenType';
import { getToken } from '../../utils/authUtils';
import { setUser, logout } from '../slices/authSlice';

let isRefresh = false;
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api' + '/auth',
  prepareHeaders: (headers) => {
    const token = getToken(TokenType.ACCESS);
    headers.set('Authorization', `Bearer ${token}`);

    if (isRefresh) {
      const refreshToken = getToken(TokenType.REFRESH);
      headers.set('Authorization', `Bearer ${refreshToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  isRefresh = false;
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    const refreshArg = {
      url: '/refresh',
      method: 'GET',
    };
    isRefresh = true;
    const refreshResult = await baseQuery(refreshArg, api, {});

    if (refreshResult.data) {
      // Store the new token
      api.dispatch(setUser(refreshResult.data as User));

      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<User, Partial<Login>>({
      query: (userInfo) => ({
        url: '/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    refreshToken: builder.mutation<User, null>({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useRefreshTokenMutation } =
  authApi;
