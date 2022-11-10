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
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #E0E0E0;
    --text-secondary: #9E9E9E;
    --color-primary: #2563EB;
  }
  body {
    ${tw`bg-primary text-primary`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
