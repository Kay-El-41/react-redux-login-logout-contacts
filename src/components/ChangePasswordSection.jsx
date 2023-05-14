import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useChangePasswordMutation } from '../redux/api/authorization'
import Loader from './Loader'
import ToastNotification from './ToastNotification'

const ChangePasswordSection = ({ showSection }) => {
  // state for collecting data
  const [password, setPassword] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  // state for form validation and live feedback
  const [badCPassword, setBadCPassword] = useState(false)
  const [badPassword, setBadPassword] = useState(false)
  const [badPasswordMatch, setBadPasswordMatch] = useState(false)

  // state for action successful and failed, show ToastNotification after that
  const [changeSuccess, setChangeSuccess] = useState(false)
  const [changeFailed, setChangeFailed] = useState(false)

  // Redux Function to perform action
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  // Redux Slice to get token, token is required to perform action
  const { token } = useSelector((state) => state.authorizationSlice)

  // Function to collect data from form and show validation feedback
  const onChangeHandler = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })

    // Old Password Validation {Password must be over 8 characters}
    if (e.target.name === 'current_password') {
      if (e.target.value.length >= 8) {
        setBadCPassword(false)
      } else {
        setBadCPassword(true)
      }
    }

    // New Password Validation {Password must be over 8 characters}
    if (e.target.name === 'password') {
      if (e.target.value.length >= 8) {
        setBadPassword(false)
      } else {
        setBadPassword(true)
      }
      if (e.target.value == password.password_confirmation) {
        setBadPasswordMatch(false)
      } else {
        setBadPasswordMatch(true)
      }
    }

    // Confirm Password Validation {This and New Password must be the same}
    if (e.target.name === 'password_confirmation') {
      if (e.target.value === password.password) {
        setBadPasswordMatch(false)
      } else {
        setBadPasswordMatch(true)
      }
    }
  }

  // Function to clear the form when action performed successfully
  const resetForm = () => {
    setPassword({
      current_password: '',
      password: '',
      password_confirmation: '',
    })
  }

  // Function to close the section when user clicked CANCEL button
  const cancelHandler = (e) => {
    e.preventDefault()
    showSection(false)
  }

  // MAIN function to update the password
  const submitHandler = async (e) => {
    e.preventDefault()
    // Double Check for validation
    if (badCPassword || badCPassword || badPasswordMatch) {
      setChangeFailed(true)
    } else {
      try {
        const { data } = await changePassword({ token, password })
        if (data?.success) {
          resetForm()
          setChangeSuccess(true)
        } else {
          setChangeFailed(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {/* Password Inputs */}
      <label htmlFor="current_password" className="mt-2 text-sm text-gray-500">
        Current Password
      </label>
      <input
        type="password"
        id="current_password"
        name="current_password"
        value={password.current_password}
        onChange={onChangeHandler}
        required
        className=" border p-1 outline-none focus:border-b-blue-500"
      />
      {badCPassword && (
        <p className="text-xs text-red-500">
          Password must be 8 characters or longer.
        </p>
      )}

      <label htmlFor="password" className="mt-2 text-sm text-gray-500">
        New Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password.password}
        onChange={onChangeHandler}
        required
        className={` border p-1 outline-none focus:border-b-blue-500 ${
          badPasswordMatch && 'border-b-red-500'
        }`}
      />
      {badPassword && (
        <p className="text-xs text-red-500">
          Password must be 8 characters or longer.
        </p>
      )}

      <label
        htmlFor="password-confirmation"
        className="mt-2 text-sm text-gray-500"
      >
        Confirm New Password
      </label>
      <input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        value={password.password_confirmation}
        onChange={onChangeHandler}
        required
        className={` border p-1 outline-none focus:border-b-blue-500 ${
          badPasswordMatch && 'border-b-red-500'
        }`}
      />
      {badPasswordMatch && (
        <p className="text-xs text-red-500">New passwords must be same.</p>
      )}

      {/* Action Buttons */}
      <div className="space-x-2 text-right">
        <button
          className=" mt-5 mb-1 bg-blue-500 py-1 px-6 text-center text-white hover:bg-blue-600 disabled:bg-blue-200"
          type="submit"
          disabled={isLoading && true}
        >
          {isLoading ? <Loader /> : 'Change'}
        </button>

        <button
          className=" mt-5 mb-1 bg-gray-500 py-1 px-6 text-center text-white hover:bg-gray-600 disabled:bg-gray-200"
          onClick={cancelHandler}
          disabled={isLoading && true}
        >
          Cancel
        </button>
      </div>

      {/* Toast Notifications for action Feedbacks, absolute positions */}
      {changeSuccess && (
        <ToastNotification
          mode="passwordChangeSuccess"
          closeNotification={setChangeSuccess}
        />
      )}

      {changeFailed && (
        <ToastNotification
          mode="passwordChangeFailed"
          closeNotification={setChangeFailed}
        />
      )}
    </form>
  )
}

export default ChangePasswordSection
