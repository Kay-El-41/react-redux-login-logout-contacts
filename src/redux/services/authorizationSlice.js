import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: null,
  token: null,
}

export const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {
    saveData: (state, { payload }) => {
      console.log(payload)
      state.user = payload.user
      state.token = payload.token

      Cookies.set('user', JSON.stringify(state.user), { expires: 7 })
      Cookies.set('token', state.token, { expires: 7 })
    },
  },
})

export const { saveData } = authorizationSlice.actions
export default authorizationSlice.reducer
