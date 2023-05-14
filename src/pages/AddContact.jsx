import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import BackNavbar from '../components/BackNavbar'
import ToastNotification from '../components/ToastNotification'

import { useAddContactMutation } from '../redux/api/contact'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserData } from '../redux/services/authorizationSlice'

const AddContact = () => {
  // state for data
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // states for data validation and live feedback
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [badPhone, setBadPhone] = useState(false)

  // states for action feedbacks
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Redux Function for creating new contacts
  const [addContact, { isLoading }] = useAddContactMutation()

  // Token is required for creating new contacts
  const { token } = useSelector((state) => state.authorizationSlice)

  useEffect(() => {
    // THIS IS REQUIRED,
    // When user refresh the page, data won't disappear since refreshing loses the data especially when we need token
    dispatch(loadUserData())
  }, [])

  // Function for collecting data from form and live validation and give feedback
  const onChangeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })

    // Name validation (Required and must be 4 or over)
    if (e.target.name === 'name') {
      if (e.target.value.length > 4) {
        setBadName(false)
      } else {
        setBadName(true)
      }
    }

    // Mail validation (not Required but when added, required a correct mail)
    if (e.target.name === 'email') {
      const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (e.target.value.match(format) || e.target.value === '') {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }

    // Phone Validation (Required and must be over 3, and must be only numbers)
    if (e.target.name === 'phone') {
      if (e.target.value.length > 3) {
        if (/^\d+$/.test(e.target.value)) {
          setBadPhone(false)
        } else {
          setBadPhone(true)
        }
      } else {
        setBadPhone(true)
      }
    }
    // Address is optional
  }

  // Function to reset form after creating a contact
  const resetForm = () => {
    setContact({
      name: '',
      email: '',
      phone: '',
      address: '',
    })
  }

  // Function for Data Validation before performing action
  const registerValidation = () => {
    if (badName || badMail || badPhone) {
      return false
    } else {
      return true
    }
  }

  // MAIN Function to perform the action, creating a new contact
  const submitHandler = async (e) => {
    e.preventDefault()
    // phone number must be integer
    setContact({
      ...contact,
      phone: +contact.phone,
    })
    if (registerValidation()) {
      try {
        const { data } = await addContact({
          token,
          newContact: contact,
        })
        if (!data) {
          setConnectionError(true)
        } else if (data?.success) {
          setUpdateSuccess(true)
          resetForm()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // Function to go back to previous page, when user clicked CANCEL button
  const cancelHandler = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center sm:mt-5">
        <div className=" mb-10 w-[500px] p-5 shadow-md sm:border-t-8 sm:border-t-blue-500">
          {/* Heading */}
          <h1 className="mb-4 text-center text-2xl text-blue-500">
            Add New Account
          </h1>
          {/* Form Inputs */}
          {/* Name */}
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
              className={` border p-1 outline-none focus:border-b-blue-500 ${
                badName && 'border-b-red-500'
              }`}
            />
            {badName && (
              <p className="text-xs text-red-500">
                Name must be 4 Characters Long.
              </p>
            )}
            {/* Email */}
            <label htmlFor="email" className="mt-2 text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeHandler}
              value={contact.email}
              className={` border p-1 outline-none focus:border-b-blue-500 ${
                badMail && 'border-b-red-500'
              }`}
            />
            {badMail && (
              <p className="text-xs text-red-500">
                Please enter a valid email.
              </p>
            )}
            {/* Phone */}
            <label htmlFor="phone" className="mt-2 text-sm text-gray-500">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={onChangeHandler}
              value={contact.phone}
              required
              className={` border p-1 outline-none focus:border-b-blue-500 ${
                badPhone && 'border-b-red-500'
              }`}
            />

            {badPhone && (
              <p className="text-xs text-red-500">
                A valid phone number is required
              </p>
            )}
            {/* Address */}
            <label htmlFor="address" className="mt-2 text-sm text-gray-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChangeHandler}
              value={contact.address}
              className=" border p-1 outline-none focus:border-b-blue-500"
            />
            {/* Buttons Division */}
            <div className="flex justify-between">
              <button
                className=" mt-5 mb-1 bg-blue-500 px-8 py-2 text-center text-white hover:bg-blue-600 disabled:bg-blue-200"
                type="submit"
                disabled={isLoading && true}
              >
                {isLoading ? <Loader /> : 'Add'}
              </button>

              <button
                className=" mt-5 mb-1 bg-gray-500 py-2 px-6 text-center text-white hover:bg-gray-600 disabled:bg-gray-200"
                disabled={isLoading && true}
                onClick={cancelHandler}
              >
                {isLoading ? <Loader /> : 'Cancel'}
              </button>
            </div>
          </form>
        </div>

        {/* Toast Notification for action feedbacks, absolute positioned */}
        {updateSuccess && (
          <ToastNotification
            mode="addSuccess"
            closeNotification={setUpdateSuccess}
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

export default AddContact

// NEED OVERHAUL EDIT
