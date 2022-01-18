import { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { parse } from 'query-string'

type Params = {
  [key: string]: number | string
}
interface MetadataContextProps {
  startAt: string
  pageLoadAt: string | null
  questionPageLoadAt: string | null
}

interface MetadataContext {
  pageLoad: () => void
  metadata: MetadataContextProps
  params: Params
}

const initialContextData: MetadataContext = {
  metadata: {
    startAt: new Date().toISOString(),
    pageLoadAt: null,
    questionPageLoadAt: null,
  },
  pageLoad: () => {},
  params: {},
}

const initialMetadata: MetadataContextProps = {
  startAt: new Date().toISOString(),
  pageLoadAt: null,
  questionPageLoadAt: null,
}

const MetadataContext = createContext<MetadataContext>(initialContextData)

export const MetadataProvider = (props: any): ReactElement => {
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

  const pageLoad = () => {
    setMetadata({
      ...metadata,
      pageLoadAt: new Date().toISOString(),
    })
  }

  return <MetadataContext.Provider value={{ metadata, params, pageLoad }} {...props} />
}

export const useMetadata = () => {
  const context = useContext(MetadataContext)

  if (context === undefined) {
    throw new Error('useMetadata() must be use within a MetadataProvider')
  }

  return context
}
