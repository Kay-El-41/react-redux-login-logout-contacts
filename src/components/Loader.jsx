import React from 'react'
// import './styles/loader.css'

const Loader = () => {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  )
}

export default Loader
