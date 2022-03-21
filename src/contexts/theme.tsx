import React, { createContext, Dispatch, ReactNode, useContext } from 'react'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return 'dark'
    }
  }

  return 'dark'
}

type InitialValues = {
  theme: string | null
  setTheme: Dispatch<string> | null
}

const initialValues: InitialValues = {
  theme: null,
  setTheme: null,
}

const ThemeContext = createContext(initialValues)

const ThemeProvider = ({ initialTheme, children }: { initialTheme?: string; children: ReactNode }) => {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  React.useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const theme = useContext(ThemeContext)

  if (theme === null) {
    throw new Error('useProfile must be used within a UserProfileDataProvider')
  }

  return theme
}

export { ThemeProvider, useTheme }
