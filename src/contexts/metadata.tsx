import { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { parse } from 'query-string'

type Params = {
  [key: string]: number | string
}
interface MetadataContextProps {
  startAt: string | null
  surveyLoadAt: string | null
  questionPageLoadAt: string | null
}

interface MetadataContext {
  onStart: () => void
  onQuestionPageLoad: () => void
  metadata: MetadataContextProps
  params: Params
}

const initialContextData: MetadataContext = {
  metadata: {
    startAt: null,
    surveyLoadAt: null,
    questionPageLoadAt: null,
  },
  onStart: () => {},
  onQuestionPageLoad: () => {},
  params: {},
}

const initialMetadata: MetadataContextProps = {
  startAt: null,
  surveyLoadAt: null,
  questionPageLoadAt: null,
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
      if (!meta.startAt) {
        return { ...meta, startAt: new Date().toISOString() }
      }
      return meta
    })
  }, [])

  // Question page first load
  const onQuestionPageLoad = useCallback(() => {
    setMetadata((meta) => {
      if (!meta.questionPageLoadAt) {
        return { ...meta, questionPageLoadAt: new Date().toISOString() }
      }
      return meta
    })
  }, [])

  return <MetadataContext.Provider value={{ metadata, params, onStart, onQuestionPageLoad }} {...props} />
}

export const useMetadata = () => {
  const context = useContext(MetadataContext)

  if (context === undefined) {
    throw new Error('useMetadata() must be use within a MetadataProvider')
  }

  return context
}
