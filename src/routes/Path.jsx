import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactBook from '../pages/ContactBook'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import RouteGuard from '../pages/RouteGuard'
import ContactProfile from '../pages/ContactProfile'
import EditContact from '../pages/EditContact'

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
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/contact/:id" element={<ContactProfile />} />
      <Route path="/edit-contact" element={<EditContact />} />
    </Routes>
  )
}

export default Path
