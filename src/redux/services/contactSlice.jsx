import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contacts: [],
  searchTerm: null,
}

export const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    loadContact: (state, { payload }) => {
      state.contacts = payload
    },
  },
})

export const {loadContact} = contactSlice.actions
export default contactSlice.reducer
