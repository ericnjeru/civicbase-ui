/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO resolve anys
import React from 'react'

const useSafeDispatch = (dispatch: any) => {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return React.useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch])
}

enum ActionKind {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
  Idle = 'idle',
}

type Action = {
  type: ActionKind
  data: any
  error: any
}

type State = {
  status: ActionKind
  data: any | null
  error: any | null
}

function asyncReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionKind.Pending: {
      return { ...state, status: ActionKind.Pending, data: null, error: null }
    }
    case ActionKind.Resolved: {
      return { ...state, status: ActionKind.Resolved, data: action.data, error: null }
    }
    case ActionKind.Rejected: {
      return { ...state, status: ActionKind.Rejected, data: null, error: action.error }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

function useAsync(initialState: any = {}) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch: any = useSafeDispatch(unsafeDispatch)

  const { data, error, status } = state

  const setData = React.useCallback((data) => dispatch({ type: 'resolved', data }), [dispatch])
  const setError = React.useCallback((error) => dispatch({ type: 'rejected', error }), [dispatch])

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error('The argument passed to useAsync().run must be a promise')
      }

      dispatch({ type: 'pending' })
      promise.then(
        (data: any) => {
          dispatch({ type: 'resolved', data })
        },
        (error: any) => {
          dispatch({ type: 'rejected', error })
        },
      )
    },
    [dispatch],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}

export default useAsync
