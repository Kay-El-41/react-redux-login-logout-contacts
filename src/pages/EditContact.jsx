import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackNavbar from '../components/BackNavbar'
import Loader from '../components/Loader'
import ToastNotification from '../components/ToastNotification'

import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from '../redux/api/contact'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserData } from '../redux/services/authorizationSlice'

const EditContact = () => {
  const { id } = useParams()

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [badPhone, setBadPhone] = useState(false)

  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updateContact, { isLoading: updating }] = useUpdateContactMutation()

  const { token } = useSelector((state) => state.authorizationSlice)
  const { data, isLoading } = useGetSingleContactQuery({ id, token })

  useEffect(() => {
    dispatch(loadUserData())
  }, [])

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

    // phone validation
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
  }

  const registerValidation = () => {
    if (badName || badMail || badPhone) {
      console.log('bad')
      return false
    } else {
      console.log('good')
      return true
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
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
        console.log(data)
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

  const cancelHandler = (e) => {
    e.preventDefault()
    navigate(-1)
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
              type="tel"
              id="phone"
              name="phone"
              onChange={onChangeHandler}
              value={contact.phone}
              required
              className={` outline-none p-1 border focus:border-b-blue-500 ${
                badPhone && 'border-b-red-500'
              }`}
            />

            {badPhone && (
              <p className="text-red-500 text-xs">
                A valid phone number is required
              </p>
            )}

            <label htmlFor="address" className="text-sm text-gray-500 mt-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChangeHandler}
              value={contact.address}
              className=" outline-none p-1 border focus:border-b-blue-500"
            />
            <div className="flex justify-between">
              <button
                className=" bg-blue-500 px-6 py-2 text-center text-white hover:bg-blue-600 mt-5 mb-1 disabled:bg-blue-200"
                type="submit"
                disabled={(isLoading || updating) && true}
              >
                {isLoading || updating ? <Loader /> : 'Update'}
              </button>

              <button
                className=" bg-gray-500 py-2 px-6 text-center text-white hover:bg-gray-600 mt-5 mb-1 disabled:bg-gray-200"
                disabled={(isLoading || updating) && true}
                onClick={cancelHandler}
              >
                {isLoading || updating ? <Loader /> : 'Cancel'}
              </button>
            </div>
          </form>
        </div>

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
