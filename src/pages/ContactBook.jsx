import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'

import SingleContact from '../components/SingleContact'
import { useGetContactsQuery } from '../redux/api/contact'
import { loadContact } from '../redux/services/contactSlice'

const ContactBook = () => {
  const { token } = useSelector((state) => state.authorizationSlice)
  const { contacts } = useSelector((state) => state.contactSlice)
  const { data } = useGetContactsQuery({ pathURL: '/contact', token })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadContact(data?.contacts?.data))
  }, [data])

  return (
    <>
      <Navbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" w-[500px] shadow-md p-5 sm:border-t-8 sm:border-t-blue-500 mb-10">
          <h1 className="text-center text-blue-500 text-3xl mb-4">
            Contact Users
          </h1>
          <hr />
          <div className="space-y-2 my-3">
            {contacts?.map((contact) => {
              return <SingleContact key={contact.id} {...contact} />
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default ContactBook

// NEED LOAD MORE BUTTON or FUNCTION!
// NEED  A LOADING STYLE WHILE FETCHING DATA - NEED SOMETHING SIMILAR TO SINGLE CONTACT
// NEED A SCREEN SAVER WHEN THERE IS NO CONTACT
// NEED A ADD NEW CONTACT BUTTON
