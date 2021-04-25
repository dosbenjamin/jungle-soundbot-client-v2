import React, { useReducer, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import useInputBorder from '@/hooks/useInputBorder'

export default ({ label, name, error, handler, className, defaultPlaceholder, dragPlaceholder }) => {
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder)
  const dropzone = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const { getRootProps, getInputProps, isDragActive, rootRef } = useDropzone()
  const { borderColor, setCompleted, reset } = useInputBorder(error)

  const changeHandler = ({ target }) => {
    setLoaded(true)
    setPlaceholder(target.files[0].name)
    handler(target.value)
    !!target.value.length ? setCompleted() : reset()
    rootRef.current.blur()
  }

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <div
        className={
          `p-12 bg-blue-775 cursor-pointer font-normal focus:border-grey focus:outline-none border text-center text-grey min-h-[160px] flex items-center justify-center mt-4 ${
            borderColor
        }`}
        {...getRootProps()}
      >
        <input
          {...getInputProps({ multiple: false })}
          onChange={changeHandler}
          onClick={() => rootRef.current.blur()}
          id={name}
          name={name}
        />
        {isDragActive
          ? <p>{dragPlaceholder}</p>
          : <p className={`max-w-[12em] leading-5 ${loaded ? 'text-white' : ''}`}>{placeholder}</p>
        }
      </div>
    </div>
  )
}
