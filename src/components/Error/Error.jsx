import React, { createContext, useEffect, useState } from 'react'

export const ErrorContext = createContext([])

export default ({ message, className = '' }) => {
  const [opacity, setOpacity] = useState('opacity-0')
  useEffect(() => setOpacity('opacity-100'), [])

  return (
    <li className={`w-full p-4 bg-red transition-opacity ${opacity} ${className}`}>
      Erreur: {message.toLowerCase()}
    </li>
  )
}
