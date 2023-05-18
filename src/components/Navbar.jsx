import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../redux/api/authorization'
import { removeData } from '../redux/services/authorizationSlice'

const Navbar = () => {
  // Navigation bar component with user profile for the ContactBook Screen
  const navigate = useNavigate()

  // State for showing profile menu
  const [showMenu, setShowMenu] = useState(false)

  // Get User and Token to display name in the menu, and token to logout
  const { user } = useSelector((state) => state.authorizationSlice)
  const { token } = useSelector((state) => state.authorizationSlice)

  // Redux function to logout
  const [logout] = useLogoutMutation()

  // Redux Slice Dispatch to remove the Cookies saved
  const dispatch = useDispatch()

  // MAIN function to perform the action
  const logOutHandler = () => {
    dispatch(removeData())
    logout(token)
    navigate('/login')
  }

  return (
    <nav className="relative flex h-16 items-center justify-between bg-blue-500 p-3 sm:p-5">
      {/* LOGO */}
      <div>
        <Link to={'/'}>
          <h1 className="select-none text-2xl font-bold text-white drop-shadow">
            CONTACT MANAGER
          </h1>
        </Link>
      </div>

      {/* User Profile Icon */}
      <FaUserCircle
        className="cursor-pointer text-5xl text-white"
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* Profile Menu Absolute Positioned */}
      <div
        className={`absolute top-20 right-3 flex h-fit w-[200px] flex-col gap-2 border-t-8 border-t-blue-500 bg-white p-2 text-right shadow-md ${
          !showMenu && 'hidden'
        } z-10`}
      >
        {/* Display user name */}
        <h3 className="select-none font-semibold">{user.name}</h3>
        <hr />
        {/* Linked to User Profile Screen */}
        <Link to="/profile">
          <p className="cursor-pointer select-none">Profile</p>
        </Link>
        {/* Logout */}
        <p
          className="cursor-pointer select-none text-red-500"
          onClick={logOutHandler}
        >
          Log Out
        </p>
      </div>
    </nav>
  )
}

export default Navbar
