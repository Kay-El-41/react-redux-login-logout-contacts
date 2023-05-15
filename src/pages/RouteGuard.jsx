import React from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { saveUserData } from '../redux/services/authorizationSlice'

const RouteGuard = ({ children }) => {
  const dispatch = useDispatch()

  // Check if we have token (7 days saved) & temp token
  const token = Cookies.get('token')
  const tempToken = Cookies.get('tempToken')

  // Check if we have one, direct to Contact Book Screen
  if (token) {
    const user = JSON.parse(Cookies.get('user'))
    dispatch(saveUserData({ user, token }))
    return children
  } else if (tempToken) {
    const tempUser = JSON.parse(Cookies.get('tempUser'))
    dispatch(saveUserData({ user: tempUser, token: tempToken }))
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

export default RouteGuard
