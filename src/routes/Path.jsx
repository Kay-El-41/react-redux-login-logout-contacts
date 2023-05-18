import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactBook from '../pages/ContactBook'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import RouteGuard from '../pages/RouteGuard'
import ContactProfile from '../pages/ContactProfile'
import EditContact from '../pages/EditContact'
import AddContact from '../pages/AddContact'
import ErrorPage from '../pages/ErrorPage'

const Path = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteGuard>
            <ContactBook />
          </RouteGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/contact/:id" element={<ContactProfile />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/edit-contact/:id" element={<EditContact />} />
    </Routes>
  )
}

export default Path
