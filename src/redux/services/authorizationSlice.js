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
    saveUserData: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
      Cookies.set('tempUser', JSON.stringify(state.user))
      Cookies.set('tempToken', state.token)
    },
    saveLoginData: (state) => {
      Cookies.set('user', JSON.stringify(state.user), { expires: 7 })
      Cookies.set('token', state.token, { expires: 7 })
    },
    removeData: (state) => {
      state.user = null
      state.token = null

      Cookies.remove('tempUser')
      Cookies.remove('tempToken')
      Cookies.remove('user')
      Cookies.remove('token')
    },
  },
})

export const { saveUserData, saveLoginData, removeData } =
  authorizationSlice.actions
export default authorizationSlice.reducer
