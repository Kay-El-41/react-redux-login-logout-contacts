import { configureStore } from '@reduxjs/toolkit'
import { authorization } from './api/authorization'
import authorizationSlice from './services/authorizationSlice'

export const store = configureStore({
  reducer: {
    authorizationSlice: authorizationSlice,
    [authorization.reducerPath]: authorization.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorization.middleware),
})
