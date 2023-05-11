import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'

const ToastNotification = ({ mode, closeNotification }) => {
  const [heading, setHeading] = useState('')
  const [bodyText, setBodyText] = useState('')

  useEffect(() => {
    if (mode == 'failedLogin') {
      setHeading('Login Failed')
      setBodyText('Wrong email or password')
    } else if (mode == 'failedConnection') {
      setHeading('Connection Failed')
      setBodyText('Please try again later')
    } else if (mode === 'registerSuccess') {
      setHeading('Registration Success')
      setBodyText('Please go to login page')
    }
  }, [mode])

  return (
    <div className="bg-white absolute bottom-2 right-2 w-[250px] h-[65px] shadow-md p-3 border-l-2 border-blue-500">
      <div>
        <h3 className="text-blue-500 font-semibold select-none">{heading}</h3>
        <p className="text-sm select-none">{bodyText}</p>
      </div>
      <div
        className=" absolute right-1 top-2 cursor-pointer text-xl"
        onClick={() => closeNotification(false)}
      >
        <IoIosClose />
      </div>
    </div>
  )
}

export default ToastNotification
