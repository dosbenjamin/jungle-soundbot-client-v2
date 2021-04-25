import React, { useState } from 'react'
import SoundsList from '@/components/SoundsList/SoundsList'
import RegisterSoundForm from '@/components/RegisterSoundForm/RegisterSoundForm'
import ErrorToast, { ErrorContext } from '@/components/Error/Error'

export default () => {
  const [errorToasts, setErrorToasts] = useState([])

  return (
    <div className="w-[1080px] flex">
      <div className="w-1/2">
        <div className="p-12 bg-blue-450">
          <h1 className="max-w-[5em] text-xl leading-none">Jungle Soundbot</h1>
        </div>
        <div>
          <SoundsList />
        </div>
      </div>
      <div className="flex flex-col justify-between w-1/2 p-12 ml-2 bg-blue-225">
        <ErrorContext.Provider value={setErrorToasts}>
          <RegisterSoundForm />
        </ErrorContext.Provider>
      </div>
      <ul className="absolute w-[540px] bottom-4 left-1/2 transform -translate-x-1/2">
        {errorToasts.map(({ name, error }, index) => (
          <ErrorToast
            message={error.message}
            className={index > 0 ? 'mt-2' : ''}
            key={name}
          />
        ))}
      </ul>
    </div>
  )
}
