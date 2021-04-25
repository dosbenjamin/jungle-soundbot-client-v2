import React, { useEffect, useReducer } from 'react'
import useInputBorder from '@/hooks/useInputBorder'

export default ({ label, name, error, handler, className, ...rest }) => {
  const { borderColor, setCompleted, reset } = useInputBorder(error)

  const changeHandler = ({ target }) => {
    !!target.value.length ? setCompleted() : reset()
    handler(target.value)
  }

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={changeHandler}
        className={`block w-full p-4 mt-4 bg-blue-775 border outline-none focus:border-grey transition-colors ${borderColor}`}
        name={name}
        id={name}
        {...rest}
      />
    </div>
  )
}
