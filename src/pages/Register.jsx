import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../redux/api/authorization'
import ToastNotification from '../components/ToastNotification'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [badPassword, setBadPassword] = useState(false)
  const [badPasswordMatch, setBadPasswordMatch] = useState(false)

  const [registerSuccess, setRegisterSuccess] = useState(true)
  const [connectionError, setConnectionError] = useState(false)

  const [register, { isLoading }] = useRegisterMutation()

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })

    // name validation
    if (e.target.name === 'name') {
      if (e.target.value.length > 4) {
        setBadName(false)
      } else {
        setBadName(true)
      }
    }

    // mail validation
    if (e.target.name === 'email') {
      const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (e.target.value.match(format)) {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }

    // password validation
    if (e.target.name === 'password') {
      if (e.target.value.length >= 8) {
        setBadPassword(false)
      } else {
        setBadPassword(true)
      }
      if (e.target.value == user.password_confirmation) {
        setBadPasswordMatch(false)
      } else {
        setBadPasswordMatch(true)
      }
    }

    // same password validation
    if (e.target.name === 'password_confirmation') {
      if (e.target.value === user.password) {
        setBadPasswordMatch(false)
      } else {
        setBadPasswordMatch(true)
      }
    }
  }

  const registerValidation = () => {
    if (badName || badMail || badPassword || badPasswordMatch) {
      console.log('bad')
      return false
    } else {
      console.log('good')
      return true
    }
  }

  const resetForm = () => {
    setUser({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (registerValidation()) {
      try {
        const { data } = await register(user)
        console.log(data)
        if (!data) {
          setConnectionError(true)
        } else if (data?.success) {
          setRegisterSuccess(true)
          resetForm()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <main className=" flex justify-center items-center h-screen">
      <div className=" bg-white border-t-8 border-t-blue-500 shadow-md p-5 w-[300px]">
        <h1 className="text-center text-blue-500 text-3xl mb-4">
          Create Account
        </h1>
        <form className=" flex flex-col" onSubmit={submitHandler}>
          <label htmlFor="username" className="text-sm text-gray-500 ">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="name"
            onChange={onChangeHandler}
            required
            className={` outline-none p-1 border focus:border-b-blue-500 ${
              badName && 'border-b-red-500'
            }`}
          />
          {badName && (
            <p className="text-red-500 text-xs">
              Name must be 4 Characters Long.
            </p>
          )}
          <label htmlFor="email" className="text-sm text-gray-500 mt-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChangeHandler}
            required
            className={` outline-none p-1 border focus:border-b-blue-500 ${
              badMail && 'border-b-red-500'
            }`}
          />
          {badMail && (
            <p className="text-red-500 text-xs">Please enter a valid email.</p>
          )}
          <label htmlFor="password" className="text-sm text-gray-500 mt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
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
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="password_confirmation"
            onChange={onChangeHandler}
            required
            className={` outline-none p-1 border focus:border-b-blue-500 ${
              badPasswordMatch && 'border-b-red-500'
            }`}
          />
          {badPasswordMatch && (
            <p className="text-red-500 text-xs">Password must be same.</p>
          )}
          <div className="mt-2">
            <input
              type="checkbox"
              id="agreement"
              className=" accent-blue-500"
              required
            />
            <label htmlFor="agreement" className="text-sm">
              &nbsp;I agree to the terms of the app.
            </label>
          </div>
          <button
            className=" bg-blue-500 py-2 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
            type="submit"
            disabled={isLoading && true}
          >
            {isLoading ? <Loader /> : 'Sign Up'}
          </button>
          <div className=" flex text-sm">
            <p>Already have an account?&nbsp;</p>
            <Link to={'/login'}>
              <p className="text-blue-500 hover:text-blue-700">Login</p>
            </Link>
          </div>
        </form>
      </div>

      {registerSuccess && (
        <ToastNotification
          mode="registerSuccess"
          closeNotification={setRegisterSuccess}
        />
      )}

      {connectionError && (
        <ToastNotification
          mode="failedConnection"
          closeNotification={setConnectionError}
        />
      )}
    </main>
  )
}

export default Register

// TO-DO
/*
2. Name Should be larger than 4 Characters - Done
1. Email Checking - Done
3. Passwords should be 8 or longer - Done
4. Check two passwords - Done

5. Register Account - DONE
    5.1 Make A Register Slice - Done
6. Show loading when registering - Done
7. Show notification that registering is successful or not - Done
8. If successful >> lead to Login Page. - Done
9. If failed >> Show reason notification.
*/
