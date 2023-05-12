import React, { useEffect, useState } from 'react'
import BackNavbar from '../components/BackNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileQuery } from '../redux/api/authorization'
import Cookies from 'js-cookie'

const UserProfile = () => {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    var user = Cookies.get('user')
    if (user) {
      user = JSON.parse(user)
    } else {
      user = JSON.parse(Cookies.get('tempUser'))
    }
    console.log(user)
    // we only have two usable items: email and name
    setProfile(user)
  }, [])

  return (
    <>
      <BackNavbar />
      <h1>{profile.name}</h1>
    </>
  )
}

export default UserProfile
