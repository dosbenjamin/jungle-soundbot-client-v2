import React, { useState, useEffect, useContext, createContext } from 'react'
import useSounds from '@/hooks/useSounds'

export const SoundsContext = createContext()

export default ({ soundsList }) => {
  const { sounds, refreshSounds } = useSounds()
  const setSounds = useContext(SoundsContext)

  useEffect(() => {
    refreshSounds()
  }, [])

  useEffect(() => setSounds(() => sounds), [sounds])

  return (
    <div className="p-12 mt-2 bg-blue-775">
      <h2 className="text-lg">Tous les sons</h2>
      <ul className="h-full max-h-[328px] overflow-y-scroll mt-8">
        {soundsList.map(({ id, command, author }, index) => (
          <li
            key={id}
            className={`font-normal text-grey ${index > 0 ? 'mt-2' : ''}`}
          >
            {command} ➝ <strong className="font-semibold">{author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
