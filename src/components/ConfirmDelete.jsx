import React from 'react'
import { useDeleteContactMutation } from '../redux/api/contact'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const ConfirmDelete = ({ close, id, token }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation()
  const navigate = useNavigate()

  const cancelHandler = () => {
    close(false)
    // this is set to false due to reverse naming from parent
  }

  const deleteHandler = async () => {
    try {
      const data = await deleteContact({ id, token })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="z-20 bg-white border-t-8 border-t-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 shadow-md w-[300px] p-5">
      <h2 className="font-semibold text-red-500">Delete</h2>
      <hr />
      <h3>Are you sure to delete this contact?</h3>
      <div className="flex justify-between mt-2">
        <button
          className="px-6 py-1 bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200"
          onClick={deleteHandler}
          disabled={isLoading && true}
        >
          {isLoading ? <Loader /> : 'Yes'}
        </button>
        <button
          className="px-6 py-1 bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-200"
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
