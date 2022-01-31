import { createContext, FunctionComponent, ReactElement, useCallback, useContext, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'

interface Banner {
  show?: boolean
  icon?: FunctionComponent<IconBaseProps>
  title?: string
  subtitle?: string
  actionText?: string
  action?: () => void
  duration?: number
}

interface BannerContextProps extends Banner {
  trigger: (banner?: Banner) => void
  dismiss: () => void
}

const initialData: BannerContextProps = {
  show: false,
  icon: undefined,
  title: undefined,
  subtitle: undefined,
  actionText: undefined,
  action: undefined,
  duration: 5000,
  trigger: () => {},
  dismiss: () => {},
}

const BannerContext = createContext(initialData)

export const BannerProvider = ({ ...props }): ReactElement => {
  const [banner, setBanner] = useState<Banner>({
    show: false,
    icon: undefined,
    title: undefined,
    subtitle: undefined,
    actionText: undefined,
    action: undefined,
    duration: 5000,
  })

  const trigger = useCallback((newBanner?: Banner) => {
    const duration = newBanner?.duration || 5000

    setBanner({ ...newBanner, show: true, duration })

    setTimeout(() => {
      setBanner({ show: false, duration })
    }, duration)
  }, [])

  const dismiss = useCallback(() => {
    setBanner({ ...banner, show: false })
  }, [banner])

  return <BannerContext.Provider value={{ trigger, dismiss, ...banner }} {...props} />
}

export const useBanner = () => {
  const context = useContext(BannerContext)

  if (context === undefined) {
    throw new Error('useBanner() must be use within a BannerProvider')
  }

  return context
}
