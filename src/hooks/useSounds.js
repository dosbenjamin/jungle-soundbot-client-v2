import { useState, useEffect, createContext } from 'react'
import useApi from '@/hooks/useApi'

export default () => {
  const [sounds, setSounds] = useState([])
  const makeRequest = useApi()

  const getSounds = async (makeRequest, setSounds) => {
    const request = await makeRequest('sounds')
    const sounds = await request.json()
    setSounds(sounds.reverse())
  }

  const refreshSounds = () => getSounds(makeRequest, setSounds)

  return { sounds, refreshSounds }
}
