import React, { useReducer, useState, useEffect, useContext } from 'react'

const inputReducer = (state, { type, payload }) => {
  const actions = {
    CHECK_INPUT: () => {
      const [name, value] = payload

      if (value.length) {
        return { ...state, [name]: { error: false, completed: true }}
      }

      return { ...state, [name]: { error: false, completed: false }}
    },
    SET_ERROR: () => {
      const newState = payload.reduce((state, [name]) => {
        return { ...state, [name]: { error: true, completed: false } }
      }, {})

      return { ...state, ...newState }
    },
    SET_INITIAL: () => ({ ...payload })
  }

  return actions[type]()
}

export default initialState => {
  const [inputs, dispatchInputs] = useReducer(inputReducer, initialState)
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([])

  const watch = name => value => dispatchInputs({
    type: 'CHECK_INPUT',
    payload: [name, value]
  })

  const catchErrors = (inputs, dispatchInputs, setErrors) => {
    const wrongs = Object.entries(inputs)
      .filter(([name, status]) => !status.completed)

    setErrors(() => wrongs.map(([name]) => name))

    if (wrongs.length) {
      dispatchInputs({ type: 'SET_ERROR', payload: wrongs })
      return true
    }
  }

  const validateForm = () => {
    const hasErrors = catchErrors(inputs, dispatchInputs, setErrors)

    if (hasErrors) return { status: 'error' }

    dispatchInputs({ type: 'SET_INITIAL', payload: initialState })
    return { status: 'ok' }
  }

  useEffect(() => {
    setDisabled(() => {
      return !Object.values(inputs)
        .every(({ completed }) => completed ? true : false)
    })
  }, [inputs])

  return { watch, disabled, inputs, validateForm, errors }
}
