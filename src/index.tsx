import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'contexts/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <Suspense fallback={<div></div>}>
        <App />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
