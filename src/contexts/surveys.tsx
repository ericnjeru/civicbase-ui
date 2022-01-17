import { createContext, ReactElement, useContext, useReducer, useEffect, useState } from 'react'
import useAsync from 'hooks/use-async'
import { getSurveys } from 'services/survey'
import { Survey } from '../../types/survey'

export interface SurveyState extends Survey {
  isLoading?: boolean
}

interface SurveyContextProps {
  surveys: SurveyState[]
  isLoading: boolean
  refresh: () => void
  dispatch: ({ type, payload }: { type: SurveyActionKind; payload: any }) => void
}

const initialContextData: SurveyContextProps = {
  surveys: [],
  isLoading: false,
  refresh: () => {},
  dispatch: () => {},
}

export enum SurveyActionKind {
  UPDATE_ALL = 'UPDATE_ALL',
  UPDATE = 'UPDATE',
  LOADING = 'LOADING',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

interface SurveyAction {
  type: SurveyActionKind
  payload: any
}

function surveyReducer(state: SurveyState[], action: SurveyAction) {
  const { type, payload } = action
  switch (type) {
    case SurveyActionKind.UPDATE_ALL:
      return payload

    case SurveyActionKind.LOADING:
      return state.map((survey) => {
        if (survey.id === payload.id) {
          return {
            ...survey,
            isLoading: payload.isLoading,
          }
        }

        return survey
      })

    case SurveyActionKind.UPDATE:
      return state.map((survey) => {
        if (survey.id === payload.id) {
          survey = {
            ...survey,
            ...payload,
          }
        }

        return survey
      })

    case SurveyActionKind.ADD:
      return [...state, payload]

    case SurveyActionKind.DELETE:
      return state.filter((survey) => survey.id !== payload.id)

    default:
      return state
  }
}

const SurveysContext = createContext(initialContextData)

export const SurveysProvider = (props: any): ReactElement => {
  const [surveys, dispatch] = useReducer(surveyReducer, [])
  const [refresh, setRefresh] = useState(0)
  const { run, data, isLoading } = useAsync()

  useEffect(() => {
    run(getSurveys())
  }, [run, refresh])

  useEffect(() => {
    if (data) {
      dispatch({ type: SurveyActionKind.UPDATE_ALL, payload: data })
    }
  }, [data])

  return (
    <SurveysContext.Provider
      value={{ isLoading, surveys, refresh: () => setRefresh(Math.random()), dispatch }}
      {...props}
    />
  )
}

export const useSurveys = () => {
  const context = useContext(SurveysContext)

  if (context === undefined) {
    throw new Error('useSurveys() must be use within a SurveysProvider')
  }

  return context
}
