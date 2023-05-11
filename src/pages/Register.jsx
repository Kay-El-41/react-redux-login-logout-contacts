import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className=" flex justify-center items-center h-screen">
      <div className=" bg-white border-t-8 border-t-blue-500 shadow-md p-5 w-[300px]">
        <h1 className="text-center text-blue-500 text-3xl mb-4">
          Create Account
        </h1>
        <form className=" flex flex-col">
          <label htmlFor="username" className="text-sm text-gray-500 ">
            Username
          </label>
          <input
            type="text"
            id="username"
            className=" outline-none p-1 border focus:border-b-blue-500 mb-2"
          />
          <label htmlFor="email" className="text-sm text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className=" outline-none p-1 border focus:border-b-blue-500 mb-2"
          />
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <input
            type="password"
            id="password"
            className=" outline-none p-1 border focus:border-b-blue-500 mb-2"
          />
          <label htmlFor="confirm-password" className="text-sm text-gray-500">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className=" outline-none p-1 border focus:border-b-blue-500 mb-2"
          />
          <div>
            <input
              type="checkbox"
              id="agreement"
              className=" accent-blue-500"
            />
            <label htmlFor="agreement" className="text-sm">
              &nbsp;I agree to the terms of the app.
            </label>
          </div>
          <button
            className=" bg-blue-500 py-2 text-white hover:bg-blue-600 active:scale-95 mt-5 mb-1"
            type="submit"
          >
            Sign Up
          </button>
          <div className=" flex text-sm">
            <p>Already have an account?&nbsp;</p>
            <Link to={'/login'}>
              <p className="text-blue-500 hover:text-blue-700">Login</p>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Register
