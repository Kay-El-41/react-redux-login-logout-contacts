import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactBook from '../pages/ContactBook'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import RouteGuard from '../pages/RouteGuard'

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
    </Routes>
  )
}

export default Path
