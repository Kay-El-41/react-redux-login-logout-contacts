import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../redux/services/authorizationSlice'

const RouteGuard = ({ children }) => {
  const token = Cookies.get('token')
  const tempToken = Cookies.get('tempToken')
  const dispatch = useDispatch()

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
