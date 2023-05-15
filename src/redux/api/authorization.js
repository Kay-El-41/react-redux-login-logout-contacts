import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Redux Functions for User Profile

export const authorization = createApi({
  reducerPath: 'authorization',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contact-app.mmsdev.site/api/v1',
  }),
  // tagTypes for auto refreshing when there are changes in data
  tagTypes: ['authorization'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['authorization'],
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['authorization'],
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: '/user-logout',
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['authorization'],
    }),
    changePassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/change-password',
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: password,
      }),
      invalidatesTags: ['authorization'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authorization
