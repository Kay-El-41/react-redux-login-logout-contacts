import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CiMenuKebab } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from '../components/ConfirmDelete'

const SingleContact = ({ id, name, email }) => {
  // Component for single contact displayed at Contact Book Screen

  // State to show menu, deleteSections when DELETE button is clicked
  const [showMenu, setShowMenu] = useState(false)
  const [hideDeleteSection, setHideDeleteSection] = useState(true)

  const navigate = useNavigate()

  // Token is required to DELETE a contact, this is sent as prop to ConfirmDelete Component
  const { token } = useSelector((state) => state.authorizationSlice)

  // Function to lead to Contact Profile Page
  const onClickHandler = () => {
    navigate(`/contact/${id}`)
  }

  // Function to Lead to Edit Contact Page
  const editHandler = () => {
    navigate(`/edit-contact/${id}`)
  }

  // Function to show Confirm Delete Dialog
  const deleteHandler = () => {
    setShowMenu(!showMenu)
    setHideDeleteSection(false)
  }

  return (
    <>
      {/* The component show contact name and email (if exists) */}
      <div className="relative flex items-center justify-between">
        {/* Name & Email*/}
        <div className="select-none py-1">
          <p
            className=" cursor-pointer hover:text-blue-500"
            onClick={onClickHandler}
          >
            {name}
          </p>
          <p className="text-xs">{email}</p>
        </div>
        {/* Contact Menu & Kebab Menu */}
        <div className="flex items-center gap-2">
          {/* Contact Menu comes first and it is hidden */}
          <div
            className={` flex w-fit gap-2 border-l-8 border-l-blue-500 bg-white p-2 text-right shadow-md ${
              !showMenu && 'hidden'
            }`}
          >
            <p
              className="cursor-pointer select-none text-sm hover:font-semibold"
              onClick={editHandler}
            >
              Edit
            </p>
            <p className="text-sm">|</p>
            <p
              className="cursor-pointer select-none text-sm text-red-500 hover:font-semibold"
              onClick={deleteHandler}
            >
              Delete
            </p>
          </div>
          {/* Kebab Icon */}
          <CiMenuKebab
            className={`cursor-pointer hover:text-blue-500 ${
              showMenu && 'text-blue-500'
            }`}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
      {/* Line */}
      <hr />

      {/* Confirm Delete Dialog, absolute positioned */}
      {!hideDeleteSection && (
        <ConfirmDelete close={setHideDeleteSection} id={id} token={token} />
      )}
    </>
  )
}

export default SingleContact
