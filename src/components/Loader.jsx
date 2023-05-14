import React from 'react'

const Loader = () => {
  // This circle loading component is copied directly from Internet Resources
  // Used for button loading while preforming actions
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-500 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  )
}

export default Loader
