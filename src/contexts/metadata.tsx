import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react'

import { useLocation } from '@reach/router'
import { parse } from 'query-string'

type Params = {
  [key: string]: number | string
}
interface MetadataContextProps {
  startAt: string
  surveyLoadAt: string
  questionPageLoadAt: string
  observationLoadAt: string
}

interface MetadataContext {
  onStart: () => void
  onQuestionPageLoad: () => void
  onObservationLoad?: () => void
  metadata: MetadataContextProps
  params: Params
}

const initialContextData: MetadataContext = {
  metadata: {
    startAt: new Date().toISOString(),
    surveyLoadAt: new Date().toISOString(),
    questionPageLoadAt: new Date().toISOString(),
    observationLoadAt: new Date().toISOString(),
  },
  onStart: () => {},
  onQuestionPageLoad: () => {},
  onObservationLoad: () => {},
  params: {},
}

const initialMetadata: MetadataContextProps = {
  startAt: new Date().toISOString(),
  surveyLoadAt: new Date().toISOString(),
  questionPageLoadAt: new Date().toISOString(),
  observationLoadAt: new Date().toISOString(),
}

const MetadataContext = createContext<MetadataContext>(initialContextData)

export const MetadataProvider = ({ ...props }): ReactElement => {
  const [metadata, setMetadata] = useState(initialMetadata)
  const [params, setParams] = useState<Params>({})
  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      const p = parse(location.search) as Params

      if (p) {
        setParams(p)
      }
    }
  }, [location])

  // Survey first Load
  useEffect(() => {
    setMetadata((meta) => ({
      ...meta,
      surveyLoadAt: new Date().toISOString(),
    }))
  }, [])

  // Respondent first interaction
  const onStart = useCallback(() => {
    setMetadata((meta) => {
      return { ...meta, startAt: new Date().toISOString() }
    })
  }, [])

  // Question page first load
  const onQuestionPageLoad = useCallback(() => {
    setMetadata((meta) => {
      return { ...meta, questionPageLoadAt: new Date().toISOString() }
    })
  }, [])

  // observation first load
  const onObservationLoad = useCallback(() => {
    setMetadata((meta) => {
      return { ...meta, observationLoadAt: new Date().toISOString() }
    })
  }, [])

  return (
    <MetadataContext.Provider value={{ metadata, params, onStart, onObservationLoad, onQuestionPageLoad }} {...props} />
  )
}

export const useMetadata = () => {
  const context = useContext(MetadataContext)

  if (context === undefined) {
    throw new Error('useMetadata() must be use within a MetadataProvider')
  }

  return context
}
