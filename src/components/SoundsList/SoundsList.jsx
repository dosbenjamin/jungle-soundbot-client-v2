import React, { useState, useEffect } from 'react'
import useApi from '@/hooks/useApi'

export default () => {
  const [sounds, setSounds] = useState([])
  const makeRequest = useApi()

  const getSoundsList = async () => {
    const request = await makeRequest('sounds')
    const sounds = await request.json()
    setSounds(sounds.reverse())
  }

  useEffect(() => getSoundsList(), [])

  return (
    <div className="p-12 mt-2 bg-blue-775">
      <h2 className="text-lg">Derniers sons ajoutés</h2>
      <ul className="h-full max-h-[328px] overflow-y-scroll mt-8">
        {sounds.map(({ id, command, author }, index) => (
          <li
            key={id}
            className={`font-normal text-grey ${index > 0 ? 'mt-2' : ''}`}
          >
            {command} par <strong className="font-semibold">{author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
