import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const BackNavbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="relative bg-blue-500 flex h-16 p-3 sm:p-5">
      <div
        className="text-white flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="text-xl" />
        <p className="text-xl">Back</p>
      </div>
    </nav>
  )
}

export default BackNavbar
