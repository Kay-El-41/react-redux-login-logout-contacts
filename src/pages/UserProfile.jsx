import React, { useEffect, useState } from 'react'
import BackNavbar from '../components/BackNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileQuery } from '../redux/api/authorization'
import Cookies from 'js-cookie'
import { IoMdArrowDropdown } from 'react-icons/io'
import ChangePasswordSection from '../components/ChangePasswordSection'
import DeleteAccountSection from '../components/DeleteAccountSection'

const UserProfile = () => {
  const [profile, setProfile] = useState({})
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [showDeleteSection, setShowDeleteSection] = useState(false)

  useEffect(() => {
    var user = Cookies.get('user')
    if (user) {
      user = JSON.parse(user)
    } else {
      user = JSON.parse(Cookies.get('tempUser'))
    }
    setProfile(user)
    console.log(user)
  }, [])

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center">
        <div className="w-[500px] shadow-md p-5">
          <h2 className="text-xl font-semibold mb-1 select-none">
            Profile Information
          </h2>
          <hr />
          <div className="space-y-2 my-3">
            <div>
              <h2 className="text-sm font-semibold select-none">Name</h2>
              <p>{profile?.name}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">Email</h2>
              <p>{profile?.email}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">
                Created Date
              </h2>
              <p>{profile?.created_at?.slice(0, 10)}</p>
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
            <h2 className="text-red-500 cursor-pointer select-none text-sm hover:font-semibold">
              Logout
            </h2>
          </div>
          <div
            className="flex justify-between items-center text-sm cursor-pointer text-red-500 hover:font-semibold"
            onClick={() => setShowDeleteSection(!showDeleteSection)}
          >
            <h2 className="select-none">Delete My Account</h2>
            <IoMdArrowDropdown />
          </div>
          {showDeleteSection && (
            <DeleteAccountSection showSection={setShowDeleteSection} />
          )}
        </div>
      </main>
    </>
  )
}

export default UserProfile
