import React, { useEffect, useState } from 'react'
import BackNavbar from '../components/BackNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import ChangePasswordSection from '../components/ChangePasswordSection'
import { loadUserData, removeData } from '../redux/services/authorizationSlice'
import { useLogoutMutation } from '../redux/api/authorization'

const UserProfile = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.authorizationSlice)
  const { token } = useSelector((state) => state.authorizationSlice)
  const dispatch = useDispatch()

  const [logout] = useLogoutMutation()

  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  const logOutHandler = () => {
    dispatch(removeData())
    logout(token)
    navigate('/login')
  }

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" w-[500px] shadow-md p-5 sm:border-t-8 sm:border-t-blue-500 mb-10">
          <h1 className="text-center text-blue-500 text-2xl mb-4">
            Profile Information
          </h1>
          <hr />
          <div className="space-y-2 my-3">
            <div>
              <h2 className="text-sm font-semibold select-none">Name</h2>
              <p>{user?.name ? user.name : '...'}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">Email</h2>
              <p>{user?.email ? user.email : '...'}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">
                Created Date
              </h2>
              <p>{user?.created_at?.slice(0, 10)}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-1 select-none">Settings</h2>
          <hr />
          <div
            className="flex justify-between items-center text-sm font-semibold mt-3 cursor-pointer"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <h2 className="select-none">Change Password</h2>
            <IoMdArrowDropdown />
          </div>
          {showPasswordSection && (
            <ChangePasswordSection showSection={setShowPasswordSection} />
          )}
          <h2 className="text-xl font-semibold mt-3 mb-1 select-none">
            Danger Zone
          </h2>
          <hr />
          <div className="mt-3 mb-2">
            <p
              className="text-red-500 cursor-pointer select-none text-sm hover:font-semibold"
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
