import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contact = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contact-app.mmsdev.site/api/v1',
  }),
  tagTypes: ['contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ pathURL, token }) => ({
        url: pathURL,
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ['contact'],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `contact/${id}`,
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ['contact'],
    }),
  }),
})

export const { useGetContactsQuery, useGetSingleContactQuery } = contact
