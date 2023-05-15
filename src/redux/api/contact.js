import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Redux functions for contacts

export const contact = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contact-app.mmsdev.site/api/v1',
  }),
  // Tag types for auto refresh when there is changes in server
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
        url: `/contact/${id}`,
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ['contact'],
    }),
    addContact: builder.mutation({
      query: ({ token, newContact }) => ({
        url: `/contact`,
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
        body: newContact,
      }),
      invalidatesTags: ['contact'],
    }),
    updateContact: builder.mutation({
      query: ({ id, token, updateContact }) => ({
        url: `/contact/${id}`,
        method: 'PUT',
        headers: { authorization: `Bearer ${token}` },
        body: updateContact,
      }),
      invalidatesTags: ['contact'],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['contact'],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetSingleContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useAddContactMutation,
} = contact
