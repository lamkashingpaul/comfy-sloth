import React from 'react'

const Error = ({ children }) => {
  return <div className="section section-center text-center">
    <h2>there was an error...</h2>
    {children}
  </div>
}

export default Error
