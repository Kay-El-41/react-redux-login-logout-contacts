import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const SingleContact = ({ id, name, email }) => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(`/contact/${id}`)
  }

  const editHandler = () => {
    navigate(`/edit-contact/${id}`)
  }

  const deleteHandler = () => {
    console.log('will delete soon')
  }

  return (
    <>
      <div className="relative flex justify-between items-center">
        <div className="select-none py-1">
          <p
            className=" hover:text-blue-500 cursor-pointer"
            onClick={onClickHandler}
          >
            {name}
          </p>
          <p className="text-xs">{email}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={` flex gap-2 p-2 text-right bg-white shadow-md w-fit border-l-8 border-l-blue-500 ${
              !showMenu && 'hidden'
            }`}
          >
            <p
              className="select-none cursor-pointer text-sm hover:font-semibold"
              onClick={editHandler}
            >
              Edit
            </p>
            <p className="text-sm">|</p>
            <p
              className="select-none cursor-pointer text-red-500 text-sm hover:font-semibold"
              onClick={deleteHandler}
            >
              Delete
            </p>
          </div>
          <CiMenuKebab
            className={`cursor-pointer hover:text-blue-500 ${
              showMenu && 'text-blue-500'
            }`}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
      <hr />
    </>
  )
}

export default SingleContact


// update delete function, can be copied to or be copied to Contact Profile. JSX