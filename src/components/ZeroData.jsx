import React from 'react'
import { ImFileEmpty } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const ZeroData = () => {
  // The Component is displayed where there are no contacts saved
  const navigate = useNavigate()

  // Function to lead to New Contact Screen
  const clickHandler = () => {
    navigate('/add-contact')
  }

  return (
    <div className="my-20 flex flex-col items-center justify-center gap-3">
      <ImFileEmpty className="text-5xl text-blue-500" />
      <div className="flex flex-col items-center">
        <p className="select-none">There is no contacts saved.</p>
        {/* Link to New Contact Page */}
        <p
          className="cursor-pointer select-none text-blue-500 hover:text-blue-600"
          onClick={clickHandler}
        >
          Create New
        </p>
      </div>
    </div>
  )
}

export default ZeroData
