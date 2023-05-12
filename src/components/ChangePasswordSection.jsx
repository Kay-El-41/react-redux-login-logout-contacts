import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import { useChangePasswordMutation } from '../redux/api/authorization'
import ToastNotification from './ToastNotification'
import Cookies from 'js-cookie'

const ChangePasswordSection = ({ showSection }) => {
  const [password, setPassword] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  const [token, setToken] = useState('')

  const [badCPassword, setBadCPassword] = useState(false)
  const [badPassword, setBadPassword] = useState(false)
  const [badPasswordMatch, setBadPasswordMatch] = useState(false)

  const [changeSuccess, setChangeSuccess] = useState(false)
  const [changeFailed, setChangeFailed] = useState(false)

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  useEffect(() => {
    var myToken = Cookies.get('token')
    if (myToken) {
      myToken = JSON.parse(token)
    } else {
      myToken = Cookies.get('tempToken')
    }
    setToken(myToken)
  }, [])

  const onChangeHandler = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })

    // Old Password Validation
    if (e.target.name === 'current_password') {
      if (e.target.value.length >= 8) {
        setBadCPassword(false)
      } else {
        setBadCPassword(true)
      }
    }

    // password validation
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

    // same password validation
    if (e.target.name === 'password_confirmation') {
      if (e.target.value === password.password) {
        setBadPasswordMatch(false)
      } else {
        setBadPasswordMatch(true)
      }
    }
  }

  const resetForm = () => {
    setPassword({
      current_password: '',
      password: '',
      password_confirmation: '',
    })
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    showSection(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
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
      <form className="flex flex-col mb-3" onSubmit={submitHandler}>
        <label
          htmlFor="current_password"
          className="text-sm text-gray-500 mt-2"
        >
          Current Password
        </label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          value={password.current_password}
          onChange={onChangeHandler}
          required
          className=" outline-none p-1 border focus:border-b-blue-500"
        />
        {badCPassword && (
          <p className="text-red-500 text-xs">
            Password must be 8 characters or longer.
          </p>
        )}

        <label htmlFor="password" className="text-sm text-gray-500 mt-2">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password.password}
          onChange={onChangeHandler}
          required
          className={` outline-none p-1 border focus:border-b-blue-500 ${
            badPasswordMatch && 'border-b-red-500'
          }`}
        />
        {badPassword && (
          <p className="text-red-500 text-xs">
            Password must be 8 characters or longer.
          </p>
        )}

        <label
          htmlFor="confirm-password"
          className="text-sm text-gray-500 mt-2"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="password_confirmation"
          value={password.password_confirmation}
          onChange={onChangeHandler}
          required
          className={` outline-none p-1 border focus:border-b-blue-500 ${
            badPasswordMatch && 'border-b-red-500'
          }`}
        />
        {badPasswordMatch && (
          <p className="text-red-500 text-xs">Password must be same.</p>
        )}
        <div className="text-right space-x-2">
          <button
            className=" bg-blue-500 py-2 px-6 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
            type="submit"
            disabled={isLoading && true}
          >
            {isLoading ? <Loader /> : 'Change'}
          </button>
          <button
            className=" bg-gray-500 py-2 px-6 text-center text-white hover:bg-gray-600 mt-5 mb-1 disabled:bg-blue-200"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>

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
