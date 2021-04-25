import React, { createContext } from 'react'
import { useEffect, useState } from 'react/cjs/react.development'

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
