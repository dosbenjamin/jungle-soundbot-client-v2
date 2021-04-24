import React, { useState, useContext, useEffect, useReducer } from 'react'
import RegisterSoundForm from '@/components/RegisterSoundForm/RegisterSoundForm'
import Error, { ErrorContext } from '@/components/Error/Error'

export default () => {
  const [errors, setErrors] = useState([])

  return (
    <div className="w-[1080px] flex">
      <div className="w-1/2">
        <div className="p-12 bg-blue-450">
          <h1 className="max-w-[5em] text-xl leading-none">Jungle Soundbot</h1>
        </div>
      </div>
      <div className="w-1/2 p-12 ml-2 bg-blue-225">
        <ErrorContext.Provider value={setErrors}>
          <RegisterSoundForm />
        </ErrorContext.Provider>
      </div>
      <ul className="absolute w-[540px] bottom-4 left-1/2 transform -translate-x-1/2">
        {errors.map((error, index) => (
          <Error
            message={error}
            className={index > 0 && 'mt-2'}
            key={error}
          />
        ))}
      </ul>
    </div>
  )
}
