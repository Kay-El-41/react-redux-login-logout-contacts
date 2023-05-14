import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

const BackNavbar = () => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(-1)
  }

  return (
    <nav className="relative flex h-16 bg-blue-500 p-3 sm:p-5">
      <div
        className="flex cursor-pointer items-center text-white"
        onClick={clickHandler}
      >
        <IoIosArrowBack className="text-md" />
        <p>BACK</p>
      </div>
    </nav>
  )
}

export default BackNavbar
