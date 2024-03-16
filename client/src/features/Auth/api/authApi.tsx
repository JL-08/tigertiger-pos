import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
import { Login } from '../types/Login';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api' + '/auth',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<User, Partial<Login>>({
      query: (userInfo) => ({
        url: '/login',
        method: 'POST',
        body: userInfo,
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
});

export const { useLoginMutation } = authApi;
