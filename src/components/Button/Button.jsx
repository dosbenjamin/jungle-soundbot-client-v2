import React from 'react'

export default ({ label, disabled = false, className = '', ...rest }) => (
  <>
    <button
      className={`px-12 py-4 font-semibold text-blue-900 bg-orange disabled:bg-grey disabled:cursor-not-allowed ${
        className
      }`}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  </>
)
