import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'

const ToastNotification = ({ mode, resetLogin }) => {
  const [heading, setHeading] = useState('')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (mode == 'failedLogin') {
      setHeading('Login Failed')
      setErrorText('Wrong email or password')
    } else if (mode == 'failedConnection') {
      setHeading('Connection Failed')
      setErrorText('Please try again later')
    }
  }, [mode])

  return (
    <div className="absolute bottom-2 right-2 w-[250px] h-[65px] shadow-md p-3 border-l-2 border-blue-500">
      <div>
        <h3 className="text-blue-500 font-semibold">{heading}</h3>
        <p className="text-sm">{errorText}</p>
      </div>
      <div
        className=" absolute right-1 top-2 cursor-pointer text-xl"
        onClick={() => resetLogin(false)}
      >
        <IoIosClose />
      </div>
    </div>
  )
}

export default ToastNotification
