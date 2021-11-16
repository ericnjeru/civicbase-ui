import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  .light {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F1F5F9;
    --text-primary: #212121;
    --text-secondary: #757575;
    --color-primary: #E11D48;
  }
  .dark {
    --bg-primary: #303030;
    --bg-secondary: #1E293B;
    --text-primary: #E0E0E0;
    --text-secondary: #9E9E9E;
    --color-primary: #2563EB;
  }
  body {
    ${tw`bg-primary text-primary transition-all duration-200`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
