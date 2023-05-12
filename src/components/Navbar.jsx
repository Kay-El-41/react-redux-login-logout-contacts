import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api/authorization'
import { removeData } from '../redux/services/authorizationSlice'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useSelector((state) => state.authorizationSlice)
  const { token } = useSelector((state) => state.authorizationSlice)

  const navigate = useNavigate()

  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(removeData())
    logout(token)
    navigate('/login')
  }

  return (
    <nav className="relative bg-blue-500 h-16 flex justify-between items-center p-3 sm:p-5">
      <form>
        <input
          type="text"
          name=""
          id=""
          className="p-2 outline-none shadow-sm"
          placeholder="Search"
        />
      </form>
      <FaUserCircle
        className="text-5xl cursor-pointer text-white"
        onClick={() => setShowMenu(!showMenu)}
      />
      <div
        className={`absolute flex flex-col gap-2 p-2 text-right bg-white shadow-md w-[200px] h-fit border-t-8 border-t-blue-500 top-20 right-3 transition-opacity ease-in duration-100 ${
          showMenu ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="select-none font-semibold">{user.name}</h3>
        <hr />
        <Link to="/profile">
          <p className="select-none cursor-pointer">Profile</p>
        </Link>
        <p
          className="select-none cursor-pointer text-red-500"
          onClick={logOutHandler}
        >
          Log Out
        </p>
      </div>
    </nav>
  )
}

export default Navbar

// TODO
/*
1. GET USER DATA From Auth Slice
2. Make a setting page - DONE
3. Make Log Out Function
    >> Remove Cookies When Logging Out
4. Make Menu Disappear and Appear with State

---------------------------------------------------

1 - WE have to check, if we have a user in Cookie?
2 - If we don't have cookies, send the client to login page
2 - Only after login, get the data from state

*/
