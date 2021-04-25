import { useReducer, useEffect } from 'react'

const reducer = (state, { type, payload }) => {
  const actions = {
    SET_COMPLETED: () => ({ ...state, className: 'border-green' }),
    SET_ERROR: () => ({ ...state, className: 'border-red' }),
    SET_INITIAL: () => payload
  }

  return actions[type]()
}

export default (error) => {
  const initialState = { className: 'border-blue-775' }
  const [{ className }, dispatch] = useReducer(reducer, initialState)

  const setCompleted = () => dispatch({ type: 'SET_COMPLETED' })
  const reset = () => dispatch({ type: 'SET_INITIAL', payload: initialState })
  useEffect(() => error && dispatch({ type: 'SET_ERROR' }), [error])

  return { borderColor: className, setCompleted, reset }
}
