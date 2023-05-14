import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { useGetContactsQuery } from '../redux/api/contact'
import { loadContact, updateLinks } from '../redux/services/contactSlice'
import ContactPlaceholderLoading from '../components/ContactPlaceholderLoading'

import Navbar from '../components/Navbar'
import ZeroData from '../components/ZeroData'
import SingleContact from '../components/SingleContact'
import PaginationButton from '../components/PaginationButton'

const ContactBook = () => {
  // This is the MAIN COMPONENT and Home Screen

  // Contacts for displaying contacts, token for fetching contacts from server, paginationLinks for pagination buttons
  const { contacts } = useSelector((state) => state.contactSlice)
  const { token } = useSelector((state) => state.authorizationSlice)
  const { paginationLinks } = useSelector((state) => state.contactSlice)

  // Initially fetch the contacts from the server
  const { data } = useGetContactsQuery({ pathURL: '/contact?page=1', token })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Once get the data from server, update the contacts and pagination links
  useEffect(() => {
    dispatch(loadContact(data?.contacts?.data))
    dispatch(updateLinks(data?.contacts?.links))
  }, [data])

  // Function to lead to Create Contact Screen
  const addContactHandler = () => {
    navigate('/add-contact')
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" w-[500px] p-5 shadow-md sm:border-t-8 sm:border-t-blue-500">
          {/* Headings */}
          <div className="flex items-center justify-between">
            <div></div>
            <h1 className="mb-4 text-center text-2xl text-blue-500">
              Contact Users
            </h1>
            <AiOutlinePlus
              className="cursor-pointer text-xl hover:text-blue-500"
              onClick={addContactHandler}
            />
          </div>

          <hr />
          {/* Contacts Division */}
          <div className="my-3 space-y-2">
            {/* If we fetching contacts, show placeholder! After fetching, if there is no contacts, show ZeroData Component, else show contacts */}
            {contacts ? (
              contacts.length > 0 ? (
                contacts?.map((contact) => {
                  return <SingleContact key={contact.id} {...contact} />
                })
              ) : (
                <ZeroData />
              )
            ) : (
              <ContactPlaceholderLoading />
            )}
          </div>
        </div>
      </main>
      {/* Pagination Buttons */}
      <div className="my-5 flex flex-wrap justify-center gap-2">
        {paginationLinks?.map((link, idx) => {
          return <PaginationButton key={idx} {...link} token={token} />
        })}
      </div>
    </>
  )
}

export default ContactBook

// NEED  A LOADING STYLE WHILE FETCHING DATA - NEED SOMETHING SIMILAR TO SINGLE CONTACT
// NEED A SCREEN SAVER WHEN THERE IS NO CONTACT
// NEED A ADD NEW CONTACT BUTTON[[[]]]
// NEED LOAD MORE BUTTON or FUNCTION!
