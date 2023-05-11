import { configureStore } from '@reduxjs/toolkit'
import { authorization } from './api/authorization'

export const store = configureStore({
  reducer: {
    [authorization.reducerPath]: authorization.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorization.middleware),
})
