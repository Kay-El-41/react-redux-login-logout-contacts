import { createSlice } from '@reduxjs/toolkit'

// Redux slice for storing contacts and pagination links
const initialState = {
  contacts: [],
  paginationLinks: [],
}

export const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    // get the contacts, update the contacts
    loadContact: (state, { payload }) => {
      state.contacts = payload
    },
    // update the pagination links if the page changes
    updateLinks: (state, { payload }) => {
      state.paginationLinks = payload
    },
  },
})

export const { loadContact, updateLinks } = contactSlice.actions
export default contactSlice.reducer
