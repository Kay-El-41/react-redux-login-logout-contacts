import React, { useState } from 'react'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/authorization'
import ToastNotification from '../components/ToastNotification'
import { useDispatch } from 'react-redux'
import {
  saveUserData,
  saveLoginData,
} from '../redux/services/authorizationSlice'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [saveLogin, setSaveLogin] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    // mail validation
    if (e.target.name === 'email') {
      const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (e.target.value.match(format)) {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!badMail) {
      try {
        const { data } = await login(user)
        // try logging in
        if (!data) {
          setConnectionError(true)
        } else if (data?.success) {
          // if checkbox was selected, save data
          dispatch(saveUserData({ user: data?.user, token: data?.token }))
          if (saveLogin) {
            dispatch(saveLoginData())
          }
          // go to main page if login success
          navigate('/')
        } else {
          setLoginFailed(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className=" bg-white border-t-8 border-t-blue-500 shadow-md p-5 w-[300px]">
        <h1 className="text-center text-blue-500 text-3xl mb-4">Login</h1>
        <form className=" flex flex-col" onSubmit={submitHandler}>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
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
            name="password"
            id="password"
            value={user.password}
            onChange={onChangeHandler}
            required
            className=" outline-none p-1 border focus:border-b-blue-500 mb-2"
          />
          <div>
            <input
              type="checkbox"
              id="agreement"
              className=" accent-blue-500"
              value={saveLogin}
              onChange={(e) => setSaveLogin(!saveLogin)}
            />
            <label htmlFor="agreement" className="text-sm">
              &nbsp;Remember me on this device.
            </label>
          </div>
          <button
            className=" bg-blue-500 py-2 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
            type="submit"
            disabled={isLoading && true}
          >
            {isLoading ? <Loader /> : 'Login'}
          </button>
          <div className=" flex text-sm">
            <p>Don't have an account?&nbsp;</p>
            <Link to={'/register'}>
              <p className="text-blue-500 hover:text-blue-700">Register</p>
            </Link>
          </div>
        </form>
      </div>

      {loginFailed && (
        <ToastNotification
          mode="failedLogin"
          closeNotification={setLoginFailed}
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

export default Login

// functions

/*
1, Login Function
2. Bad Connection Toast Notification
3. Bad Login Toast Notification
4. CheckBox With Remember Me on This Device
   if Checked >> Save Cookies with Token and User, available for 7 days
   if not Checked >> Only one time login
*/
