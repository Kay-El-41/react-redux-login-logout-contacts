import { configureStore } from '@reduxjs/toolkit'
import { authorization } from './api/authorization'
import authorizationSlice from './services/authorizationSlice'
import { contact } from './api/contact'
import contactSlice from './services/contactSlice'

export const store = configureStore({
  reducer: {
    authorizationSlice: authorizationSlice,
    contactSlice: contactSlice,
    [authorization.reducerPath]: authorization.reducer,
    [contact.reducerPath]: contact.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorization.middleware, contact.middleware),
})
