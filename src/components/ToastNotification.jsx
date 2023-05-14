import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'

const ToastNotification = ({ mode, closeNotification }) => {
  // Component to display action feedbacks
  const [heading, setHeading] = useState('')
  const [bodyText, setBodyText] = useState('')

  // The messages change with mode, mode are passed as props
  useEffect(() => {
    if (mode == 'failedLogin') {
      setHeading('Login Failed')
      setBodyText('Wrong email or password.')
    } else if (mode == 'failedConnection') {
      setHeading('Connection Failed')
      setBodyText('Please try again later')
    } else if (mode === 'registerSuccess') {
      setHeading('Registration Success')
      setBodyText('Please go to login page.')
    } else if (mode === 'passwordChangeSuccess') {
      setHeading('Password Changed')
      setBodyText('Please login again.')
    } else if (mode === 'passwordChangeFailed') {
      setHeading('Incorrect Password')
      setBodyText('Please try again.')
    } else if (mode === 'updateSuccess') {
      setHeading('Update Successful')
      setBodyText('Contact is updated successfully.')
    } else if (mode === 'addSuccess') {
      setHeading('Contact Added')
      setBodyText('Contact is added successfully.')
    }
  }, [mode])

  // Function to close the notification
  const closeHandler = () => {
    closeNotification(false)
  }

  return (
    <div className="absolute bottom-2 right-2 h-[65px] w-[250px] border-l-2 border-blue-500 bg-white p-3 shadow-md">
      {/* Header and Message */}
      <div>
        <h3 className="select-none font-semibold text-blue-500">{heading}</h3>
        <p className="select-none text-sm">{bodyText}</p>
      </div>
      {/* Close Button */}
      <div
        className=" absolute right-1 top-2 cursor-pointer text-xl"
        onClick={closeHandler}
      >
        <IoIosClose />
      </div>
    </div>
  )
}

export default ToastNotification
