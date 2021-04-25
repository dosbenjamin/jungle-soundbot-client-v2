import React, { useReducer, useState, useEffect } from 'react'

const reducer = (state, { type, payload }) => {
  const actions = {
    CHECK_INPUT: () => {
      const [name, value] = payload

      return {
        ...state,
        [name]: {
          error: {
            status: false,
            message: state[name].error.message
          },
          completed: value.length ? true : false,
          value
        }
      }
    },
    SET_DEFAULT_ERROR: () => {
      const { wrongs, initialState } = payload

      return {
        ...state,
        ...wrongs.reduce((newState, { name }) => {
          return {
            ...newState,
            [name]: {
              ...state[name],
              error: {
                status: true,
                message: initialState[name].error.message
              }
            }
          }
        }, {})
      }
    },
    SET_CUSTOM_ERROR: () => {
      return {
        ...state,
        ...payload.reduce((newState, { name, error }) => {
          return {
            ...newState,
            [name]: {
              ...state[name],
              error: {
                status: true,
                message: error.message
              }
            }
          }
        }, {})
      }
    },
    SET_INITIAL: () => ({ ...payload })
  }

  return actions[type]()
}

export default initialState => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([])

  const watch = name => value => dispatch({
    type: 'CHECK_INPUT',
    payload: [name, value]
  })

  const setCustomErrors = errors => dispatch({
    type: 'SET_CUSTOM_ERROR',
    payload: errors
  })

  const reset = () => dispatch({
    type: 'SET_INITIAL',
    payload: initialState
  })

  const catchErrors = (state, callback) => {
    return Object.entries(state)
      .map(callback)
      .filter(Boolean)
  }

  const validateForm = () => {
    const wrongs = catchErrors(
      state,
      ([name, values]) => {
        return !values.completed
          && { name, ...values }
      }
    )

    setErrors(wrongs.map(error => error))

    if (wrongs.length) {
      dispatch({
        type: 'SET_DEFAULT_ERROR',
        payload: { wrongs, initialState }
      })
      return { isValid: false }
    }

    return { isValid: true }
  }

  useEffect(() => {
    const wrongs = catchErrors(
      state,
      ([name, values]) => {
        return values.error.status
          && { name, ...values }
      }
    )

    setErrors(wrongs.map(error => error))

    setDisabled(() => {
      return !Object.values(state)
        .every(({ completed }) => completed ? true : false)
    })
  }, [state])

  return {
    watch,
    reset,
    errors,
    disabled,
    validateForm,
    setCustomErrors,
    form: state
  }
}
