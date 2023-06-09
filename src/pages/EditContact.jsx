import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from '../redux/api/contact'
import { loadUserData } from '../redux/services/authorizationSlice'

import Loader from '../components/Loader'
import BackNavbar from '../components/BackNavbar'
import ToastNotification from '../components/ToastNotification'

const EditContact = () => {
  // Get id to fetch contact data to fill in edit form
  const { id } = useParams()

  // State to collect data and prefill form
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // States for data validation and live feedbacks
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [badPhone, setBadPhone] = useState(false)

  // States for action feedbacks
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // REDUX function to edit and update a contact
  const [updateContact, { isLoading: updating }] = useUpdateContactMutation()

  // Token is required to fetch data
  const { token } = useSelector((state) => state.authorizationSlice)
  // Get Contact Data from server
  const { data, isLoading } = useGetSingleContactQuery({ id, token })

  useEffect(() => {
    // To prevent data losing from refresh
    dispatch(loadUserData())
  }, [])

  // Once contact data is fetched, set it in the state, so the inputs are prefilled with existing data
  useEffect(() => {
    if (data) {
      const { name, email, address, phone } = data?.contact
      setContact({
        name: name ? name : '',
        email: email ? email : '',
        address: address ? address : '',
        phone: phone ? phone : '',
      })
    }
  }, [data])

  // Get data from the inputs and live validation, and show feedbacks
  const onChangeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })

    // Name Validation, required must be over 4 characters
    if (e.target.name === 'name') {
      if (e.target.value.length > 4) {
        setBadName(false)
      } else {
        setBadName(true)
      }
    }

    // Mail Validation, not required but when filled, required a valid email
    if (e.target.name === 'email') {
      const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (e.target.value.match(format) || e.target.value === '') {
        setBadMail(false)
      } else {
        setBadMail(true)
      }
    }

    //Phone Validation, required and must be over 3 characters and must only numbers
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

  // Function for Data Validation before updating contact
  const registerValidation = () => {
    if (badName || badMail || badPhone) {
      return false
    } else {
      return true
    }
  }

  //  MAIN function to update a contact
  const submitHandler = async (e) => {
    e.preventDefault()
    // Phone must be integer
    setContact({
      ...contact,
      phone: +contact.phone,
    })
    if (registerValidation()) {
      try {
        const { data } = await updateContact({
          id,
          token,
          updateContact: contact,
        })
        if (!data) {
          setConnectionError(true)
        } else if (data?.success) {
          setUpdateSuccess(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // When cancelled, go back to previous page
  const cancelHandler = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" mb-10 w-[500px] p-5 shadow-md sm:border-t-8 sm:border-t-blue-500">
          {/* Headers */}
          <h1 className="mb-4 text-center text-2xl text-blue-500">
            Edit Account
          </h1>
          {/* Inputs */}
          <form className=" flex flex-col" onSubmit={submitHandler}>
            {/* Name */}
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
              required
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
                className=" mt-5 mb-1 bg-blue-500 px-6 py-2 text-center text-white hover:bg-blue-600 disabled:bg-blue-200"
                type="submit"
                disabled={(isLoading || updating) && true}
              >
                {isLoading || updating ? <Loader /> : 'Update'}
              </button>

              <button
                className=" mt-5 mb-1 bg-gray-500 py-2 px-6 text-center text-white hover:bg-gray-600 disabled:bg-gray-200"
                disabled={(isLoading || updating) && true}
                onClick={cancelHandler}
              >
                {isLoading || updating ? <Loader /> : 'Cancel'}
              </button>
            </div>
          </form>
        </div>

        {/* ToastNotifications, absolute positioned */}
        {updateSuccess && (
          <ToastNotification
            mode="updateSuccess"
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

export default EditContact

// NEED OVERHAUL EDIT
