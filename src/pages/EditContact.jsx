import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackNavbar from '../components/BackNavbar'
import Loader from '../components/Loader'
import ToastNotification from '../components/ToastNotification'

// TBD Later
import { useRegisterMutation } from '../redux/api/authorization'

const EditContact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)

  const [changeSuccess, setChangeSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  // TBD later
  const [register, { isLoading }] = useRegisterMutation()

  const onChangeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })

    // name validation
    if (e.target.name === 'name') {
      if (e.target.value.length > 4) {
        setBadName(false)
      } else {
        setBadName(true)
      }
    }

    // mail validation
    if (e.target.name === 'email') {
      const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (e.target.value.match(format)) {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }
  }

  const registerValidation = () => {
    if (badName || badMail) {
      console.log('bad')
      return false
    } else {
      console.log('good')
      return true
    }
  }

  const resetForm = () => {
    setUser({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    // if (registerValidation()) {
    //   try {
    //     const { data } = await register(user)
    //     console.log(data)
    //     if (!data) {
    //       setConnectionError(true)
    //     } else if (data?.success) {
    //       setRegisterSuccess(true)
    //       resetForm()
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
  }

  return (
    <>
      <BackNavbar />

      <main className="flex justify-center sm:mt-5 ">
        <div className=" w-[500px] shadow-md p-5 sm:border-t-8 sm:border-t-blue-500 mb-10">
          <h1 className="text-center text-blue-500 text-3xl mb-4">
            Edit Account
          </h1>
          <form className=" flex flex-col" onSubmit={submitHandler}>
            <label htmlFor="name" className="text-sm text-gray-500 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChangeHandler}
              value={contact.name}
              required
              className={` outline-none p-1 border focus:border-b-blue-500 ${
                badName && 'border-b-red-500'
              }`}
            />
            {badName && (
              <p className="text-red-500 text-xs">
                Name must be 4 Characters Long.
              </p>
            )}
            <label htmlFor="email" className="text-sm text-gray-500 mt-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeHandler}
              value={contact.email}
              required
              className={` outline-none p-1 border focus:border-b-blue-500 ${
                badMail && 'border-b-red-500'
              }`}
            />
            {badMail && (
              <p className="text-red-500 text-xs">
                Please enter a valid email.
              </p>
            )}

            <label htmlFor="phone" className="text-sm text-gray-500 mt-2">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              onChange={onChangeHandler}
              value={contact.phone}
              required
              className={` outline-none p-1 border focus:border-b-blue-500 ${
                badMail && 'border-b-red-500'
              }`}
            />

            <label htmlFor="address" className="text-sm text-gray-500 mt-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChangeHandler}
              value={contact.address}
              required
              className={` outline-none p-1 border focus:border-b-blue-500 ${
                badMail && 'border-b-red-500'
              }`}
            />

            <button
              className=" bg-blue-500 py-2 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
              type="submit"
              disabled={isLoading && true}
            >
              {isLoading ? <Loader /> : 'Sign Up'}
            </button>
          </form>
        </div>

        {changeSuccess && (
          <ToastNotification
            mode="registerSuccess"
            closeNotification={setChangeSuccess}
          />
        )}

        {connectionError && (
          <ToastNotification
            mode="failedConnection"
            closeNotification={setConnectionError}
          />
        )}
      </main>
    </>
  )
}

export default EditContact

// NEED OVERHAUL EDIT
