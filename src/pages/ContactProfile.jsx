import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetSingleContactQuery } from '../redux/api/contact'
import { loadUserData } from '../redux/services/authorizationSlice'

import BackNavbar from '../components/BackNavbar'
import ConfirmDelete from '../components/ConfirmDelete'

const ContactProfile = () => {
  // Get id for fetching contact data
  const { id } = useParams()

  // States to display contacts information and show/hide Confirm Delete Dialog
  const [profile, setProfile] = useState({})
  const [hideDeleteSection, setHideDeleteSection] = useState(true)

  //Token is required to fetch data
  const { token } = useSelector((state) => state.authorizationSlice)

  // Fetch contact data from server
  const { data, isLoading } = useGetSingleContactQuery({ id, token })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Load data to prevent from data becoming null after refresh
  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  // Once we get data, set it to profile
  useEffect(() => {
    setProfile(data?.contact)
  }, [data])

  // Function to lead to Edit Contact Screen once User clicked EDIT
  // While data is still loading, this action is not to be performed
  const editHandler = () => {
    if (!isLoading) {
      navigate(`/edit-contact/${profile.id}`)
    }
  }

  // Function to show Confirm Delete Dialog once User clicked DELETE
  // While data is still loading, this action is not to be performed
  const deleteHandler = async () => {
    if (!isLoading) {
      setHideDeleteSection(false)
    }
  }

  return (
    <>
      <BackNavbar />

      <main className="flex justify-center sm:mt-5 ">
        <div className=" mb-10 w-[500px] p-5 shadow-md sm:border-t-8 sm:border-t-blue-500">
          {/* Headers */}
          <h1 className="mb-4 text-center text-2xl text-blue-500">
            Contact Information
          </h1>
          <hr />
          {/* General Information */}
          <div className="my-3 space-y-2">
            <div>
              <h2 className="select-none text-sm font-semibold">Name</h2>
              <p>{isLoading ? '...' : profile?.name}</p>
            </div>
            <div>
              <h2 className="select-none text-sm font-semibold">Email</h2>
              <p>
                {isLoading
                  ? '...'
                  : profile?.email
                  ? profile.email
                  : 'Not Specified'}
              </p>
            </div>
            <div>
              <h2 className="select-none text-sm font-semibold">Phone</h2>
              <p>{isLoading ? '...' : profile?.phone}</p>
            </div>

            <div>
              <h2 className="select-none text-sm font-semibold">Address</h2>
              <p>
                {isLoading
                  ? '...'
                  : profile?.address
                  ? profile.address
                  : 'Not Specified'}
              </p>
            </div>
            <div>
              <h2 className="select-none text-sm font-semibold">
                Subscribed Date
              </h2>
              <p>{profile?.created_at?.slice(0, 10)}</p>
            </div>
          </div>
          {/* Actions Division */}
          <h2 className="mt-3 mb-1 select-none text-xl font-semibold">
            Manage
          </h2>
          <hr />
          {/* Actions */}
          <div className="mt-3 mb-2 space-y-2">
            <p
              className="cursor-pointer select-none text-sm hover:font-semibold"
              onClick={editHandler}
            >
              Edit Contact
            </p>
            <p
              className="cursor-pointer select-none text-sm text-red-500 hover:font-semibold"
              onClick={deleteHandler}
            >
              Delete Contact
            </p>
          </div>
        </div>
      </main>
      {/* Confirm Delete Dialog */}
      {!hideDeleteSection && (
        <ConfirmDelete
          close={setHideDeleteSection}
          id={profile.id}
          token={token}
        />
      )}
    </>
  )
}

export default ContactProfile
