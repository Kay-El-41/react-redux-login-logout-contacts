import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteContactMutation } from '../redux/api/contact'
import Loader from './Loader'

const ConfirmDelete = ({ close, id, token }) => {
  const navigate = useNavigate()

  // Redux function to perform action
  const [deleteContact, { isLoading }] = useDeleteContactMutation()

  // Function to cancel and close the dialog box
  const cancelHandler = () => {
    close(true)
  }

  // MAIN function to delete the contact
  const deleteHandler = async () => {
    try {
      const data = await deleteContact({ id, token })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 z-10 flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 border-t-8 border-t-red-500 bg-white p-5 shadow-md">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-red-500">Delete</h2>
      <hr />
      {/* Confirm Message */}
      <p className="">Are you sure to delete this contact?</p>

      {/* Buttons Division */}
      <div className="mt-3 flex justify-between">
        <button
          className="bg-red-500 px-6 py-1 text-sm text-white hover:bg-red-600 disabled:bg-red-200"
          onClick={deleteHandler}
          disabled={isLoading && true}
        >
          {isLoading ? <Loader /> : 'Yes'}
        </button>

        <button
          className="bg-gray-500 px-6 py-1 text-sm text-white hover:bg-gray-600 disabled:bg-gray-200"
          onClick={cancelHandler}
          disabled={isLoading && true}
        >
          {isLoading ? <Loader /> : 'No'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmDelete
