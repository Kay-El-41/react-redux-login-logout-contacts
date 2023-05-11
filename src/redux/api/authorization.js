import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authorization = createApi({
  reducerPath: 'authorization',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contact-app.mmsdev.site/api/v1',
  }),
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
  }),
})

export const { useLoginMutation, useRegisterMutation } = authorization
