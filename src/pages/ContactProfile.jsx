import React, { useEffect, useState } from 'react'
import BackNavbar from '../components/BackNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSingleContactQuery } from '../redux/api/contact'

const ContactProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const { token } = useSelector((state) => state.authorizationSlice)
  const { data, isLoading } = useGetSingleContactQuery({ id, token })

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setProfile(data?.contact)
  }, [data])

  const editHandler = () => {
    if (!isLoading) {
      navigate(`/edit-contact/${profile.id}`)
    }
  }

  const deleteHandler = () => {
    if (!isLoading) {
      console.log(true)
    }
  }

  return (
    <>
      <BackNavbar />
      <main className="flex justify-center sm:mt-5 ">
        <div className=" w-[500px] shadow-md p-5 sm:border-t-8 sm:border-t-blue-500 mb-10">
          <h1 className="text-center text-blue-500 text-3xl mb-4">
            Contact Information
          </h1>
          <hr />
          <div className="space-y-2 my-3">
            <div>
              <h2 className="text-sm font-semibold select-none">Name</h2>
              <p>{isLoading ? '...' : profile?.name}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">Email</h2>
              <p>
                {isLoading
                  ? '...'
                  : profile?.email
                  ? profile.email
                  : 'Not Specified'}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">Phone</h2>
              <p>{isLoading ? '...' : profile?.phone}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold select-none">Address</h2>
              <p>
                {isLoading
                  ? '...'
                  : profile?.address
                  ? profile.address
                  : 'Not Specified'}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold select-none">
                Subscribed Date
              </h2>
              <p>{profile?.created_at?.slice(0, 10)}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-3 mb-1 select-none">
            Manage
          </h2>
          <hr />
          <div className="mt-3 mb-2 space-y-2">
            <p
              className="cursor-pointer select-none text-sm hover:font-semibold"
              onClick={editHandler}
            >
              Edit Contact
            </p>
            <p
              className="text-red-500 cursor-pointer select-none text-sm hover:font-semibold"
              onClick={deleteHandler}
            >
              Delete Contact
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default ContactProfile
// onclick function to be disabled while loading - DONE
// display a confirmation box when clicking delete
