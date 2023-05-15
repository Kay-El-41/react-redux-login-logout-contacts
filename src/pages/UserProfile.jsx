import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import { loadUserData, removeData } from '../redux/services/authorizationSlice'
import { useLogoutMutation } from '../redux/api/authorization'

import BackNavbar from '../components/BackNavbar'
import ChangePasswordSection from '../components/ChangePasswordSection'

const UserProfile = () => {
  // State to show/hide change password section
  const [showPasswordSection, setShowPasswordSection] = useState(false)

  // Get user to display information, get token to change password or logout
  const { user } = useSelector((state) => state.authorizationSlice)
  const { token } = useSelector((state) => state.authorizationSlice)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux function to logout
  const [logout] = useLogoutMutation()

  // Reload user data when refreshing the page
  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  // MAIN function to logout the user
  const logOutHandler = () => {
    dispatch(removeData())
    logout(token)
    navigate('/login')
  }

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" mb-10 w-[500px] p-5 shadow-md sm:border-t-8 sm:border-t-blue-500">
          {/* Header */}
          <h1 className="mb-4 text-center text-2xl text-blue-500">
            Profile Information
          </h1>
          <hr />
          {/* General Information */}
          <div className="my-3 space-y-2">
            <div>
              <h2 className="select-none text-sm font-semibold">Name</h2>
              <p>{user?.name ? user.name : '...'}</p>
            </div>
            <div>
              <h2 className="select-none text-sm font-semibold">Email</h2>
              <p>{user?.email ? user.email : '...'}</p>
            </div>
            <div>
              <h2 className="select-none text-sm font-semibold">
                Created Date
              </h2>
              <p>{user?.created_at?.slice(0, 10)}</p>
            </div>
          </div>
          {/* Change Password Section */}
          <h2 className="mb-1 select-none text-xl font-semibold">Settings</h2>
          <hr />
          <div
            className="mt-3 flex cursor-pointer items-center justify-between text-sm font-semibold"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <h2 className="select-none">Change Password</h2>
            <IoMdArrowDropdown />
          </div>
          {showPasswordSection && (
            <ChangePasswordSection showSection={setShowPasswordSection} />
          )}
          {/* Logout Account */}
          <h2 className="mt-3 mb-1 select-none text-xl font-semibold">
            Danger Zone
          </h2>
          <hr />
          <div className="mt-3 mb-2">
            <p
              className="cursor-pointer select-none text-sm text-red-500 hover:font-semibold"
              onClick={logOutHandler}
            >
              Logout
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserProfile
