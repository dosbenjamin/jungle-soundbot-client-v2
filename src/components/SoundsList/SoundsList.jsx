import React, { useEffect, useContext, createContext } from 'react'
import useSounds from '@/hooks/useSounds'
import { GooSpinner } from "react-spinners-kit"

export const SoundsContext = createContext()

export default ({ soundsList }) => {
  const { sounds, refreshSounds, loaded } = useSounds()
  const setSounds = useContext(SoundsContext)

  useEffect(() => refreshSounds(), [])
  useEffect(() => setSounds(() => sounds), [sounds])

  return (
    <div className="p-12 mt-2 bg-blue-775 min-h-[478px]">
      <h2 className="text-lg">Tous les sons</h2>
      {loaded ?
        (
          <ul className="font-normal text-grey h-full max-h-[328px] overflow-y-scroll mt-8">
            {soundsList.map(({ id, command, author }, index) => (
              <li
                key={id}
                className={`${index > 0 ? 'mt-2' : ''}`}
              >
                {command} ➝ <strong className="font-semibold">{author}</strong>
              </li>
            ))}
          </ul>
        ) :
        (
          <div className="flex items-center justify-center h-[328px] mt-8">
            <GooSpinner />
          </div>
        )
      }
    </div>
  )
}
