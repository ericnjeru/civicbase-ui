import { createContext, ReactElement, useContext, useState } from 'react'

interface MetadataContextProps {
  startAt: string
  pageLoadAt: string | null
  questionPageLoadAt: string | null
}

interface MetadataContext {
  pageLoad: () => void
  metadata: MetadataContextProps
}

const initialContextData: MetadataContext = {
  metadata: {
    startAt: new Date().toISOString(),
    pageLoadAt: null,
    questionPageLoadAt: null,
  },
  pageLoad: () => {},
}

const initialMetadata: MetadataContextProps = {
  startAt: new Date().toISOString(),
  pageLoadAt: null,
  questionPageLoadAt: null,
}

const MetadataContext = createContext<MetadataContext>(initialContextData)

export const MetadataProvider = (props: any): ReactElement => {
  const [metadata, setMetadata] = useState(initialMetadata)

  const pageLoad = () => {
    setMetadata({
      ...metadata,
      pageLoadAt: new Date().toISOString(),
    })
  }

  return <MetadataContext.Provider value={{ metadata, pageLoad }} {...props} />
}

export const useMetadata = () => {
  const context = useContext(MetadataContext)

  if (context === undefined) {
    throw new Error('useMetadata() must be use within a MetadataProvider')
  }

  return context
}
