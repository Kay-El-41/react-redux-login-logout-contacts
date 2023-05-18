import React from 'react'
import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'

const ErrorPage = () => {
  return (
    <>
      <nav className="flex h-16 items-center justify-between bg-blue-500 p-3 sm:p-5">
        {/* LOGO */}
        <div>
          <Link to={'/'}>
            <h1 className="select-none text-2xl font-bold text-white drop-shadow">
              CONTACT MANAGER
            </h1>
          </Link>
        </div>
      </nav>
      {/* ERROR and LINK */}
      <main>
        <div className="mx-auto my-auto flex h-fit w-fit flex-col items-center p-20">
          <BiError className="text-8xl text-blue-500" />
          <p className=" text-center">
            Look like you lost. <br /> There is no such page.
          </p>
          <Link to={'/'}>
            <p className="text-sm text-blue-500 underline">Go Home</p>
          </Link>
        </div>
      </main>
    </>
  )
}

export default ErrorPage
