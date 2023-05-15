import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

// Redux slice for storing user profile and token
const initialState = {
  user: null,
  token: null,
}

export const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {
    // load user data function to reload the data when refreshing
    loadUserData: (state) => {
      const tempToken = Cookies.get('tempToken')
      if (tempToken) {
        state.user = JSON.parse(Cookies.get('tempUser'))
        state.token = tempToken
      }
    },
    // save the login as temporary data when there is no REMEMBER ME checked
    saveUserData: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
      Cookies.set('tempUser', JSON.stringify(state.user))
      Cookies.set('tempToken', state.token)
    },
    // save the login data for 7 days when there is REMEMBER ME checked
    saveLoginData: (state) => {
      Cookies.set('user', JSON.stringify(state.user), { expires: 7 })
      Cookies.set('token', state.token, { expires: 7 })
    },
    // remove the saved logins if user logged out
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

export const { loadUserData, saveUserData, saveLoginData, removeData } =
  authorizationSlice.actions
export default authorizationSlice.reducer
