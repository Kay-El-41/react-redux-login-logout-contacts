import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetContactsQuery } from '../redux/api/contact'
import { loadContact, updateLinks } from '../redux/services/contactSlice'

const PaginationButton = (props) => {
  // States for modifying props data, and checking conditions
  const [label, setLabel] = useState('')
  const [isNull, setNull] = useState(false)
  const [isActive, setActive] = useState(false)

  const dispatch = useDispatch()

  // URL has to be sliced since we use Redux Query, we only need endpoint
  const pathURL = props.url?.slice(39)
  const { data } = useGetContactsQuery({ pathURL, token: props.token })

  useEffect(() => {
    // URL is null, then button are disabled, worked with Next and Previous Buttons
    if (props.url === null) {
      setNull(true)
    } else {
      setNull(false)
    }
    // If this is active page, this page button is disabled
    if (props.active === true) {
      setActive(true)
    } else {
      setActive(false)
    }
    // Label are fixed since HTML entities are in string, and cannot rendered properly in Next and Previous Buttons
    if (props.label === 'Next &raquo;') {
      setLabel('Next')
    } else if (props.label === '&laquo; Previous') {
      setLabel('Previous')
    } else {
      setLabel(props.label)
    }
  }, [props])

  // MAIN function to change ContactBook display
  const onClickHandler = () => {
    // update the contacts
    dispatch(loadContact(data?.contacts?.data))
    // update the links, so the pagination buttons are also updated
    dispatch(updateLinks(data?.contacts?.links))
  }

  return (
    <button
      className={`border border-blue-500 px-2 py-1 text-xs text-blue-500 disabled:border-gray-200 ${
        isActive && 'bg-blue-500 text-white'
      }`}
      disabled={(isActive || isNull) && true}
      onClick={onClickHandler}
    >
      {label}
    </button>
  )
}

export default PaginationButton
