import React, { useState } from 'react'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/authorization'
import ToastNotification from '../components/ToastNotification'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [login, { isLoading }] = useLoginMutation()
  const [badMail, setBadMail] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'email') {
      if (mailValidation(e.target.value)) {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }
  }

  const mailValidation = (mailAddr) => {
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (mailAddr.match(format)) {
      return true
    } else {
      return false
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login(user)
      // try logging in
      if (!data) {
        setConnectionError(true)
      } else if (data?.success) {
        navigate('/')
      } else {
        setLoginFailed(true)
      }
    } catch (error) {
      console.log(error)
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
            className={` outline-none p-1 border focus:border-b-blue-500 mb-2 ${
              badMail && 'border-b-red-500'
            }`}
          />
          <label htmlFor="password" className="text-sm text-gray-500">
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
          <button
            className=" bg-blue-500 py-2 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
            type="submit"
            disabled={isLoading && true}
          >
            {isLoading ? <Loader /> : 'Sign Up'}
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
        <ToastNotification mode="failedLogin" resetLogin={setLoginFailed} />
      )}

      {connectionError && (
        <ToastNotification
          mode="failedConnection"
          resetLogin={setConnectionError}
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

TO-DO
4. Add CheckBox With Remember Me on This Device
  if Checked >> Save Cookies with Token


*/
