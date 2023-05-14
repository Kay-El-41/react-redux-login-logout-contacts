import React from 'react'

const ContactPlaceholderLoading = () => {
  // This component is copied and edited directly from Tailwind Website

  return (
    <div className="my-20 flex animate-pulse justify-center px-5">
      <div className="space-y-6 py-1">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 h-2 rounded bg-blue-700"></div>
          <div className="col-span-1 flex h-2 items-center justify-center">
            <h3 className="text-blue-500">Loading</h3>
          </div>
          <div className="col-span-1 h-2 rounded bg-blue-700"></div>
        </div>
      </div>
    </div>
  )
}

export default ContactPlaceholderLoading
