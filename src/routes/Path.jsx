import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactBook from '../pages/ContactBook'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactBook />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default Path
