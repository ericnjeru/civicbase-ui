import { createContext, ReactElement, useCallback, useContext, useState } from 'react'

interface Toast {
  text?: string
}

interface ToastContextProps extends Toast {
  toast?: Toast
  trigger: (text: string) => void
}

const initialData: ToastContextProps = {
  toast: { text: undefined },
  trigger: () => {},
}

const ToastContext = createContext(initialData)

export const ToastProvider = ({ ...props }): ReactElement => {
  const [toast, setToast] = useState<Toast>()

  const trigger = useCallback((text: string) => {
    setToast({ text })

    setTimeout(() => {
      setToast({ text: undefined })
    }, 5000)
  }, [])

  return <ToastContext.Provider value={{ trigger, toast }} {...props} />
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast() must be use within a ToastProvider')
  }

  return context
}
