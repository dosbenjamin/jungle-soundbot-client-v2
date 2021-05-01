import React from 'react'

export default ({ children, label, disabled = false, className = '', ...rest }) => (
  <>
    <button
      className={`px-12 py-4 font-semibold text-blue-900 focus:outline-none focus:border-blue-775 bg-orange-900 hover:bg-orange-450 transition-colors disabled:bg-grey disabled:cursor-not-allowed ${
        className
      }`}
      disabled={disabled}
      {...rest}
    >
      {children || label}
    </button>
  </>
)
