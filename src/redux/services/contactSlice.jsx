import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contacts: [],
  paginationLinks: [],
}

export const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    loadContact: (state, { payload }) => {
      state.contacts = payload
    },
    updateLinks: (state, { payload }) => {
      state.paginationLinks = payload
    },
  },
})

export const { loadContact, updateLinks } = contactSlice.actions
export default contactSlice.reducer
